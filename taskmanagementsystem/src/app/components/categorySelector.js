import React from 'react';

const CategorySelector = ({categories, selectedCategory, selectCategory}) => {
    return(
        <select value={selectedCategory} onChange={(e) => selectCategory(e.target.value)}>
            <option value="">All</option>
            {categories.map((category) => (
                <option key={category} value={category}>
                    {category}
                </option>    
            
            ))}
        </select>    
    );
};

export default categorySelector;