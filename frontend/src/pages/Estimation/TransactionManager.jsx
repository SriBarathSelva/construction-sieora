import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TRANSACTION_DETAIL } from '../../api/api';

const TransactionManager = () => {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTransactions, setSelectedTransactions] = useState([]);
    const [dropdownTransaction, setDropdownTransaction] = useState(null);
    const navigate = useNavigate();
    const transactionsPerPage = 5;

    const loadTransactions = () => {
        axios.get(TRANSACTION_DETAIL)
            .then(response => {
                setTransactions(response.data.data);
                setFilteredTransactions(response.data.data);
            })
            .catch(() => setTransactions([]));
    };

    useEffect(() => {
        loadTransactions();
    }, []);

    const handleCreate = () => navigate('/transaction/create');

    const handleView = (transaction) => navigate(`/transaction/view/${transaction._id}`,{ state: { mode: 'view' } });

    const handleUpdate = (transaction) => navigate(`/transaction/edit/${transaction._id}`,{ state: { mode: 'edit' } });

    const handleDelete = (transactionId) => {
        axios.delete(`${TRANSACTION_DETAIL}/${transactionId}`)
            .then(loadTransactions)
            .catch(err => console.error("Failed to delete transaction:", err));
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        filterTransactions(e.target.value, categoryFilter);
    };

    const handleCategoryFilter = (e) => {
        setCategoryFilter(e.target.value);
        filterTransactions(searchTerm, e.target.value);
    };

    const toggleDropdown = (transactionId) => setDropdownTransaction(dropdownTransaction === transactionId ? null : transactionId);

    const filterTransactions = (search, category) => {
        let filtered = transactions;
        if (search) {
            filtered = filtered.filter(transaction => 
                transaction.party_name.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (category) {
            filtered = filtered.filter(transaction => transaction.category === category);
        }
        setFilteredTransactions(filtered);
        setCurrentPage(1);
    };

    const paginateTransactions = () => {
        const start = (currentPage - 1) * transactionsPerPage;
        return filteredTransactions.slice(start, start + transactionsPerPage);
    };

    const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

    return (
        <div className="p-6 w-full">
            <h3 className="text-2xl font-bold mb-4">Transaction Management</h3>
            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Search by party name"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-4 pr-4 py-2 border rounded w-full"
                />
                <select
                    value={categoryFilter}
                    onChange={handleCategoryFilter}
                    className="border p-2 rounded ml-4"
                >
                    <option value="">All Categories</option>
                    <option value="Category1">Category 1</option>
                    <option value="Category 2">Category 2</option>
                </select>
            </div>
            <button onClick={handleCreate} className="bg-green-500 text-white px-4 py-2 rounded mb-4">
                Add Transaction
            </button>

            <table className="mt-4 w-full text-center bg-white rounded-lg shadow-xl">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Party Name</th>
                        <th className="border p-2">Category</th>
                        <th className="border p-2">Amount</th>
                        <th className="border p-2">Date</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginateTransactions().map((transaction) => (
                        <tr key={transaction._id} className="hover:bg-gray-100">
                            <td className="border p-2">{transaction.party_name}</td>
                            <td className="border p-2">{transaction.category}</td>
                            <td className="border p-2">{transaction.amount}</td>
                            <td className="border p-2">{transaction.date}</td>
                            <td className="border p-2">
                            <button
                                    onClick={() => toggleDropdown(transaction._id)}
                                    className="font-extrabold px-2 py-1 rounded hover:bg-gray-200"
                                >
                                    ⋮
                                </button>
                                {dropdownTransaction === transaction._id && (
                                    <div className="absolute mt-1 bg-white border rounded shadow-md right-0 z-10 w-28">
                                        <button
                                            onClick={() => { handleView(transaction); setDropdownTransaction(null); }}
                                            className="w-full px-4 py-2 text-left"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => { handleUpdate(transaction); setDropdownTransaction(null); }}
                                            className="w-full px-4 py-2 text-left"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => { handleDelete(transaction._id); setDropdownTransaction(null); }}
                                            className="w-full px-4 py-2 text-left"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-center items-center mt-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className="px-3 py-1 border rounded mr-2"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className="px-3 py-1 border rounded ml-2"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TransactionManager;