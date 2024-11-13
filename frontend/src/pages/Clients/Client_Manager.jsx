// Client_Manager.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClientFormModal from './Client_Form_Modal';
import { CLIENT_DETAIL } from '../../api/api';

const Client_Manager = () => {
    const [clients, setClients] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [action, setAction] = useState('');
    const [dropdownClient, setDropdownClient] = useState(null);

    const loadClients = () => {
        axios.get(CLIENT_DETAIL)
            .then(response => setClients(response.data.data))
            .catch(() => setClients([]));
    };

    useEffect(() => {
        loadClients();
    }, []);

    const handleCreate = () => {
        setSelectedClient(null);
        setAction('create');
        setShowModal(true);
    };

    const handleView = (client) => {
        setSelectedClient(client);
        setAction('view');
        setShowModal(true);
    };

    const handleUpdate = (client) => {
        setSelectedClient(client);
        setAction('update');
        setShowModal(true);
    };

    const handleDelete = (clientId) => {
        axios.delete(`${CLIENT_DETAIL}/${clientId}`)
            .then(loadClients)
            .catch(console.error);
    };

    const toggleDropdown = (clientId) => {
        setDropdownClient(dropdownClient === clientId ? null : clientId);
    };

    return (
        <div className="p-6 w-full">
            <h3 className="text-2xl font-bold mb-4">Client Management</h3>
            <button onClick={handleCreate} className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600">
                Add Client
            </button>

            {showModal && (
                <ClientFormModal
                    open={showModal}
                    onClickClose={() => setShowModal(false)}
                    loadClients={loadClients}
                    client={selectedClient}
                    action={action}
                />
            )}

           <div className='flex gap-5 flex-wrap'>
                    {clients.map((client) => (
                        <div  key={client._id} className="flex w-[32%]  min-w-[300px]  flex-col justify-between hover:bg-white-100 border-2 rounded-lg">
                            <div className='flex  w-full justify-between'>
                            <div className="p-2"><p><strong>{client.client_name}</strong><br></br>{client.email_address}</p></div>
                            <div className=" p-2 relative">
                                <button
                                    onClick={() => toggleDropdown(client._id)}
                                    className="font-extrabold px-2 py-1 rounded hover:bg-gray-200"
                                >
                                    ⋮
                                </button>
                                {dropdownClient === client._id && (
                                    <div className="absolute mt-1 bg-white border rounded shadow-md right-0 z-10 w-28">
                                        <button
                                            onClick={() => { handleView(client); setDropdownClient(null); }}
                                            className="w-full px-4 py-2 text-left"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => { handleUpdate(client); setDropdownClient(null); }}
                                            className="w-full px-4 py-2 text-left"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => { handleDelete(client._id); setDropdownClient(null); }}
                                            className="w-full px-4 py-2 text-left"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                            </div>
                            
                            
                            <div className=" p-2"><strong><h4>Company Address</h4></strong> {client.address}{client.city}-{client.zip_code},{client.country}</div>
                            
                            <div className="flex justify-between border-2 m-2  p-2 rounded-lg bg-grey-600 p-2">
                           <div className='font-semibold'> <h4>Phone Number</h4> </div>
                             <div className='flex flex-row gap-3'> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#75FB4C"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/></svg>  {client.phone_number}</div> 
                                </div>
                            
                        </div>
                        
                    ))}
                </div>
        </div>
    );
};

export default Client_Manager;
