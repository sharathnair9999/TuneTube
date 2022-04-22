import React, { useEffect } from "react";
import { useVideos } from "../../contexts";
import "./CategoryChip.css";

const CategoryChip = ({ category }) => {
  const { videosState, videosDispatch } = useVideos();

  const {
    filters: { filterByCategory },
  } = videosState;

  const selectCategory = (cat) => {
    videosDispatch({ type: "FILTER_BY_CATEGORY", payload: cat });
  };

  return (
    <button
      onClick={() => selectCategory(category)}
      className={`chip ${filterByCategory===category && 'active'}`}
    >
      {category}
    </button>
  );
};

export default CategoryChip;
