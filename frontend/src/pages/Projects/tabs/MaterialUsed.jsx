// MaterialUsed.js
import React, { useState } from 'react';

const MaterialUsed = () => {
    const [material, setMaterial] = useState("");
    const [quantity, setQuantity] = useState("");
    

    return (
        <div>
            <label className="block font-medium">Material</label>
            <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="border p-2 rounded w-full mb-4"
                placeholder="Search Material"
            />

            <label className="block font-medium">Quantity</label>
            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="border p-2 rounded w-full mb-4"
            />

            <label className="block font-medium">Date</label>
            <input type="date" className="border p-2 rounded w-full mb-4" />
        </div>
    );
};

export default MaterialUsed;
