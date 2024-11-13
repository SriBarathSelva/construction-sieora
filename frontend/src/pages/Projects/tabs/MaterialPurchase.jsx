import React, { useState, useEffect, useRef } from 'react';
import { PARTY_DETAIL, LIBRARY_DETAIL, PROJECT_DETAIL } from '../../../api/api';
import axios from 'axios';

const MaterialPurchase = ({ projectData, mode }) => {
    const [party, setParty] = useState('');
    const [materialSearch, setMaterialSearch] = useState(''); // User's search input for materials
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [filteredParties, setFilteredParties] = useState([]);
    const [filteredMaterials, setFilteredMaterials] = useState([]);
    const [parties, setParties] = useState([]);
    const [allMaterials, setAllMaterials] = useState([]);

    const [subtotal, setSubtotal] = useState(0);
    const [manualCharge, setManualCharge] = useState(0);
    const [overallDiscount, setOverallDiscount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [paidAmount, setPaidAmount] = useState('');
    const [costCode, setCostCode] = useState('');
    const [reference, setReference] = useState('');
    const [note, setNote] = useState('');
    const [attachments, setAttachments] = useState([]);

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
            .then(response => setAllMaterials(response.data.data || []))
            .catch(error => console.error("Error fetching materials:", error));
    }, []);

    // Filter parties and materials based on search input
    useEffect(() => {
        setFilteredParties(
            parties.filter(p => (p.party_name || "").toLowerCase().includes(party.toLowerCase()))
        );
        setFilteredMaterials(
            allMaterials.filter(m => (m.material_name || "").toLowerCase().includes(materialSearch.toLowerCase()))
        );
    }, [party, materialSearch, parties, allMaterials]);

    const handleAddMaterial = (selectedMaterial) => {
        setSelectedMaterials([...selectedMaterials, { ...selectedMaterial, quantity: 0, discount: 0, gst: 0, rate: 0, amount: 0 }]);
        setIsMaterialDropdownOpen(false);
        setMaterialSearch(''); // Clear search input
    };

    const handleUpdateMaterial = (index, field, value) => {
        const updatedMaterials = selectedMaterials.map((material, i) => {
            if (i === index) {
                const updatedMaterial = { ...material, [field]: value };
                updatedMaterial.amount = (updatedMaterial.quantity * updatedMaterial.rate) * (1 - updatedMaterial.discount / 100) * (1 + updatedMaterial.gst / 100);
                return updatedMaterial;
            }
            return material;
        });
        setSelectedMaterials(updatedMaterials);
    };

    useEffect(() => {
        const newSubtotal = selectedMaterials.reduce((acc, material) => acc + material.amount, 0);
        setSubtotal(newSubtotal);
        const calculatedTotalAmount = newSubtotal + parseFloat(manualCharge || 0) - parseFloat(overallDiscount || 0);
        setTotalAmount(calculatedTotalAmount);
    }, [selectedMaterials, manualCharge, overallDiscount]);

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
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSave = () => {
        const formattedAttachments = attachments.map(file => ({
            url: URL.createObjectURL(file),
            file_name: file.name
        }));

        const newPurchaseData = {
            mp_party: party,
            mp_materials: selectedMaterials,
            mp_subtotal: subtotal,
            mp_manualCharge: manualCharge,
            mp_overallDiscount: overallDiscount,
            mp_totalAmount: totalAmount,
            mp_paidAmount: paidAmount,
            mp_costCode: costCode,
            mp_reference: reference,
            mp_note: note,
            mp_attachment: formattedAttachments
        };

        const updatedProjectData = {
            ...projectData,
            purchase: [...(projectData.purchase || []), newPurchaseData]
        };

        axios.put(`${PROJECT_DETAIL}/${projectData._id}`, updatedProjectData)
            .then(response => {
                console.log("Data updated successfully:", response.data);
                
                alert("Data saved successfully!");
            })
            .catch(error => {
                console.error("Error updating project data:", error);
                alert("Failed to save data. Please try again.");
            });
    };

    return (
        <div className="p-4">
            {/* Party Name */}
            <label className="block font-medium text-gray-700 mb-1">Party Name</label>
            <div ref={partyDropdownRef} className="relative">
                <input
                    type="text"
                    value={party}
                    onChange={(e) => {
                        setParty(e.target.value);
                        setIsPartyDropdownOpen(true);
                    }}
                    onFocus={() => setIsPartyDropdownOpen(true)}
                    className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:border-blue-400"
                    placeholder="Search Party"
                    readOnly={mode !== 'edit'}
                />
                {isPartyDropdownOpen && filteredParties.length > 0 && (
                    <ul className="absolute z-10 border border-gray-300 rounded bg-white max-h-48 overflow-y-auto w-full mb-4 shadow-lg">
                        {filteredParties.map((p) => (
                            <li
                                key={p._id}
                                onClick={() => { setParty(p.party_name); setIsPartyDropdownOpen(false); }}
                                className="p-2 cursor-pointer hover:bg-gray-100"
                            >
                                {p.party_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Material Name */}
            <label className="block font-medium text-gray-700 mb-1">Material Name</label>
            <div ref={materialDropdownRef} className="relative">
                <input
                    type="text"
                    value={materialSearch}
                    onChange={(e) => setMaterialSearch(e.target.value)}
                    onClick={() => setIsMaterialDropdownOpen(true)}
                    className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:border-blue-400"
                    placeholder="Search Material"
                    readOnly={mode !== 'edit'}
                />
                {isMaterialDropdownOpen && filteredMaterials.length > 0 && (
                    <ul className="absolute z-10 border border-gray-300 rounded bg-white max-h-48 overflow-y-auto w-full mb-4 shadow-lg">
                        {filteredMaterials.map((m) => (
                            <li
                                key={m._id}
                                onClick={() => handleAddMaterial(m)}
                                className="p-2 cursor-pointer hover:bg-gray-100"
                            >
                                {m.material_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Selected Materials */}
            {selectedMaterials.map((material, index) => (
    <div key={index} className="border border-gray-300 p-4 mb-4 rounded shadow-sm">
        <h4 className="font-medium text-gray-700 mb-2">{material.material_name}</h4>
        
        <input
            type="number"
            placeholder="Quantity"
            value={material.quantity}
            onChange={(e) => handleUpdateMaterial(index, 'quantity', parseFloat(e.target.value) || '')}
            readOnly={mode !== 'edit'}
            className={`border border-gray-300 p-2 rounded w-full mb-2 focus:outline-none ${mode !== 'edit' ? 'bg-gray-100' : ''}`}
        />

        <input
            type="number"
            placeholder="Rate per Unit"
            value={material.rate||''}
            onChange={(e) => handleUpdateMaterial(index, 'rate', parseFloat(e.target.value) || '')}
            readOnly={mode !== 'edit'}
            className={`border border-gray-300 p-2 rounded w-full mb-2 focus:outline-none ${mode !== 'edit' ? 'bg-gray-100' : ''}`}
        />

        <input
            type="number"
            placeholder="Discount (%)"
            value={material.discount || ''}
            onChange={(e) => handleUpdateMaterial(index, 'discount', parseFloat(e.target.value) || '')}
            readOnly={mode !== 'edit'}
            className={`border border-gray-300 p-2 rounded w-full mb-2 focus:outline-none ${mode !== 'edit' ? 'bg-gray-100' : ''}`}
        />

        <input
            type="number"
            placeholder="GST (%)"
            value={material.gst||''}
            onChange={(e) => handleUpdateMaterial(index, 'gst', parseFloat(e.target.value) || '')}
            readOnly={mode !== 'edit'}
            className={`border border-gray-300 p-2 rounded w-full mb-2 focus:outline-none ${mode !== 'edit' ? 'bg-gray-100' : ''}`}
        />

        <div className="mt-2 text-gray-600">Amount: ₹{material.amount.toFixed(2)}</div>
    </div>
))}
{/* Manual Charge */}
<label className="block font-medium text-gray-700 mb-1">Manual Charge</label>
        <input
            type="number"
            value={manualCharge||''}
            onChange={(e) => setManualCharge(parseFloat(e.target.value) || 0)}
            className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:border-blue-400"
            placeholder="Enter manual charge"
            readOnly={mode !== 'edit'}
        />

        {/* Overall Discount */}
        <label className="block font-medium text-gray-700 mb-1">Overall Discount (%)</label>
        <input
            type="number"
            value={overallDiscount||''}
            onChange={(e) => setOverallDiscount(parseFloat(e.target.value) || 0)}
            className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:border-blue-400"
            placeholder="Enter overall discount"
            readOnly={mode !== 'edit'}
        />

        {/* Subtotal - Read-Only */}
        <label className="block font-medium text-gray-700 mb-1">Subtotal</label>
        <input
            type="number"
            value={subtotal.toFixed(2)}
            readOnly
            className="border border-gray-300 p-2 rounded w-full mb-4 bg-gray-100"
        />

        {/* Total Amount - Read-Only */}
        <label className="block font-medium text-gray-700 mb-1">Total Amount</label>
        <input
            type="number"
            value={totalAmount.toFixed(2)}
            readOnly
            className="border border-gray-300 p-2 rounded w-full mb-4 bg-gray-100"
        />

        {/* Paid Amount */}
        <label className="block font-medium text-gray-700 mb-1">Paid Amount</label>
        <input
            type="number"
            value={paidAmount}
            onChange={(e) => setPaidAmount(parseFloat(e.target.value) || 0)}
            className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:border-blue-400"
            placeholder="Enter paid amount"
            readOnly={mode !== 'edit'}
        />

        {/* Cost Code */}
        <label className="block font-medium text-gray-700 mb-1">Cost Code</label>
        <input
            type="text"
            value={costCode}
            onChange={(e) => setCostCode(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:border-blue-400"
            placeholder="Enter cost code"
            readOnly={mode !== 'edit'}
        />

        {/* Reference */}
        <label className="block font-medium text-gray-700 mb-1">Reference</label>
        <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:border-blue-400"
            placeholder="Enter reference"
            readOnly={mode !== 'edit'}
        />

        {/* Note */}
        <label className="block font-medium text-gray-700 mb-1">Note</label>
        <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:border-blue-400"
            placeholder="Add a note"
            readOnly={mode !== 'edit'}
        />

        {/* Attachments */}
        <label className="block font-medium text-gray-700 mb-1">Attachments</label>
        <input
            type="file"
            onChange={(e) => setAttachments([...attachments, ...e.target.files])}
            className="border border-gray-300 p-2 rounded w-full mb-4"
            disabled={mode !== 'edit'}
            multiple
        />


            {mode === 'edit' && (
                <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Save
                </button>
            )}
        </div>
    );
};

export default MaterialPurchase;
