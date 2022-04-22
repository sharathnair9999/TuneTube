import React from "react";
import { useWindowDimensions } from "../../custom-hooks";
import "./Categories.css";

const Categories = () => {
  const { width } = useWindowDimensions();
  

  return (
    <div className="categories-container">
      <fieldset className="w-80 my-1 title-text">
        <legend className={`${width <= 768 ? "font-md-2" : "font-3xl"}`}>
          <span>Categories</span>
        </legend>
      </fieldset>
      <div className="categories">

      </div>
    </div>
  );
};

export default Categories;
