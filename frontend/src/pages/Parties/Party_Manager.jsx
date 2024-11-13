import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PartyFormModal from './Party_Form_Modal';
import { PARTY_DETAIL } from '../../api/api';

const Party_Manager = () => {
    const [parties, setParties] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedParty, setSelectedParty] = useState(null);
    const [action, setAction] = useState('');
    const [dropdownParty, setDropdownParty] = useState(null);

    const loadParties = () => {
        axios.get(PARTY_DETAIL)
            .then(response => setParties(response.data.data))
            .catch(() => setParties([]));
    };

    useEffect(() => {
        loadParties();
    }, []);

    const handleCreate = () => {
        setSelectedParty(null);
        setAction('create');
        setShowModal(true);
    };
    
    const handleView = (party) => {
        setSelectedParty(party);
        setAction('view');
        setShowModal(true);
    };
    
    const handleUpdate = (party) => {
        setSelectedParty(party);
        setAction('update');
        setShowModal(true);
    };

    const handleDelete = (partyId) => {
        axios.delete(`${PARTY_DETAIL}/${partyId}`)
            .then(loadParties)
            .catch((error) => console.error("Error deleting party:", error));
    };

    const toggleDropdown = (partyId) => {
        setDropdownParty(dropdownParty === partyId ? null : partyId);
    };

    return (
        <div className="p-6 w-full">
            <h3 className="text-2xl font-bold mb-4">Party Management</h3>
            <button onClick={handleCreate} className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600">
                Add Party
            </button>

            {showModal && (
                <PartyFormModal
                open={showModal}
                onClickClose={() => setShowModal(false)}
                loadpartys={loadParties}
                party={selectedParty}
                action={action}
            />
            )}

            <div className='grid grid-cols-3 gap-2'>
                {parties.map((party) => (
                    <div key={party._id} className="flex flex-col justify-between hover:bg-gray-100 border-2 rounded-lg">
                        <div className='flex w-full justify-between'>
                            <div className="p-2">
                                <strong>{party.party_name}</strong><br />{party.email}
                            </div>
                            <div className="p-2 relative">
                                <button
                                    onClick={() => toggleDropdown(party._id)}
                                    className="font-extrabold px-2 py-1 rounded hover:bg-gray-200"
                                >
                                    ⋮
                                </button>
                                {dropdownParty === party._id && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                                        <button onClick={() => handleView(party)} className="block px-4 py-2 hover:bg-gray-200 w-full text-left">View</button>
                                        <button onClick={() => handleUpdate(party)} className="block px-4 py-2 hover:bg-gray-200 w-full text-left">Edit</button>
                                        <button onClick={() => handleDelete(party._id)} className="block px-4 py-2 hover:bg-gray-200 w-full text-left">Delete</button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-center p-2 bg-gray-200">
                            <span>{party.role}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Party_Manager;
