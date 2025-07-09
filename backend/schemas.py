# schemas.py

from typing import Any, Dict, List, Optional
from pydantic import BaseModel

class RecipeOut(BaseModel):
    id: int
    title: str
    cuisine: Optional[str]
    rating: Optional[float]
    prep_time: Optional[int]
    cook_time: Optional[int]
    total_time: Optional[int]
    description: Optional[str]
    nutrients: Optional[Dict[str, Any]]
    serves: Optional[str]

    class Config:
        orm_mode = True 

class PaginatedRecipeListOut(BaseModel):
    page: int
    limit: int
    total: int
    data: List[RecipeOut]

class RecipeListOut(BaseModel):
    data: List[RecipeOut]
