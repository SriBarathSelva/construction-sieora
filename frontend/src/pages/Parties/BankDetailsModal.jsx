import React, { useState } from "react";

export default function BankDetailsModal({ partyData, setPartyData, onClose }) {
    const [bankDetails, setBankDetails] = useState({
        account_holder_name: partyData.account_holder_name || "",
        account_number: partyData.account_number || "",
        IFSC_Code: partyData.IFSC_Code || "",
        bank_name: partyData.bank_name || "",
        bank_address: partyData.bank_address || "",
        Iban_number: partyData.Iban_number || "",
        UPI_Number: partyData.UPI_Number || "",
    });

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setBankDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        setPartyData((prev) => ({
            ...prev,
            ...bankDetails,
        }));
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
                <h2 className="text-lg font-bold">Bank Holder Details</h2>
                <input
                    type="text"
                    name="account_holder_name"
                    value={bankDetails.account_holder_name}
                    onChange={onChangeInput}
                    placeholder="Account Holder Name"
                    className="border p-2 rounded w-full"
                />
                <input
                    type="text"
                    name="account_number"
                    value={bankDetails.account_number}
                    onChange={onChangeInput}
                    placeholder="Account Number"
                    className="border p-2 rounded w-full"
                />
                <input
                    type="text"
                    name="IFSC_Code"
                    value={bankDetails.IFSC_Code}
                    onChange={onChangeInput}
                    placeholder="IFSC Code"
                    className="border p-2 rounded w-full"
                />
                <input
                    type="text"
                    name="bank_name"
                    value={bankDetails.bank_name}
                    onChange={onChangeInput}
                    placeholder="Bank Name"
                    className="border p-2 rounded w-full"
                />
                <input
                    type="text"
                    name="bank_address"
                    value={bankDetails.bank_address}
                    onChange={onChangeInput}
                    placeholder="Bank Address"
                    className="border p-2 rounded w-full"
                />
                <input
                    type="text"
                    name="Iban_number"
                    value={bankDetails.Iban_number}
                    onChange={onChangeInput}
                    placeholder="IBAN Number"
                    className="border p-2 rounded w-full"
                />
                <input
                    type="text"
                    name="UPI_Number"
                    value={bankDetails.UPI_Number}
                    onChange={onChangeInput}
                    placeholder="UPI Number"
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
