import React, { useState, useEffect } from "react";
import axios from "axios";
import { PARTY_DETAIL } from "../../api/api";
import { useToast } from "../../Reusable/Toast";
import GstDetailsModal from "./GstDetailsModal";
import OpeningBalanceModal from "./OpeningBalanceModal";
import BankDetailsModal from "./BankDetailsModal";

export default function PartyFormModal({ open, onClickClose, loadpartys, party, action }) {
    const showToast = useToast();

    const initialPartyObject = {
        party_name: "",
        phone_number: "",
        party_type: "",
        email: "",
        gst: "",
        legal_business_name: "",
        state_of_supply: "",
        billing_address: "",
        party_will_pay: false,
        party_will_receive: false,
        amount: "",
        account_holder_name: "",
        account_number: "",
        IFSC_Code: "",
        bank_name: "",
        bank_address: "",
        Iban_number: "",
        UPI_Number: ""
    };

    const [partyData, setPartyData] = useState(initialPartyObject);
    const [showGstModal, setShowGstModal] = useState(false);
    const [showOpeningBalanceModal, setShowOpeningBalanceModal] = useState(false);
    const [showBankDetailsModal, setShowBankDetailsModal] = useState(false);

    useEffect(() => {
        console.log("Action:", action); // Check if this shows the correct action in the console
        if (party) {
            setPartyData(party);
        } else {
            setPartyData(initialPartyObject);
        }
    }, [party, action]);

    const onChangeInput = (e) => {
        const { name, value, type, checked } = e.target;
        setPartyData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!action) return; // Ensure action is defined before proceeding
    
        const endpoint = action === 'create' ? axios.post : axios.put;
        const url = action === 'create' ? PARTY_DETAIL : `${PARTY_DETAIL}/${partyData._id}`;
        const message = action === 'create' ? "Party created successfully!" : "Party updated successfully!";
    
        endpoint(url, partyData)
            .then((resp) => {
                showToast(resp.data.message || message, "success");
                onClickClose();
                loadpartys(); // Ensure this is correctly spelled as loadParties if refactored
                setPartyData(initialPartyObject);
            })
            .catch((error) => {
                showToast("Error processing party", "error");
                console.error("Form submission error:", error);
            });
    };

    const isViewMode = action === 'view';
    const isClientLabourStaff = ["","client", "labour", "staff"].includes(partyData.party_type);

    return (
        <div className={`fixed inset-0 z-50 ${open ? 'flex' : 'hidden'} items-center justify-center bg-black bg-opacity-50`}>
            <form
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl space-y-4"
                onSubmit={onSubmit}
            >
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">
                        {isViewMode ? "View Party" : action === 'update' ? "Update Party" : "Create Party"}
                    </h1>
                    <button onClick={onClickClose} className="text-gray-500 hover:text-gray-700">X</button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <label htmlFor="">Party Name</label>
                    <input
                        type="text"
                        name="party_name"
                        value={partyData.party_name}
                        onChange={onChangeInput}
                        placeholder="Party Name"
                        readOnly={isViewMode}
                        className="border p-2 rounded w-full"
                    />
                    <label htmlFor="">Phone Number</label>
                    <input
                        type="text"
                        name="phone_number"
                        value={partyData.phone_number}
                        onChange={onChangeInput}
                        placeholder="Phone Number"
                        readOnly={isViewMode}
                        className="border p-2 rounded w-full"
                    />
                    <label htmlFor="">Party type</label>
                    <select
                        name="party_type"
                        value={partyData.party_type}
                        onChange={onChangeInput}
                        disabled={isViewMode}
                        className="border p-2 rounded w-full"
                    >
                        <option value="">Select Party Type</option>
                        <option value="client">Client</option>
                        <option value="labour">Labour</option>
                        <option value="staff">Staff</option>
                        <option value="others">others</option>
                        <option value="labour_contractor">Labour Contractor</option>
                        <option value="material_supplier">Material Supplier</option>
                        <option value="equipment_supplier">Equipment Supplier</option>
                        <option value="sub_contractor">Sub Contractor</option>
                    </select>
                    <label htmlFor="">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={partyData.email}
                        onChange={onChangeInput}
                        placeholder="Email Address"
                        readOnly={isViewMode}
                        className="border p-2 rounded w-full"
                    />
                    <label htmlFor="">GST</label>
                    <input
                        type="text"
                        name="gst"
                        value={partyData.gst}
                        onClick={() => setShowGstModal(true)}
                        placeholder="GST"
                        readOnly
                        className="border p-2 rounded w-full cursor-pointer"
                    />
                    <label htmlFor="">Opeining Balance</label>
                    <input
                        type="text"
                        name="amount"
                        value={partyData.amount}
                        onClick={() => setShowOpeningBalanceModal(true)}
                        placeholder="Opening Balance"
                        readOnly
                        className="border p-2 rounded w-full cursor-pointer"
                    />
                    
                    {!isClientLabourStaff && (
                        
                            <input
                            type="text"
                            name="account_holder_name"
                            value={partyData.account_holder_name}
                            onClick={() => setShowBankDetailsModal(true)}
                            placeholder="Bank Holder Details"
                            readOnly
                            className="border p-2 rounded w-full cursor-pointer"
                        />
                    )}
                    

                </div>

                
                {showGstModal && (
                    <GstDetailsModal
                        partyData={partyData}
                        setPartyData={setPartyData}
                        onClose={() => setShowGstModal(false)}
                    />
                )}
                {showOpeningBalanceModal && (
                    <OpeningBalanceModal
                        partyData={partyData}
                        setPartyData={setPartyData}
                        onClose={() => setShowOpeningBalanceModal(false)}
                    />
                )}
                {showBankDetailsModal && (
                    <BankDetailsModal
                        partyData={partyData}
                        setPartyData={setPartyData}
                        onClose={() => setShowBankDetailsModal(false)}
                    />
                )}

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
