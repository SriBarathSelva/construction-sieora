import React, { useState, useEffect, useRef } from 'react';
import { LIBRARY_DETAIL, PROJECT_DETAIL } from '../../../api/api';
import axios from 'axios';

const MaterialRequest = ({ projectData, onUpdate, mode }) => {
    const [material, setMaterial] = useState(projectData.request[0]?.m_name || '');
    const [materials, setMaterials] = useState([]);
    const [filteredMaterials, setFilteredMaterials] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [notes, setNotes] = useState(projectData.request[0]?.m_note || '');
    const [quantity, setQuantity] = useState(projectData.request[0]?.m_quantity || '');
    const [date, setDate] = useState(projectData.request[0]?.m_date || '');
    const dropdownRef = useRef(null);

    useEffect(() => {
        axios.get(LIBRARY_DETAIL)
            .then(response => setMaterials(response.data.data || []))
            .catch(error => console.error("Error fetching materials:", error));
    }, []);

    useEffect(() => {
        if (material) {
            const filter = materials.filter(m => 
                (m.material_name || "").toLowerCase().includes(material.toLowerCase())
            );
            setFilteredMaterials(filter);
        } else {
            setFilteredMaterials(materials);
        }
    }, [material, materials]);

    const handleSelectMaterial = (selectedMaterial) => {
        setMaterial(selectedMaterial.material_name);
        setIsDropdownOpen(false);
    };

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSave = () => {
        const newRequest = {
            m_date: date,
            m_name: material,
            m_note: notes,
            m_quantity: quantity
        };

        const updatedProjectData = {
            ...projectData,
            request: [...(projectData.request || []), newRequest]
        };

        axios.put(`${PROJECT_DETAIL}/${projectData._id}`, updatedProjectData)
            .then(response => {
                console.log("Data updated successfully:", response.data);
                if (onUpdate) {
                    onUpdate(updatedProjectData); // Pass the updated project data to the parent component
                }
            })
            .catch(error => {
                console.error("Error updating project data:", error);
            });
    };

    return (
        <div>
            <label className="block font-medium">Project Name</label>
            <input
                type="text"
                value={projectData.project_name || ""}
                readOnly
                className="border p-2 rounded w-full mb-4"
            />

            <label className="block font-medium">Date</label>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border p-2 rounded w-full mb-4"
                readOnly={mode !== 'edit'}
            />

            <label className="block font-medium">Material Name</label>
            <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                onClick={() => setIsDropdownOpen(true)}
                className="border p-2 rounded w-full mb-4"
                readOnly={mode !== 'edit'}
            />
            {isDropdownOpen && (
                <ul ref={dropdownRef} className="border rounded max-h-40 overflow-y-auto w-full mb-4">
                    {filteredMaterials.map((m) => (
                        <li
                            key={m._id}
                            onClick={() => handleSelectMaterial(m)}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                        >
                            {m.material_name}
                        </li>
                    ))}
                </ul>
            )}

            <label className="block font-medium">Quantity</label>
            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="border p-2 rounded w-full mb-4"
                readOnly={mode !== 'edit'}
            />

            <label className="block font-medium">Notes</label>
            <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="border p-2 rounded w-full mb-4"
                readOnly={mode !== 'edit'}
            ></textarea>

            {mode === 'edit' && (
                <button
                    onClick={handleSave}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Save
                </button>
            )}
        </div>
    );
};

export default MaterialRequest;
