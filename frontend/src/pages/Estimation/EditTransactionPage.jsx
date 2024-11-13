import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PARTY_DETAIL, TRANSACTION_DETAIL } from '../../api/api';
import { useToast } from '../../Reusable/Toast';

const CreateTransactionPage = () => {
    const [transactionData, setTransactionData] = useState({
        transaction_id: '',
        payment_type: '',
        party_name: '',
        payment_method: '',
        category: '',
        note: '',
        upload_bills: [],
        date: '',
        amount: '',
        paid_by: ''
    });
    const showToast = useToast();
    const navigate = useNavigate();
    const [partys, setpartys] = useState([]); 

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setTransactionData(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        axios.get(`${PARTY_DETAIL}`)
            .then(response => {
                setpartys(response.data.data);  // Assuming the data contains an array of clients
            })
            .catch(err => {
                showToast("Error fetching client data", "error");
                console.error(err);
            });
    }, []);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const uploadedFiles = files.map(file => ({
            url: URL.createObjectURL(file), // Temporary URL for preview, replace with actual URL after upload
            file_name: file.name
        }));
        setTransactionData(prev => ({
            ...prev,
            upload_bills: [...prev.upload_bills, ...uploadedFiles]
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        // Send the data without transaction_id first
        const { transaction_id, ...dataWithoutTransactionId } = transactionData;

        axios.post(TRANSACTION_DETAIL, dataWithoutTransactionId)
            .then(response => {
                const newTransactionId = `t_id_${response.data.data._id}`; // Assuming response.data.data._id holds the new _id from the backend
                const updatedTransactionData = { ...transactionData, transaction_id: newTransactionId };

                // Update the transaction with the generated transaction_id
                return axios.put(`${TRANSACTION_DETAIL}/${response.data.data._id}`, updatedTransactionData);
            })
            .then(() => {
                showToast("Transaction created successfully!", "success");
                navigate('/estimation');
            })
            .catch(() => {
                showToast("Error creating transaction", "error");
            });
    };

    return (
        <div className="p-6 w-full">
            <h3 className="text-2xl font-bold mb-4">Create Transaction</h3>
            <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
                <select
                    name="payment_type"
                    value={transactionData.payment_type}
                    onChange={onChangeInput}
                    className="border p-2 rounded w-full"
                >
                    <option value="">Select Payment Type</option>
                    <option value="Payment In">Payment In</option>
                    <option value="Payment Out">Payment Out</option>
                </select>
                <select
                    name="party_name"
                    value={transactionData.party_name || ''}
                    onChange={onChangeInput}
                    className="border p-2 rounded w-full"
                >
                    <option value="">Select Party</option>
                    {partys.map(party => (
                            <option key={party._id} value={party.party_name}>
                                {party.party_name}
                            </option>
                        ))}
                    {/* Map party options here */}
                </select>
                <select
                    name="payment_method"
                    value={transactionData.payment_method}
                    onChange={onChangeInput}
                    className="border p-2 rounded w-full"
                >
                    <option value="">Select Payment Method</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer</option> 
                    <option value="Cheque">Cheque</option>
                    <option value="Online">Online</option>
                </select>
                <select 
                    name="category"
                    value={transactionData.category}
                    onChange={onChangeInput}
                    className="border p-2 rounded w-full"
                > 
                    <option value="">Select Category</option>
                    <option value="Category 1">Category 1</option> 
                    <option value="Category 2">Category 2</option>
                </select>
                <textarea
                    name="note"
                    value={transactionData.note}
                    onChange={onChangeInput}
                    placeholder="Note"
                    className="border p-2 rounded w-full col-span-2"
                />
                <input
                    type="date"
                    name="date"
                    value={transactionData.date}
                    onChange={onChangeInput}
                    className="border p-2 rounded w-full"
                />
                <input
                    type="number"
                    name="amount"
                    value={transactionData.amount}
                    onChange={onChangeInput}
                    placeholder="Amount"
                    className="border p-2 rounded w-full"
                />
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="border p-2 rounded w-full col-span-2"
                />
                <input
                    type="text"
                    name="paid_by"
                    value={transactionData.paid_by}
                    onChange={onChangeInput}
                    placeholder="Paid By"
                    className="border p-2 rounded w-full col-span-2"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded col-span-2"
                >
                    Create
                </button>
            </form>
        </div>
    );
};

export default CreateTransactionPage;
