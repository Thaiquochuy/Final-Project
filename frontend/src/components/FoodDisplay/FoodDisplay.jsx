import React, { useContext, useState } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [selectedFood, setSelectedFood] = useState(null); // Track the selected food item
  const [showModal, setShowModal] = useState(false); // Track whether the modal is visible

  const handleFoodClick = (item) => {
    setSelectedFood(item);
    setShowModal(true); // Show modal with selected food details
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === 'All' || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                onClick={() => handleFoodClick(item)} // Handle click to open the modal
              />
            );
          }
        })}
      </div>

      {/* Modal for food details */}
      {showModal && selectedFood && (
        <div className="food-modal-overlay" onClick={handleCloseModal}>
          <div className="food-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseModal}>X</button>
            <div className="food-modal-content">
              <img src={selectedFood.image} alt={selectedFood.name} className="food-modal-img" />
              <div className="food-modal-details">
                <h3>{selectedFood.name}</h3>
                <p>{selectedFood.description}</p>
                <p>Price: ${selectedFood.price}</p>
                <div>
                  <label>Quantity:</label>
                  <input type="number" min="1" defaultValue="1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
