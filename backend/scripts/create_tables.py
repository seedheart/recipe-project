# create_tables.py

from database import Base, engine
from models import Recipe

print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Done.")
