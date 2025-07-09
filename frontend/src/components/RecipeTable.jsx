const truncate = (text, max = 40) => text.length > max ? text.slice(0, max) + "…" : text;

export default function RecipeTable({ data, onRowClick }) {
  if (!data.length)
    return <div className="text-center text-gray-500">No recipes found.</div>;

  return (
    <table className="w-full border mt-4">
      <thead className="bg-gray-600">
        <tr>
          <th className="p-2 text-left ">Title</th>
          <th className="p-2 text-left">Cuisine</th>
          <th className="p-2 text-left">Rating</th>
          <th className="p-2 text-left">Total Time</th>
          <th className="p-2 text-left">Serves</th>
        </tr>
      </thead>
      <tbody>
        {data.map((recipe) => (
          <tr key={recipe.id} className="cursor-pointer hover:bg-gray-800" onClick={() => onRowClick(recipe)}>
            <td className="p-2">{truncate(recipe.title)}</td>
            <td className="p-2">{recipe.cuisine}</td>
            <td className="p-2 flex items-center gap-1">
              ⭐
              {recipe.rating}
            </td>
            <td className="p-2">{recipe.total_time} min</td>
            <td className="p-2">{recipe.serves}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
