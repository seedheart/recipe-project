# load_data.py

from database import SessionLocal
from utils import load_recipes_from_json

db = SessionLocal()
load_recipes_from_json("data/recipes.json", db)
db.close()
print("Recipes loaded successfully!")
