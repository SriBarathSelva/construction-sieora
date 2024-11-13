// MaterialReceived.js

import React, { useState, useEffect, useRef } from 'react';
import { PARTY_DETAIL, LIBRARY_DETAIL, PROJECT_DETAIL } from '../../../api/api';
import axios from 'axios';

const MaterialReceived = ({ projectData, onUpdate, mode }) => {
    const [party, setParty] = useState(projectData.receive[0]?.mr_party || '');
    const [material, setMaterial] = useState(projectData.receive[0]?.mr_material || '');
    const [quantity, setQuantity] = useState(projectData.receive[0]?.mr_quantity || '');
    const [note, setNote] = useState(projectData.receive[0]?.mr_note || '');
    const [challan, setChallan] = useState(projectData.receive[0]?.mr_challan || '');
    const [attachments, setAttachments] = useState(projectData.receive[0]?.mr_attachment || []);

    const [parties, setParties] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [filteredParties, setFilteredParties] = useState([]);
    const [filteredMaterials, setFilteredMaterials] = useState([]);

    const [isPartyDropdownOpen, setIsPartyDropdownOpen] = useState(false);
    const [isMaterialDropdownOpen, setIsMaterialDropdownOpen] = useState(false);

    const partyDropdownRef = useRef(null);
    const materialDropdownRef = useRef(null);

    // Fetch parties and materials data
    useEffect(() => {
        axios.get(PARTY_DETAIL)
            .then(response => setParties(response.data.data || []))
            .catch(error => console.error("Error fetching parties:", error));

        axios.get(LIBRARY_DETAIL)
            .then(response => setMaterials(response.data.data || []))
            .catch(error => console.error("Error fetching materials:", error));
    }, []);

    // Filter parties based on search input
    useEffect(() => {
        setFilteredParties(
            parties.filter(p => (p.party_name || "").toLowerCase().includes(party.toLowerCase()))
        );
    }, [party, parties]);

    // Filter materials based on search input
    useEffect(() => {
        setFilteredMaterials(
            materials.filter(m => (m.material_name || "").toLowerCase().includes(material.toLowerCase()))
        );
    }, [material, materials]);

    // Close dropdown if clicked outside
    const handleClickOutside = (e) => {
        if (partyDropdownRef.current && !partyDropdownRef.current.contains(e.target)) {
            setIsPartyDropdownOpen(false);
        }
        if (materialDropdownRef.current && !materialDropdownRef.current.contains(e.target)) {
            setIsMaterialDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (isPartyDropdownOpen || isMaterialDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isPartyDropdownOpen, isMaterialDropdownOpen]);

    // Save updated data to the project
    const handleSave = () => {
        const formattedAttachments = attachments.map(file => ({
            url: URL.createObjectURL(file), // Temporary URL, replace with actual upload URL if needed
            file_name: file.name
        }));

        const newReceiveData = {
            mr_party: party,
            mr_material: material,
            mr_quantity: quantity,
            mr_note: note,
            mr_challan: challan,
            mr_attachment: formattedAttachments
        };

        const updatedProjectData = {
            ...projectData,
            receive: [...(projectData.receive || []), newReceiveData]
        };

        axios.put(`${PROJECT_DETAIL}/${projectData._id}`, updatedProjectData)
            .then(response => {
                console.log("Data updated successfully:", response.data);
                if (onUpdate) {
                    onUpdate(updatedProjectData);
                }
                alert("Data saved successfully!");
            })
            .catch(error => {
                console.error("Error updating project data:", error);
                alert("Failed to save data. Please try again.");
            });
    };

    return (
        <div>
            {/* Party Dropdown */}
            <label className="block font-medium">Party Name</label>
            <div ref={partyDropdownRef}>
                <input
                    type="text"
                    value={party}
                    onChange={(e) => {
                        setParty(e.target.value);
                        setIsPartyDropdownOpen(true);
                    }}
                    onFocus={() => setIsPartyDropdownOpen(true)}
                    className="border p-2 rounded w-full mb-4"
                    placeholder="Search Party"
                    readOnly={mode !== 'edit'}
                />
                {isPartyDropdownOpen && filteredParties.length > 0 && (
                    <ul className="border rounded max-h-48 overflow-y-auto w-full mb-4">
                        {filteredParties.map((p) => (
                            <li
                                key={p._id}
                                onClick={() => { setParty(p.party_name); setIsPartyDropdownOpen(false); }}
                                className="p-2 cursor-pointer hover:bg-gray-200"
                            >
                                {p.party_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Material Dropdown */}
            <label className="block font-medium">Material Name</label>
            <div ref={materialDropdownRef}>
                <input
                    type="text"
                    value={material}
                    onChange={(e) => {
                        setMaterial(e.target.value);
                        setIsMaterialDropdownOpen(true);
                    }}
                    onFocus={() => setIsMaterialDropdownOpen(true)}
                    className="border p-2 rounded w-full mb-4"
                    placeholder="Search Material"
                    readOnly={mode !== 'edit'}
                />
                {isMaterialDropdownOpen && filteredMaterials.length > 0 && (
                    <ul className="border rounded max-h-48 overflow-y-auto w-full mb-4">
                        {filteredMaterials.map((m) => (
                            <li
                                key={m._id}
                                onClick={() => { setMaterial(m.material_name); setIsMaterialDropdownOpen(false); }}
                                className="p-2 cursor-pointer hover:bg-gray-200"
                            >
                                {m.material_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Quantity */}
            <label className="block font-medium">Quantity</label>
            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="border p-2 rounded w-full mb-4"
                readOnly={mode !== 'edit'}
            />

            {/* Notes */}
            <label className="block font-medium">Notes</label>
            <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="border p-2 rounded w-full mb-4"
                readOnly={mode !== 'edit'}
            ></textarea>

            {/* Challan */}
            <label className="block font-medium">Challan</label>
            <input
                type="text"
                value={challan}
                onChange={(e) => setChallan(e.target.value)}
                className="border p-2 rounded w-full mb-4"
                readOnly={mode !== 'edit'}
            />

            {/* Attachments */}
            <label className="block font-medium">Attachments</label>
            <input
                type="file"
                onChange={(e) => setAttachments([...attachments, ...Array.from(e.target.files)])}
                multiple
                className="border p-2 rounded w-full mb-4"
                disabled={mode !== 'edit'}
            />

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

export default MaterialReceived;
