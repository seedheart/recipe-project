# Recipe Project
This project provides a full-stack solution for parsing a JSON dataset of recipes, storing them in a PostgreSQL database, exposing them via a RESTful API, and rendering them in a modern, filterable frontend UI.

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

---

## Load Recipe Data

Run the script to parse and load data from `data/recipes.json`:

```bash
python scripts/load_data.py
```

---

## Start Backend Server

```bash
uvicorn main:app --reload
```

- API Docs: http://localhost:8000/docs
- Base Endpoint: http://localhost:8000/api/recipes

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

_Add screenshots of:_
- Home page with table
- Search in action
- Drawer opened with recipe detail
- No results fallback message
