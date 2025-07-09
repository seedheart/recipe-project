import json
import math
from sqlalchemy.orm import Session
from models import Recipe

def parse_value(value):
    """Convert 'NaN' strings or float NaNs to None."""
    if isinstance(value, str) and value.lower() == "nan":
        return None
    if isinstance(value, float) and math.isnan(value):
        return None
    return value

def load_recipes_from_json(json_file_path, db: Session):
    with open(json_file_path, 'r', encoding='utf-8') as f:
        recipes = json.load(f)

    skipped = 0
    inserted = 0

    for recipe in recipes.values():
        title = recipe.get("title")
        if not title:
            # print("Skipping recipe without title.")
            skipped += 1
            continue

        new_recipe = Recipe(
            cuisine=recipe.get("cuisine"),
            title=title,
            rating=parse_value(recipe.get("rating")),
            prep_time=parse_value(recipe.get("prep_time")),
            cook_time=parse_value(recipe.get("cook_time")),
            total_time=parse_value(recipe.get("total_time")),
            description=recipe.get("description"),
            nutrients=recipe.get("nutrients"),
            serves=recipe.get("serves")
        )

        db.add(new_recipe)
        inserted += 1

    db.commit()
    print(f"Inserted {inserted} recipes. Skipped {skipped} due to missing title.")
