import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TRANSACTION_DETAIL } from '../../api/api';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '../../Reusable/Toast';

const TABS = ["Expense", "Voice", "Transfer", "Purchase"];

const PopupTabContainer = () => {
    const [transactionData, setTransactionData] = useState({});
    const [selectedTab, setSelectedTab] = useState("Expense"); // Default to "Expense"
    const [showUploadBills, setShowUploadBills] = useState(false);
    const showToast = useToast();
    const { transactionId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    
    // Retrieve mode from location state
    const { mode } = location.state || {};
    const isEditable = mode === 'edit';

    useEffect(() => {
        if (transactionId) {
            axios.get(`${TRANSACTION_DETAIL}/${transactionId}`)
                .then(response => setTransactionData(response.data.data || {}))
                .catch(err => console.error("Error loading transaction data:", err));
        }
    }, [transactionId]);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setTransactionData(prev => ({ ...prev, [name]: value }));
    };
    const onFileChange = (e) => {
        const files = Array.from(e.target.files);
        const bills = files.map(file => ({ url: URL.createObjectURL(file), file_name: file.name }));
        setTransactionData(prev => ({ ...prev, upload_bills: [...prev.upload_bills, ...bills] }));
    };

    const onSave = () => {
        const request = transactionId ? axios.put : axios.post;
        const url = transactionId ? `${TRANSACTION_DETAIL}/${transactionId}` : TRANSACTION_DETAIL;

        request(url, transactionData)
            .then(() => showToast("Transaction saved successfully!", "success"))
            .catch(() => showToast("Error saving transaction", "error"));
    };

    if (!transactionData) return <p>Loading...</p>;

    const renderField = (name, label) => (
        isEditable ? (
            <div className="mb-4">
                <label className="block font-medium">{label}</label>
                <input
                    type="text"
                    name={name}
                    value={transactionData[name] || ''}
                    onChange={onChangeInput}
                    className="border p-2 rounded w-full"
                />
            </div>
        ) : (
            <p><strong>{label}:</strong> {transactionData[name]}</p>
        )
    );

    const renderContent = () => {
        switch (selectedTab) {
            case "Expense":
                return (
                    <>
                        {renderField("transaction_id", "Transaction ID")}
                        {renderField("payment_type", "Payment Type")}
                        {renderField("party_name", "Party Name")}
                        {renderField("payment_method", "Payment Method")}
                        {renderField("category", "Category")}
                        {renderField("note", "Note")}
                        {renderField("date", "Date")}
                        {renderField("amount", "Amount")}
                        {renderField("paid_by", "Paid By")}

                        {/* Toggle Upload Bills section */}
                        <button
                            onClick={() => setShowUploadBills(!showUploadBills)}
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                        >
                            {showUploadBills ? "Hide Upload Bills" : "Show Upload Bills"}
                        </button>

                        {showUploadBills && (
                            <div className="mt-4">
                                <input
                                    type="file"
                                    multiple
                                    onChange={onFileChange}
                                    className="border p-2 rounded w-full"
                                />
                                <ul className="mt-2">
                                    {transactionData.upload_bills && transactionData.upload_bills.map((bill, index) => (
                                        <li key={index} className="flex items-center mt-2">
                                            <a href={bill.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                                {bill.file_name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </>
                );
            case "Voice":
                return (
                    <>
                        {renderField("voice_amount", "Voice Amount")}
                        {renderField("voice_reference", "Voice Reference")}
                        {renderField("date", "Date")}
                        {renderField("description", "Description")}
                    </>
                );
            case "Transfer":
                return (
                    <>
                        {renderField("transfer_amount", "Transfer Amount")}
                        {renderField("from_account", "From Account")}
                        {renderField("to_account", "To Account")}
                        {renderField("date", "Date")}
                    </>
                );
            case "Purchase":
                return (
                    <>
                        {renderField("item_name", "Item Name")}
                        {renderField("quantity", "Quantity")}
                        {renderField("supplier", "Supplier")}
                        {renderField("purchase_date", "Purchase Date")}
                        {renderField("total_cost", "Total Cost")}
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="container 100vh mx-auto p-6 relative">
            <div className="flex">
                <div className="m-5 w-[12%] h-fit border rounded-lg border-gray-300">
                    <ul className="space-y-2">
                        {TABS.map((tab) => (
                            <li
                                key={tab}
                                onClick={() => setSelectedTab(tab)}
                                className={`cursor-pointer p-2 ${selectedTab === tab ? 'bg-gray-300' : ''}`}
                            >
                                {tab}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-3/4 p-4 h-100vh">
                    <h3 className="text-2xl font-bold mb-4">{selectedTab}</h3>
                    <div className="max-h-96 overflow-y-auto">
                        {renderContent()}
                    </div>
                    {isEditable && (
                        <button onClick={onSave} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                            Submit
                        </button>
                    )}
                </div>
            </div>
            <button onClick={() => navigate('/estimation')} className="absolute top-8 right-10 bg-red-500 text-white px-4 py-2 rounded mt-4">
                Close
            </button>
        </div>
    );
};

export default PopupTabContainer;
