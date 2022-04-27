import React from "react";
import { useVideos } from "../../contexts";
import "./CategoryChip.css";

const CategoryChip = ({ category }) => {
  const { searchParams, setSearchParams } = useVideos();

  const filterByCategory = searchParams.get("category") || "All";
  const sort = searchParams.get("sort") || "LATEST";

  const selectCategory = (cat) => {
    setSearchParams({ category: cat, sort: sort });
  };

  return (
    <button
      onClick={() => selectCategory(category)}
      className={`chip ${filterByCategory === category && "active"}`}
    >
      {category}
    </button>
  );
};

export default CategoryChip;
