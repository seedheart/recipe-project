# Recipe Project
This project provides a full-stack solution for parsing a JSON dataset of recipes, storing them in a PostgreSQL database, exposing them via a RESTful API, and rendering them in a modern, filterable frontend UI.

Demo:
https://github.com/user-attachments/assets/658e1fa6-c13a-4c0a-a81d-72eae2b61333

---

## Backend Setup

### Pre requisites
- Clone the repository to your system
- Install PostgreSQL, Python, NodeJS (for frontend)
- cd into the backend folder
- Create a `.env` file and add the following content:
```bash
DB_HOST=localhost
DB_PORT=5432
DB_NAME=recipes_db
DB_USER=postgres
DB_PASSWORD=<ENTER PASSWORD>
```

### 1. Create a Virtual Environment

```bash
python -m venv venv
source venv/Scripts/activate  # On Windows
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Database Setup

#### Create Database
- Run the SQL query in PostgreSQL
```sql
CREATE DATABASE recipes_db;
```

#### Create Tables

```bash
python scripts/create_tables.py
```

### Load Recipe Data

Run the script to parse and load data from `data/recipes.json`:

```bash
python scripts/load_data.py
```

### Start Backend Server

```bash
uvicorn main:app --reload
```

- API Docs: http://localhost:8000/docs
- Base Endpoint: http://localhost:8000/api/recipes

---

## Frontend Setup (React + Vite + TailwindCSS)

### 1. Install Node Modules

```bash
cd frontend
npm install
```

### 2. Start Frontend Dev Server

```bash
npm run dev
```

- Open in browser: http://localhost:5173
---

## API Reference

You can test the API using Swagger UI, Postman, Curl or your browser.

### `GET /api/recipes`

Returns a list of recipes with pagination.

#### Parameters

| Name   | Type   | Description                  | Required | Example |
|--------|--------|------------------------------|----------|---------|
| page   | int    | Page number (starts at 1)     | No       | `1`     |
| limit  | int    | Number of recipes per page    | No       | `10`    |

#### Example Request

```http
GET /api/recipes?page=1&limit=10
```

#### Example Response

```json
{
  "page": 1,
  "limit": 10,
  "total": 50
  "data": [
    {
      "id": 1,
      "title": "Sweet Potato Pie",
      "cuisine": "Southern Recipes",
      "rating": 4.8,
      "prep_time": 15,
      "cook_time": 100,
      "total_time": 115,
      "description": "Shared from a Southern recipe...",
      "nutrients": {
        "calories": "389 kcal",
        "carbohydrateContent": "48 g",
        "cholesterolContent": "78 mg",
        "fiberContent": "3 g",
        "proteinContent": "5 g",
        "saturatedFatContent": "10 g",
        "sodiumContent": "254 mg",
        "sugarContent": "28 g",
        "fatContent": "21 g"
      },
      "serves": "8 servings"
    }
  ],
}
```

#### Response Fields

- `page`: Current page number
- `limit`: Recipes per page
- `total`: Total number of matching recipes
- `data`: List of recipe objects

### `GET /api/recipes/search`

Returns filtered recipes based on search criteria.

#### Query Parameters

| Name        | Type     | Description                                   | Example     |
|-------------|----------|-----------------------------------------------|-------------|
| title       | string   | Search by title (partial match)               | `pie`       |
| cuisine     | string   | Filter by cuisine (exact match)               | `Peach Cake`|
| calories    | string   | Comparison on calories (e.g. `<=400`)         | `<=400`     |
| rating      | string   | Comparison on rating (e.g. `>=4.5`)           | `>=4.5`     |
| total_time  | string   | Comparison on total time (e.g. `<=30`)        | `<=30`      |
| page        | int      | Page number (starts at 1)                     | `1`         |
| limit       | int      | Number of recipes per page                    | `15`        |

#### Example Request

```http
GET /api/recipes/search?title=pie&rating=>=4.5&calories=<=400&page=1&limit=15
```

#### Example Response

```json
{
  "page": 1,
  "limit": 15,
  "total": 50
  "data": [
    {
      "id": 1,
      "title": "Sweet Potato Pie",
      "cuisine": "Southern Recipes",
      "rating": 4.8,
      "prep_time": 15,
      "cook_time": 100,
      "total_time": 115,
      "description": "Shared from a Southern recipe...",
      "nutrients": {
        "calories": "389 kcal",
        "carbohydrateContent": "48 g",
        "cholesterolContent": "78 mg",
        "fiberContent": "3 g",
        "proteinContent": "5 g",
        "saturatedFatContent": "10 g",
        "sodiumContent": "254 mg",
        "sugarContent": "28 g",
        "fatContent": "21 g"
      },
      "serves": "8 servings"
    }

  ]
}
```

#### Response Fields
- `page`: Current page number
- `limit`: Recipes per page
- `total`: Total number of matching recipes
- `data`: List of matching recipe objects

### Recipe Object Schema

| Field           | Type            | Description                              |
|----------------|------------------|------------------------------------------|
| id             | int             | Recipe ID                                |
| title          | string          | Name of the recipe                       |
| cuisine        | string (optional) | Cuisine name                             |
| rating         | float (optional) | User rating                              |
| prep_time      | int (optional)  | Preparation time in minutes              |
| cook_time      | int (optional)  | Cooking time in minutes                  |
| total_time     | int (optional)  | Total time in minutes                    |
| description    | string (optional) | Recipe description                       |
| nutrients      | dict (optional) | Nutrition values (kcal, fat, etc.)       |
| serves         | string (optional) | Number of servings (e.g. "4 servings")   |

---
## Screenshots
![Screenshot 2025-07-10 115847](https://github.com/user-attachments/assets/c09be58d-0f71-4c8b-ae4c-da26a2372750)
---
![Screenshot 2025-07-10 160006](https://github.com/user-attachments/assets/5a76d39b-3d00-46f6-9f67-7f67e852fcad)
---
![Screenshot 2025-07-10 120119](https://github.com/user-attachments/assets/1aedd7fc-31b7-4770-bc6b-50cddb75f6ad)


