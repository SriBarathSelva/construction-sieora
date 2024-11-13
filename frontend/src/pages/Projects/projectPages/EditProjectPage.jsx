import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { PROJECT_DETAIL, CLIENT_DETAIL, EMPLOYEE_DETAIL } from '../../../api/api';
import { useToast } from '../../../Reusable/Toast';
import PopupTabContainer from './PopupTransaction';

const EditProjectPage = () => {
    const { projectId } = useParams();  
    const [projectData, setProjectData] = useState(null);  
    const [popupOpen, setPopupOpen] = useState(false);  
    const [clients, setClients] = useState([]);  
    const [employees, setEmployees] = useState([]);  // Define employees state
    const showToast = useToast();
    const navigate = useNavigate();

    // Fetch project data or initialize it for new project
    useEffect(() => {
        if (projectId) {
            axios.get(`${PROJECT_DETAIL}/${projectId}`)
                .then(response => setProjectData(response.data.data))
                .catch(err => {
                    showToast("Error fetching project data", "error");
                    console.error(err);
                });
        } else {
            setProjectData({
                project_name: '',
                address: '',
                city: '',
                work_order_no: '',
                client: '',
                budget: '',
                category: '',
                supervisor: '',
                start_date: '',
                end_date: '',
                status: 'CREATED',
                priority: 'LOW',
                departments: '',
                assigned_to: ''
            });
        }
    }, [projectId]);

    // Fetch employee data
    useEffect(() => {
        axios.get(EMPLOYEE_DETAIL)
            .then(response => {
                setEmployees(response.data.data || []);
            })
            .catch(err => {
                showToast("Error fetching employee data", "error");
                console.error(err);
            });
    }, []);

    // Fetch client data
    useEffect(() => {
        axios.get(`${CLIENT_DETAIL}`)
            .then(response => {
                setClients(response.data.data); 
            })
            .catch(err => {
                showToast("Error fetching client data", "error");
                console.error(err);
            });
    }, []);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setProjectData(prev => ({ ...prev, [name]: value }));
    };
    

    const onSubmit = (e) => {
        e.preventDefault();
        
        if (projectId) {
            axios.put(`${PROJECT_DETAIL}/${projectId}`, projectData)
                .then(() => {
                    showToast("Project updated successfully!", "success");
                    navigate('/projects');  
                })
                .catch(() => {
                    showToast("Error updating project", "error");
                });
        } else {
            axios.post(PROJECT_DETAIL, projectData)
                .then(() => {
                    showToast("Project created successfully!", "success");
                    navigate('/projects');  
                })
                .catch(() => {
                    showToast("Error creating project", "error");
                });
        }
    };

    if (!projectData) return <p>Loading...</p>;

    return (
        <>
            {popupOpen && (
                <PopupTabContainer
                    projectId={projectId}  
                    mode="edit"  
                    onClose={() => setPopupOpen(false)}  
                />
            )}

            <div className="p-6 w-full">
                <h3 className="text-2xl font-bold mb-4">{projectId ? 'Edit Project' : 'Create Project'}</h3>
                <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="project_name"
                        value={projectData.project_name}
                        onChange={onChangeInput}
                        placeholder="Project Name"
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="text"
                        name="address"
                        value={projectData.address}
                        onChange={onChangeInput}
                        placeholder="Address"
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="text"
                        name="city"
                        value={projectData.city}
                        onChange={onChangeInput}
                        placeholder="City"
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="text"
                        name="work_order_no"
                        value={projectData.work_order_no}
                        onChange={onChangeInput}
                        placeholder="Work Order No"
                        className="border p-2 rounded w-full"
                    />
                    {/* Client Dropdown */}
                    <select
                        name="client"
                        value={projectData.client || ''}
                        onChange={onChangeInput}
                        className="border p-2 rounded w-full"
                    >
                        <option value="">Select Client</option>
                        {clients.map(client => (
                            <option key={client._id} value={client.client_name}>
                                {client.client_name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        name="budget"
                        value={projectData.budget}
                        onChange={onChangeInput}
                        placeholder="Budget"
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="text"
                        name="category"
                        value={projectData.category}
                        onChange={onChangeInput}
                        placeholder="Category"
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="text"
                        name="supervisor"
                        value={projectData.supervisor}
                        onChange={onChangeInput}
                        placeholder="Supervisor"
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="date"
                        name="start_date"
                        value={projectData.start_date}
                        onChange={onChangeInput}
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="date"
                        name="end_date"
                        value={projectData.end_date}
                        onChange={onChangeInput}
                        className="border p-2 rounded w-full"
                    />
                    <select
                        name="status"
                        value={projectData.status}
                        onChange={onChangeInput}
                        className="border p-2 rounded w-full"
                    >
                        <option value="CREATED">Created</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                    <select
                        name="priority"
                        value={projectData.priority}
                        onChange={onChangeInput}
                        className="border p-2 rounded w-full"
                    >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                    </select>
                    <select
                        name="departments"
                        value={projectData.departments}
                        onChange={onChangeInput}
                        className="border p-2 rounded w-full"
                    >
                        <option value="hr">HR</option>
                        <option value="ai">AI</option>
                        <option value="cloud">Cloud</option>
                        <option value="frontend">Frontend</option>
                    </select>
                    <select
                        name="assigned_to"
                        value={projectData.assigned_to || ''}
                        onChange={onChangeInput}
                        className="border p-2 rounded w-full"
                    >
                        <option value="">Select Employee</option>
                        {employees.map(employee => (
                            <option key={employee._id} value={employee.employee_name}>
                                {employee.employee_name}
                            </option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded col-span-2"
                    >
                        {projectId ? 'Update' : 'Create'}
                    </button>
                </form>

                {/* Button to open the popup */}
                {projectId && (
                    <button
                        onClick={() => setPopupOpen(true)}
                        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                    >
                        Edit Project Tabs
                    </button>
                )}
            </div>
        </>
    );
};

export default EditProjectPage;
