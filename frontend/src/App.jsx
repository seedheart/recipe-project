import { useState, useEffect } from "react";
import { getRecipes, searchRecipes } from "./api/recipes";
import RecipeTable from "./components/RecipeTable";
import RecipeRowDrawer from "./components/RecipeRowDrawer";
import PaginationControls from "./components/PaginationControls";
import SearchFilters from "./components/SearchFilters";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState({});
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = isSearching
        ? await searchRecipes(filters)
        : await getRecipes(page, limit);
      setRecipes(data.data || []);
      setTotal(data.total || 0);
    };
    fetchData();
  }, [page, limit, filters, isSearching]);

  const handleSearch = (newFilters) => {
    setPage(1);
    setFilters(newFilters);
    setIsSearching(Object.keys(newFilters).length > 0);
  };

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-300">
        🍽️ Recipes
      </h1>
      <SearchFilters onSearch={handleSearch}  />
      <RecipeTable data={recipes} onRowClick={setSelected} />
      <PaginationControls
        page={page}
        limit={limit}
        totalPages={totalPages}
        setPage={setPage}
        setLimit={setLimit}
      />
      <RecipeRowDrawer recipe={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export default App;