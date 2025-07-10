import { useState } from "react";

export default function SearchFilters({ onSearch }) {
  const [input, setInput] = useState({
    title: "",
    cuisine: "",
    calories: "",
    rating: "",
    total_time: ""
  });

  const isEmpty = Object.values(input).every((val) => val.trim() === "");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const processedInput = { ...input };

    ["calories", "rating", "total_time"].forEach((key) => {
      const val = processedInput[key].trim();
      if (val && !/^([<>]=?|=)/.test(val)) {
        processedInput[key] = "=" + val;
      }
    });

    const filters = Object.fromEntries(
      Object.entries(processedInput).filter(([_, v]) => v.trim())
    );

    onSearch(filters);
  };

  const clearFields = () => {
    setInput({
      title: "",
      cuisine: "",
      calories: "",
      rating: "",
      total_time: ""
    });
  };

  const resetApp = () => {
    clearFields();
    onSearch({});
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-5 gap-2">
        <input
          type="text"
          placeholder="Title"
          className="p-2 border"
          value={input.title}
          onChange={(e) => setInput({ ...input, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Cuisine"
          className="p-2 border"
          value={input.cuisine}
          onChange={(e) => setInput({ ...input, cuisine: e.target.value })}
        />
        <input
          type="text"
          placeholder="Calories (<=400)"
          className="p-2 border"
          value={input.calories}
          onChange={(e) => setInput({ ...input, calories: e.target.value })}
        />
        <input
          type="text"
          placeholder="Rating (>=4.5)"
          className="p-2 border"
          value={input.rating}
          onChange={(e) => setInput({ ...input, rating: e.target.value })}
        />
        <input
          type="text"
          placeholder="Total Time"
          className="p-2 border"
          value={input.total_time}
          onChange={(e) => setInput({ ...input, total_time: e.target.value })}
        />
      </div>

      <div className="flex gap-4 mt-2">
        <button
          type="submit"
          disabled={isEmpty}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 disabled:opacity-40"
        >
          Search
        </button>
        <button
          type="button"
          onClick={clearFields}
          className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
        >
          Clear Filters
        </button>
        <button
          type="button"
          onClick={resetApp}
          className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700"
        >
          Reset
        </button>
      </div>
    </form>
  );
}