# main.py

from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import and_, cast, Float, func
from database import SessionLocal
from models import Recipe
from schemas import PaginatedRecipeListOut
from typing import Optional
import re
import operator

ops = {
    "<": operator.lt,
    "<=": operator.le,
    "=": operator.eq,
    ">=": operator.ge,
    ">": operator.gt
}

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use ["http://localhost:5173"] for stricter control
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Helper function to parse expression like '>=400'
def parse_expression(expr: Optional[str]) -> Optional[tuple]:
    if expr is None:
        return None
    match = re.match(r'(<=|>=|=|<|>)(\d+(\.\d+)?)', expr.strip())
    if match:
        op, value, _ = match.groups()
        return op, float(value)
    return None


@app.get("/api/recipes", response_model=PaginatedRecipeListOut)
def get_recipes(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    skip = (page - 1) * limit
    total = db.query(func.count(Recipe.id)).scalar()
    recipes = (
        db.query(Recipe)
        .order_by(Recipe.rating.desc().nullslast())
        .offset(skip)
        .limit(limit)
        .all()
    )
    return {
        "page": page,
        "limit": limit,
        "total": total,
        "data": recipes
    }

@app.get("/api/recipes/search", response_model=PaginatedRecipeListOut)
def search_recipes(
    calories: Optional[str] = Query(None),
    rating: Optional[str] = Query(None),
    total_time: Optional[str] = Query(None),
    title: Optional[str] = Query(None),
    cuisine: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    filters = []

    # Calories (from JSONB)
    if parsed := parse_expression(calories):
        op, val = parsed
        # Strip "kcal" using regex before casting to float
        calories_text = func.regexp_replace(
            Recipe.nutrients["calories"].astext,
            r'[^0-9.]', '', 'g'
        )
        expr = cast(calories_text, Float)
        filters.append(ops[op](expr, val))

    # Rating
    if parsed := parse_expression(rating):
        op, val = parsed
        expr = Recipe.rating
        filters.append(ops[op](expr, val))

    # Total Time
    if parsed := parse_expression(total_time):
        op, val = parsed
        expr = Recipe.total_time
        filters.append(ops[op](expr, val))

    # Title search (case-insensitive)
    if title:
        filters.append(Recipe.title.ilike(f"%{title}%"))

    # Cuisine exact match
    if cuisine:
        filters.append(Recipe.cuisine == cuisine)

    skip = (page - 1) * limit
    total = db.query(func.count(Recipe.id)).filter(and_(*filters)).scalar()

    recipes = (
        db.query(Recipe)
        .filter(and_(*filters))
        .order_by(Recipe.rating.desc().nullslast())
        .offset(skip)
        .limit(limit)
        .all()
    )

    return {
        "page": page,
        "limit": limit,
        "total": total,
        "data": recipes
    }
