export default function PaginationControls({ page, limit, totalPages, setPage, setLimit }) {
  return (
    <div className="flex items-center justify-between mt-4">
      {/* Results per page */}
      <div>
        <label>Results per page: </label>
        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1); // reset to page 1
          }}
          className="border p-1 ml-2 bg-gray-800"
        >
          {[15, 25, 50].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      {/* Page X of Y */}
      <div className="flex items-center gap-4">
        <span>Page {page} of {totalPages}</span>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}