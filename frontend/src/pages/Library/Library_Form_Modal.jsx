import React, { useState, useEffect } from "react";
import axios from "axios";
import { LIBRARY_DETAIL } from "../../api/api";
import { useToast } from "../../Reusable/Toast";

export default function LibraryFormModal({ open, onClickClose, loadLibraries, library, action }) {
    const showToast = useToast();

    const initialLibraryObject = {
        material_name: "",
        nos: "",
        gst: "",
        cost_code: "",
        description: ""
    };

    const [libraryData, setLibraryData] = useState(initialLibraryObject);
    const [costCodes, setCostCodes] = useState([
        "door", "ceiling", "stairs", "Add new cost code..."
    ]);
    const [isAddingNewCostCode, setIsAddingNewCostCode] = useState(false);
    const [newCostCode, setNewCostCode] = useState("");

    useEffect(() => {
        if (library) {
            setLibraryData(library);
        }
    }, [library]);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setLibraryData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onCostCodeChange = (e) => {
        const { value } = e.target;
        if (value === "Add new cost code...") {
            setIsAddingNewCostCode(true);
            setLibraryData((prev) => ({ ...prev, cost_code: "" }));  // Clear the cost_code field
        } else {
            setIsAddingNewCostCode(false);
            setLibraryData((prev) => ({ ...prev, cost_code: value }));
        }
    };

    const handleNewCostCodeChange = (e) => {
        setNewCostCode(e.target.value);
        setLibraryData((prev) => ({ ...prev, cost_code: e.target.value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (isAddingNewCostCode && newCostCode) {
            setCostCodes([...costCodes, newCostCode]);  // Add new cost code to the list
        }
        
        const endpoint = action === 'create' ? axios.post : axios.put;
        const url = action === 'create' ? LIBRARY_DETAIL : `${LIBRARY_DETAIL}/${libraryData._id}`;
        const message = action === 'create' ? "Library item created successfully!" : "Library item updated successfully!";

        endpoint(url, libraryData)
            .then((resp) => {
                showToast(resp.data.message || message, "success");
                onClickClose();
                loadLibraries();
                setLibraryData(initialLibraryObject);
            })
            .catch(() => {
                showToast("Error processing library item", "error");
            });
    };

    const isViewMode = action === 'view';

    return (
        <div className={`fixed inset-0 z-50 ${open ? 'flex' : 'hidden'} items-center justify-center bg-black bg-opacity-50`}>
            <form
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl space-y-4"
                onSubmit={onSubmit}
            >
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">
                        {isViewMode ? "View Library Item" : action === 'update' ? "Update Library Item" : "Create Library Item"}
                    </h1>
                    <button onClick={onClickClose} className="text-gray-500 hover:text-gray-700">X</button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="material_name"
                        value={libraryData.material_name}
                        onChange={onChangeInput}
                        placeholder="Material Name"
                        readOnly={isViewMode}
                        className="border p-2 rounded w-full"
                    />

                    {/* Nos Dropdown */}
                    <select
                        name="nos"
                        value={libraryData.nos}
                        onChange={onChangeInput}
                        disabled={isViewMode}
                        className="border p-2 rounded w-full"
                    >
                        <option value="">Select Nos</option>
                        {["nos", "numbers", "kg", "bags", "cft", "tonne", "brass", "litre", "sqft", "km",
                          "meter", "box", "ft", "cum", "quintal", "mmsqm", "kilolitre", "in", "gram",
                          "cm", "lb", "trips", "unit", "hours", "Barrel", "Days", "Dozen", "Length",
                          "Litre", "RMT", "bundle", "drum", "gallons", "ml", "Work", "pac", "pair", 
                          "pcs", "per day", "roll", "set", "sheet"].map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>

                    {/* GST Dropdown */}
                    <select
                        name="gst"
                        value={libraryData.gst}
                        onChange={onChangeInput}
                        disabled={isViewMode}
                        className="border p-2 rounded w-full"
                    >
                        <option value="">Select GST</option>
                        {["18", "12", "5", "0", "28", "0.1", "0.25", "1.5", "3", "6", "7.5", "14"].map(rate => (
                            <option key={rate} value={rate}>{rate}%</option>
                        ))}
                    </select>

                    {/* Cost Code Dropdown with Add New Option */}
                    <select
                        name="cost_code"
                        value={libraryData.cost_code}
                        onChange={onCostCodeChange}
                        disabled={isViewMode}
                        className="border p-2 rounded w-full"
                    >
                        <option value="">Select Cost Code</option>
                        {costCodes.map(code => (
                            <option key={code} value={code}>{code}</option>
                        ))}
                    </select>

                    {/* Show input field if "Add new cost code..." is selected */}
                    {isAddingNewCostCode && (
                        <input
                            type="text"
                            placeholder="Enter new cost code"
                            value={newCostCode}
                            onChange={handleNewCostCodeChange}
                            className="border p-2 rounded w-full"
                        />
                    )}

                    <textarea
                        name="description"
                        value={libraryData.description}
                        onChange={onChangeInput}
                        placeholder="Description"
                        readOnly={isViewMode}
                        className="border p-2 rounded w-full col-span-2"
                    />
                </div>

                {!isViewMode && (
                    <div className="flex justify-end mt-4">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            {action === 'create' ? "Create →" : "Update →"}
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}
