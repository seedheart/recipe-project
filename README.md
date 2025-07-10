# Recipe Project
This project provides a full-stack solution for parsing a JSON dataset of recipes, storing them in a PostgreSQL database, exposing them via a RESTful API, and rendering them in a modern, filterable frontend UI.

Demo:
https://github.com/user-attachments/assets/658e1fa6-c13a-4c0a-a81d-72eae2b61333

---

## Backend Setup

### Pre requisites
- Clone the repository to your system
- Install PostgreSQL, Python, NodeJS
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

## API Reference

### `GET /api/recipes`

Returns a list of recipes with pagination.

#### Parameters

| Name   | Type   | Description                  | Required | Example |
|--------|--------|------------------------------|----------|---------|
| page   | int    | Page number (starts at 1)     | No       | `1`     |
| limit  | int    | Number of recipes per page    | No       | `10`    |

#### 📤 Example Request

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
| serves      | string   | Exact match on number of people served        | `4`         |

#### Example Request

```http
GET /api/recipes/search?title=pie&rating=>=4.5&calories=<=400
```

#### Example Response

```json
{
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

## API Testing

You can test the API using Swagger UI, Postman, Curl or your browser.

### 1. Get All Recipes (Paginated)

```http
GET /api/recipes?page=1&limit=10
```

**Response:**

```json
{
  "page": 1,
  "limit": 10,
  "total": 50
  "data": [ ... ],
}
```

---

### 2. Search Recipes with Filters

```http
GET /api/recipes/search?title=pie&rating=>=4.5&calories=<=400
```

**Response:**

```json
{
  "data": [ { ...matching recipes... } ]
}
```

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

## Screenshots
![Screenshot 2025-07-10 115847](https://github.com/user-attachments/assets/c09be58d-0f71-4c8b-ae4c-da26a2372750)
---
![Screenshot 2025-07-10 120031](https://github.com/user-attachments/assets/f6def230-952d-4ca5-866a-c54ded024421)
---
![Screenshot 2025-07-10 120119](https://github.com/user-attachments/assets/1aedd7fc-31b7-4770-bc6b-50cddb75f6ad)


