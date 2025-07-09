export default function RecipeRowDrawer({ recipe, onClose }) {
  if (!recipe) return null;

  return (
    <div className="fixed right-0 top-0 w-96 h-full bg-gray-800 shadow-lg p-4 overflow-y-auto z-50">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <div>
          <h2 className="text-xl font-bold">{recipe.title}</h2>
          <p className="text-sm text-gray-300">{recipe.cuisine}</p>
        </div>
        <button onClick={onClose}>&times;</button>
      </div>
      <p className="mb-2"><strong>Description:</strong> {recipe.description}</p>
      <p className="mb-2">
        <strong>Total Time:</strong> {recipe.total_time} mins
        <details className="ml-4 cursor-pointer text-sm text-gray-300">
          <summary className="cursor-pointer">Breakdown</summary>
          <p>Prep: {recipe.prep_time} min</p>
          <p>Cook: {recipe.cook_time} min</p>
        </details>
      </p>
      <h3 className="mt-4 font-semibold">Nutrition</h3>
      <table className="w-full text-sm border mt-2">
        <tbody>
          {Object.entries(recipe.nutrients || {}).map(([key, value]) => (
            <tr key={key}>
              <td className="capitalize border px-2 py-1">{key.replace("Content", "")}</td>
              <td className="border px-2 py-1">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
