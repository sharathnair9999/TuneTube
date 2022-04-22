import React from "react";
import { Link } from "react-router-dom";
import "./CategoryCard.css";

const CategoryCard = ({ category }) => {
  const { categoryName, description, thumbnail } = category;
  return (
    <Link to={"/explore"} className="category-card">
      <p className="category-title">{categoryName}</p>
      <img src={thumbnail} alt={categoryName} className="category-img" />
      <p className="category-description">{description}</p>
    </Link>
  );
};

export default CategoryCard;
