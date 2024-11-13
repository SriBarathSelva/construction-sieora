import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialRequest from './MaterialRequest';
import MaterialPurchase from './MaterialPurchase';
import MaterialReceived from './MaterialReceived';
import MaterialUsed from './MaterialUsed';
import { PARTY_DETAIL } from '../../../api/api';

const MATERIAL_OPTIONS = ["Request", "Purchase", "Received", "Used"];

const MaterialDetails = ({ renderField, projectData, mode }) => {
    const [selectedOption, setSelectedOption] = useState("");
    const [parties, setParties] = useState([]);
    const [updatedProjectData, setUpdatedProjectData] = useState(projectData); // Store the updated project data

    useEffect(() => {
        axios.get(PARTY_DETAIL)
            .then(response => {
                setParties(response.data.data || []);
            })
            .catch(error => console.error("Error fetching party data:", error));
    }, []);

    // Function to update project data in the parent
    const handleProjectUpdate = (newProjectData) => {
        setUpdatedProjectData(newProjectData); // Update the project data in the parent component
    };

    const renderTabContent = () => {
        switch (selectedOption) {
            case "Request":
                return <MaterialRequest projectData={updatedProjectData} mode={mode} onUpdate={handleProjectUpdate} />;
            case "Purchase":
                return <MaterialPurchase projectData={updatedProjectData} mode={mode} onUpdate={handleProjectUpdate} />;
            case "Received":
                return <MaterialReceived projectData={updatedProjectData} mode={mode} onUpdate={handleProjectUpdate}  />;
            case "Used":
                return <MaterialUsed />;
            default:
                return null;
        }
    };

    return (
        <div>
            <label className="block font-medium mb-2">Select Material Transaction Type</label>
            <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="border p-2 rounded w-full mb-4"
            >
                <option value="">Select an option</option>
                {MATERIAL_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
            {renderTabContent()}
        </div>
    );
};

export default MaterialDetails;
