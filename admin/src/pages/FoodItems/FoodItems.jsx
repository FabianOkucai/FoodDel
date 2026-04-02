import { useState } from 'react';
import './FoodItems.css';

const FoodItems = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [foodItems, setFoodItems] = useState([
    {
      id: 1,
      name: 'Greek Salad',
      category: 'Salad',
      price: 12.99,
      description: 'Fresh Greek salad with feta cheese',
      image: 'salad.jpg'
    },
    {
      id: 2,
      name: 'Veg Salad',
      category: 'Salad',
      price: 18.00,
      description: 'Healthy vegetarian salad with fresh vegetables',
      image: 'veg-salad.jpg'
    },
    {
      id: 3,
      name: 'Chicken Salad',
      category: 'Salad',
      price: 24.00,
      description: 'Protein-packed chicken salad with mixed greens',
      image: 'chicken-salad.jpg'
    },
    {
      id: 4,
      name: 'Lasagna Rolls',
      category: 'Rolls',
      price: 14.00,
      description: 'Classic Italian lasagna rolls with rich sauce',
      image: 'lasagna-rolls.jpg'
    },
    {
      id: 5,
      name: 'Chicken Rolls',
      category: 'Rolls',
      price: 20.00,
      description: 'Spicy chicken rolls with special seasoning',
      image: 'chicken-rolls.jpg'
    },
    {
      id: 6,
      name: 'Ripple Ice Cream',
      category: 'Deserts',
      price: 14.00,
      description: 'Creamy ripple ice cream with swirls of flavor',
      image: 'ripple-icecream.jpg'
    },
    {
      id: 7,
      name: 'Fruit Ice Cream',
      category: 'Deserts',
      price: 22.00,
      description: 'Fresh fruit-flavored ice cream',
      image: 'fruit-icecream.jpg'
    }
  ]);

  const [editingItem, setEditingItem] = useState(null);

  const handleAddItem = (newItem) => {
    const itemToAdd = {
      ...newItem,
      id: Date.now(), // Use timestamp for unique ID
    };
    setFoodItems([...foodItems, itemToAdd]);
    setShowAddModal(false);
  };

  const handleEditItem = (updatedItem) => {
    setFoodItems(foodItems.map(item => 
      item.id === editingItem.id ? { ...updatedItem, id: item.id } : item
    ));
    setEditingItem(null);
    setShowAddModal(false);
  };

  const handleDeleteItem = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      setFoodItems(foodItems.filter(item => item.id !== id));
    }
  };

  const startEditItem = (item) => {
    setEditingItem(item);
    setShowAddModal(true);
  };

  const categories = [
    'Salad', 'Rolls', 'Deserts', 
    'Sandwich', 'Cake', 'Pure Veg', 
    'Pasta', 'Noodles'
  ];

  return (
    <div className="food-items">
      <div className="page-header">
        <h1>Food Items</h1>
        <button 
          className="primary-button" 
          onClick={() => {
            setEditingItem(null);
            setShowAddModal(true);
          }}
        >
          Add New Item
        </button>
      </div>

      <div className="food-items-grid">
        {foodItems.map((item) => (
          <div key={item.id} className="food-item-card">
            <div className="food-item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="food-item-info">
              <h3>{item.name}</h3>
              <p className="category">{item.category}</p>
              <p className="price">${item.price.toFixed(2)}</p>
              <p className="description">{item.description}</p>
            </div>
            <div className="food-item-actions">
              <button 
                className="edit-button"
                onClick={() => startEditItem(item)}
              >
                Edit
              </button>
              <button 
                className="delete-button"
                onClick={() => handleDeleteItem(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editingItem ? 'Edit Food Item' : 'Add New Food Item'}</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const itemData = {
                name: formData.get('name'),
                category: formData.get('category'),
                price: parseFloat(formData.get('price')),
                description: formData.get('description'),
                image: formData.get('image').name || (editingItem ? editingItem.image : '')
              };
              
              if (editingItem) {
                handleEditItem(itemData);
              } else {
                handleAddItem(itemData);
              }
            }}>
              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  name="name" 
                  defaultValue={editingItem?.name || ''} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select 
                  name="category" 
                  defaultValue={editingItem?.category || ''} 
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Price</label>
                <input 
                  type="number" 
                  step="0.01" 
                  name="price" 
                  defaultValue={editingItem?.price || ''} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  name="description" 
                  defaultValue={editingItem?.description || ''} 
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>Image</label>
                <input 
                  type="file" 
                  name="image" 
                  accept="image/*" 
                  {...(editingItem ? {} : { required: true })}
                />
              </div>
              <div className="modal-actions">
                <button 
                  type="button" 
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingItem(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-button">
                  {editingItem ? 'Update Item' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodItems; 