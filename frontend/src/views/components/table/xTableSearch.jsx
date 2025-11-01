// components/table/TableSearch.jsx

const TableSearch = ({ search, handleSearch }) => {
  return (
    <input
      type="search"
      placeholder="Chercher..."
      className="form-control form-control-sm mx-auto"
      value={search}
      onChange={handleSearch}
    />
  )
}

export default TableSearch
