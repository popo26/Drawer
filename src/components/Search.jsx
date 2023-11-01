import { useState } from "react";

export default function Search() {
  const [searchItem, setSearchItem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Clicked");
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setSearchItem(e.target.value);
  };

  return (
    <div className="Search">
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="search"
          id="search"
          value={searchItem}
          placeholder="Enter keyword.."
        />
        <button>Search</button>
      </form>

      <div>List of search results</div>
    </div>
  );
}
