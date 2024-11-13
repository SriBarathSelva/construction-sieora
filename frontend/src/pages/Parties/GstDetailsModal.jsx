import React, { useState } from "react";

export default function GstDetailsModal({ partyData, setPartyData, onClose }) {
    const [gstDetails, setGstDetails] = useState({
        legal_business_name: partyData.legal_business_name,
        gst: partyData.gst,
        state_of_supply: partyData.state_of_supply,
        billing_address: partyData.billing_address ,
    });

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setGstDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        setPartyData((prev) => ({
            ...prev,
            ...gstDetails,
        }));
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
                <h2 className="text-lg font-bold">GST Details</h2>
                <input
                    type="text"
                    name="legal_business_name"
                    value={gstDetails.legal_business_name}
                    onChange={onChangeInput}
                    placeholder="Legal Business Name"
                    className="border p-2 rounded w-full"
                />
                <input
                    type="text"
                    name="gst"
                    value={gstDetails.gst}
                    onChange={onChangeInput}
                    placeholder="GST Number"
                    className="border p-2 rounded w-full"
                />
                <input
                    type="text"
                    name="state_of_supply"
                    value={gstDetails.state_of_supply}
                    onChange={onChangeInput}
                    placeholder="State of Supply"
                    className="border p-2 rounded w-full"
                />
                <input
                    type="text"
                    name="billing_address"
                    value={gstDetails.billing_address}
                    onChange={onChangeInput}
                    placeholder="Billing Address"
                    className="border p-2 rounded w-full"
                />
                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="text-gray-500">Cancel</button>
                    <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                </div>
            </div>
        </div>
    );
}
