import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PROJECT_DETAIL, EMPLOYEE_DETAIL } from '../../../api/api';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '../../../Reusable/Toast';
import MaterialDetails from '../tabs/MaterialDetails';

const TABS = ["Project Overview", "Material Details", "Task Details", "Attachment", "Party Details", "Utilization", "Estimate"];

const PopupTransaction = () => {
    const [projectData, setProjectData] = useState({ task: [] });
    const [selectedTab, setSelectedTab] = useState("Project Overview");
    const [newTask, setNewTask] = useState({ task_name: '', t_startDate: '', t_endDate: '', assigned_to: '', status: '' });
    const showToast = useToast();
    const [employees, setEmployees] = useState([]); 
    const { projectId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    
    

    const { mode } = location.state || {};
    const isEditable = mode === 'edit';

    useEffect(() => {
        if (projectId) {
            axios.get(`${PROJECT_DETAIL}/${projectId}`)
                .then(response => {
                    setProjectData(response.data.data || { task: [] });
                })
                .catch(err => console.error("Error loading project data:", err));
        }
    }, [projectId]);

    const handleProjectUpdate = (newProjectData) => {
        setProjectData(newProjectData);
    };

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setProjectData(prev => ({ ...prev, [name]: value }));
    };

    const onChangeTaskInput = (e, taskIndex) => {
        const { name, value } = e.target;
        setProjectData(prev => {
            const updatedTasks = [...prev.task];
            updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], [name]: value };
            return { ...prev, task: updatedTasks };
        });
    };

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

    const onNewTaskInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask(prev => ({ ...prev, [name]: value }));
    };

    const submitTask = () => {
        setProjectData(prev => ({
            ...prev,
            task: [...(prev.task || []), newTask]
        }));
        setNewTask({ task_name: '', t_startDate: '', t_endDate: '', assigned_to: '', status: '' });
    };

    const onSave = () => {
        const request = projectId ? axios.put : axios.post;
        const url = projectId ? `${PROJECT_DETAIL}/${projectId}` : PROJECT_DETAIL;

        request(url, projectData)
            .then(() => {
                showToast("Project saved successfully!", "success");
                if (projectId) {
                    axios.get(`${PROJECT_DETAIL}/${projectId}`)
                        .then(response => setProjectData(response.data.data || { task: [] }))
                        .catch(err => console.error("Error reloading project data:", err));
                }
            })
            .catch(() => showToast("Error saving project", "error"));
    };

    const renderField = (name, label) => (
        isEditable ? (
            <div className="bg-green-600 mb-4">
                <label className="block font-medium">{label}</label>
                <input
                    type="text"
                    name={name}
                    value={projectData[name] || ''}
                    onChange={onChangeInput}
                    className="border p-2 rounded w-full"
                />
            </div>
        ) : (
            <p> {projectData[name]}</p>
        )
    );

    const renderTaskField = (taskIndex, name, label) => (
        isEditable ? (
            <div className="mb-4">
                <label className="block font-medium">{label}</label>
                <input
                    type="text"
                    name={name}
                    value={projectData.task[taskIndex][name] || ''}
                    onChange={(e) => onChangeTaskInput(e, taskIndex)}
                    className="border p-2 rounded w-full"
                />
            </div>
        ) : (
            <p><strong>{label}:</strong> {projectData.task[taskIndex][name]}</p>
        )
    );

    const renderContent = () => {
        switch (selectedTab) {
            case "Project Overview":
                return (
                    <div className="overflow-x-auto p-4 bg-gray-50 rounded-lg shadow-lg">
                        <table className="min-w-full  rounded-md bg-white shadow-md">
                            
                            <tbody>
                                <tr className="hover:bg-gray-100 transition-colors">
                                    <td className="border px-6 py-3 font-medium text-gray-700">Project Name</td>
                                    <td className="border px-6 py-3 text-gray-900">{renderField("project_name")}</td>
                                </tr>
                                <tr className="hover:bg-gray-100 transition-colors">
                                    <td className="border px-6 py-3 font-medium text-gray-700">Address</td>
                                    <td className="border px-6 py-3 text-gray-900">{renderField("address")}</td>
                                </tr>
                                <tr className="hover:bg-gray-100 transition-colors">
                                    <td className="border px-6 py-3 font-medium text-gray-700">City</td>
                                    <td className="border px-6 py-3 text-gray-900">{renderField("city")}</td>
                                </tr>
                                <tr className="hover:bg-gray-100 transition-colors">
                                    <td className="border px-6 py-3 font-medium text-gray-700">Work Order No</td>
                                    <td className="border px-6 py-3 text-gray-900">{renderField("work_order_no")}</td>
                                </tr>
                                <tr className="hover:bg-gray-100 transition-colors">
                                    <td className="border px-6 py-3 font-medium text-gray-700">Client</td>
                                    <td className="border px-6 py-3 text-gray-900">{renderField("client")}</td>
                                </tr>
                                <tr className="hover:bg-gray-100 transition-colors">
                                    <td className="border px-6 py-3 font-medium text-gray-700">Budget</td>
                                    <td className="border px-6 py-3 text-gray-900">{renderField("budget")}</td>
                                </tr>
                                <tr className="hover:bg-gray-100 transition-colors">
                                    <td className="border px-6 py-3 font-medium text-gray-700">Category</td>
                                    <td className="border px-6 py-3 text-gray-900">{renderField("category")}</td>
                                </tr>
                                <tr className="hover:bg-gray-100 transition-colors">
                                    <td className="border px-6 py-3 font-medium text-gray-700">Supervisor</td>
                                    <td className="border px-6 py-3 text-gray-900">{renderField("supervisor")}</td>
                                </tr>
                                <tr className="hover:bg-gray-100 transition-colors">
                                    <td className="border px-6 py-3 font-medium text-gray-700">Start Date</td>
                                    <td className="border px-6 py-3 text-gray-900">{renderField("start_date")}</td>
                                </tr>
                                <tr className="hover:bg-gray-100 transition-colors">
                                    <td className="border px-6 py-3 font-medium text-gray-700">End Date</td>
                                    <td className="border px-6 py-3 text-gray-900">{renderField("end_date")}</td>
                                </tr>
                                <tr className="hover:bg-gray-100 transition-colors">
                                    <td className="border px-6 py-3 font-medium text-gray-700">Status</td>
                                    <td className="border px-6 py-3 text-gray-900">{renderField("status")}</td>
                                </tr>
                                <tr className="hover:bg-gray-100 transition-colors">
                                    <td className="border px-6 py-3 font-medium text-gray-700">Priority</td>
                                    <td className="border px-6 py-3 text-gray-900">{renderField("priority")}</td>
                                </tr>
                                <tr className="hover:bg-gray-100 transition-colors">
                                    <td className="border px-6 py-3 font-medium text-gray-700">Departments</td>
                                    <td className="border px-6 py-3 text-gray-900">{renderField("departments")}</td>
                                </tr>
                                <tr className="hover:bg-gray-100 transition-colors">
                                    <td className="border px-6 py-3 font-medium text-gray-700">Assigned To</td>
                                    <td className="border px-6 py-3 text-gray-900">{renderField("assigned_to")}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );

            case "Material Details":
                return <MaterialDetails renderField={renderField} projectData={projectData} mode={mode} onProjectUpdate={handleProjectUpdate} />;
                
            case "Task Details":
                return (
                    <>
                        {projectData.task?.map((task, index) => (
                            <div key={index} className="mb-4 border-b pb-4">
                                <h4 className="font-bold mb-2">Task {index + 1}</h4>
                                {renderTaskField(index, "task_name", "Task Name")}
                                {renderTaskField(index, "t_startDate", "Start Date")}
                                {renderTaskField(index, "t_endDate", "Due Date")}
                                {renderTaskField(index, "assigned_to", "Assigned To")}
                            </div>
                        ))}
                        {isEditable && (
                            <>
                                <h4 className="font-bold mb-2 mt-4">Add New Task</h4>
                                <div className="mb-4">
                                    <label className="block font-medium">Task Name</label>
                                    <input
                                        type="text"
                                        name="task_name"
                                        value={newTask.task_name}
                                        onChange={onNewTaskInputChange}
                                        className="border p-2 rounded w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block font-medium">Start Date</label>
                                    <input
                                        type="date"
                                        name="t_startDate"
                                        value={newTask.t_startDate}
                                        onChange={onNewTaskInputChange}
                                        className="border p-2 rounded w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block font-medium">Due Date</label>
                                    <input
                                        type="date"
                                        name="t_endDate"
                                        value={newTask.t_endDate}
                                        onChange={onNewTaskInputChange}
                                        className="border p-2 rounded w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block font-medium">Assigned To</label>
                                    <select
                                        name="assigned_to"
                                        value={newTask.assigned_to || ''}
                                        onChange={onNewTaskInputChange}
                                        className="border p-2 rounded w-full"
                                    >
                                        <option value="">Select Employee</option>
                                        {employees.map(employee => (
                                            <option key={employee._id} value={employee.employee_name}>
                                                {employee.employee_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <button onClick={submitTask} className="bg-green-500 text-white px-4 py-2 rounded mt-4">
                                    Submit Task
                                </button>
                            </>
                        )}
                    </>
                );
            case "Attachment":
                return (
                    <>
                        {renderField("attachment_type", "Attachment Type")}
                        {renderField("attachment_link", "Attachment Link")}
                    </>
                );
            case "Party Details":
                return (
                    <>
                        {renderField("party_name", "Party Name")}
                        {renderField("party_role", "Party Role")}
                    </>
                );
            case "Utilization":
                return (
                    <>
                        {renderField("utilization_type", "Utilization Type")}
                        {renderField("hours", "Hours")}
                    </>
                );
            case "Estimate":
                return (
                    <>
                        {renderField("estimate_cost", "Estimated Cost")}
                        {renderField("estimate_duration", "Estimated Duration")}
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className=" h-[100%] mx-auto p-6 relative">
            <div className="flex">
                <div className="m-5 w-fit h-fit border rounded-lg border-gray-300">
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
                <div className=" w-3/4 p-4 ">
                    <h3 className="text-2xl font-bold mb-4">{selectedTab}</h3>
                    <div className=" overflow-y-auto">
                        {renderContent()}
                    </div>
                    {isEditable && (
                        <button onClick={onSave} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                            Submit
                        </button>
                    )}
                </div>
            </div>
            <button onClick={() => navigate('/projects')} className="absolute top-8 right-10 bg-red-500 text-white px-4 py-2 rounded mt-4">
                Close
            </button>
        </div>
    );
};

export default PopupTransaction;
