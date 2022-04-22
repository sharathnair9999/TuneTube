import React from "react";
import { useWindowDimensions } from "../../custom-hooks";
import { useVideos } from "../../contexts";
import "./Categories.css";
import {CategoryCard} from "../../components"

const Categories = () => {
  const { width } = useWindowDimensions();

  const {
    videosState: { allCategories },
  } = useVideos();



  return (
    <div className="categories-container">
      <fieldset className="w-80 my-1 title-text">
        <legend className={`${width <= 768 ? "font-md-2" : "font-3xl"}`}>
          <span>Categories</span>
        </legend>
      </fieldset>
      <div className="categories wrap gap-sm">
        {allCategories?.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
