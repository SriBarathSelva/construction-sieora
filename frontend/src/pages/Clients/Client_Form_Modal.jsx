// ClientFormModal.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CLIENT_DETAIL } from "../../api/api";
import { useToast } from "../../Reusable/Toast";

export default function ClientFormModal({ open, onClickClose, loadClients, client, action }) {
    const showToast = useToast();

    const initialClientObject = {
        client_name: "",
        email_address: "",
        phone_number: "",
        zip_code: "",
        country: "",
        type: "",
        city: "",
        opening: "",
        gst: "",
        address: ""
    };

    const [clientData, setClientData] = useState(initialClientObject);

    useEffect(() => {
        if (client) {
            setClientData(client);
        }
    }, [client]);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setClientData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const endpoint = action === 'create' ? axios.post : axios.put;
        const url = action === 'create' ? CLIENT_DETAIL : `${CLIENT_DETAIL}/${clientData._id}`;
        const message = action === 'create' ? "Client created successfully!" : "Client updated successfully!";

        endpoint(url, clientData)
            .then((resp) => {
                showToast(resp.data.message || message, "success");
                onClickClose();
                loadClients();
                setClientData(initialClientObject);
            })
            .catch(() => {
                showToast("Error processing client", "error");
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
                        {isViewMode ? "View Client" : action === 'update' ? "Update Client" : "Create Client"}
                    </h1>
                    <button onClick={onClickClose} className="text-gray-500 hover:text-gray-700">X</button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="client_name"
                        value={clientData.client_name}
                        onChange={onChangeInput}
                        placeholder="Client Name"
                        readOnly={isViewMode}
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="email"
                        name="email_address"
                        value={clientData.email_address}
                        onChange={onChangeInput}
                        placeholder="Email Address"
                        readOnly={isViewMode}
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="text"
                        name="phone_number"
                        value={clientData.phone_number}
                        onChange={onChangeInput}
                        placeholder="Phone Number"
                        readOnly={isViewMode}
                        className="border p-2 rounded w-full"
                    />
                     <input
                        type="text"
                        name="zip_code"
                        value={clientData.zip_code}
                        onChange={onChangeInput}
                        placeholder="Zip Code"
                        readOnly={isViewMode}
                        className="border p-2 rounded w-full"
                    />
                     <input
                        type="text"
                        name="country"
                        value={clientData.country}
                        onChange={onChangeInput}
                        placeholder="Country"
                        readOnly={isViewMode}
                        className="border p-2 rounded w-full"
                    />
                    
                   <input
                        type="text"
                        name="type"
                        value={clientData.type}
                        onChange={onChangeInput}
                        placeholder="Type"
                        readOnly={isViewMode}
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="text"
                        name="city"
                        value={clientData.city}
                        onChange={onChangeInput}
                        placeholder="City"
                        readOnly={isViewMode}
                        className="border p-2 rounded w-full"
                    />
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                    <input
                        type="text"
                        name="opening"
                        value={clientData.opening}
                        onChange={onChangeInput}
                        placeholder="Opening Balance"
                        readOnly={isViewMode}
                        className="border p-2 rounded w-full"
                    />
                    </div>
                    <div>
                    <input
                        type="text"
                        name="gst"
                        value={clientData.gst}
                        onChange={onChangeInput}
                        placeholder="GST Number"
                        readOnly={isViewMode}
                        className="border  p-2 rounded w-full"
                    />
                    </div>
                    </div>
                    <input
                        type="text"
                        name="address"
                        value={clientData.address}
                        onChange={onChangeInput}
                        placeholder="Address"
                        readOnly={isViewMode}
                        className="border p-2 col-span-2 rounded w-full"
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
