import React, { useState } from "react";

export default function OpeningBalanceModal({ partyData, setPartyData, onClose }) {
    const [openingBalance, setOpeningBalance] = useState({
        party_will_pay: partyData.party_will_pay || false,
        party_will_receive: partyData.party_will_receive || false,
        amount: partyData.amount || "",
    });

    const onChangeInput = (e) => {
        const { name, type, checked } = e.target;

        // Ensure only one checkbox is true at a time
        if (name === "party_will_pay" && checked) {
            setOpeningBalance((prev) => ({
                ...prev,
                party_will_pay: true,
                party_will_receive: false, // Uncheck the other box
            }));
        } else if (name === "party_will_receive" && checked) {
            setOpeningBalance((prev) => ({
                ...prev,
                party_will_receive: true,
                party_will_pay: false, // Uncheck the other box
            }));
        } else {
            setOpeningBalance((prev) => ({
                ...prev,
                [name]: checked,
            }));
        }
    };

    const handleSave = () => {
        setPartyData((prev) => ({
            ...prev,
            ...openingBalance,
        }));
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
                <h2 className="text-lg font-bold">Opening Balance</h2>
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        name="party_will_pay"
                        checked={openingBalance.party_will_pay}
                        onChange={onChangeInput}
                    />
                    <label>Party Will Pay</label>
                </div>
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        name="party_will_receive"
                        checked={openingBalance.party_will_receive}
                        onChange={onChangeInput}
                    />
                    <label>Party Will Receive</label>
                </div>
                <input
                    type="text"
                    name="amount"
                    value={openingBalance.amount}
                    onChange={(e) => setOpeningBalance({ ...openingBalance, amount: e.target.value })}
                    placeholder="Amount (₹)"
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
