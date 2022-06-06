import React from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryCard.css";

const CategoryCard = ({ category }) => {
  const { categoryName, description, thumbnail } = category;
  const navigate = useNavigate();
  const moveToExplore = (category) => {
    navigate({
      pathname: `/explore?category=${category}&sort=OLDEST`,
    });
  };
  return (
    <div
      className="category-card pointer"
      onClick={() => moveToExplore(categoryName)}
    >
      <p className="category-title">{categoryName}</p>
      <img
        src={thumbnail}
        alt={categoryName}
        className="category-img object-cover"
      />
      <p className="category-description">{description}</p>
    </div>
  );
};

export default CategoryCard;
