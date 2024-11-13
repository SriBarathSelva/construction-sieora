import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PROJECT_DETAIL } from '../../api/api';

const ProjectManager = () => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProjects, setSelectedProjects] = useState([]);
    const [dropdownProject, setDropdownProject] = useState(null);
    const navigate = useNavigate();
    const projectsPerPage = 5;

    const loadProjects = () => {
        axios.get(PROJECT_DETAIL)
            .then(response => {
                setProjects(response.data.data);
                setFilteredProjects(response.data.data);
            })
            .catch(() => setProjects([]));
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const handleCreate = () => navigate('/projects/create');

    const handleView = (project) => navigate(`/projects/view/${project._id}`, { state: { mode: 'view' } });

    const handleUpdate = (project) => navigate(`/projects/edit/${project._id}`, { state: { mode: 'edit' } });

    const handleDelete = (projectId) => {
        axios.delete(`${PROJECT_DETAIL}/${projectId}`)
            .then(loadProjects)
            .catch(err => console.error("Failed to delete project:", err));
    };

    const handleBulkDelete = () => {
        selectedProjects.forEach(projectId => handleDelete(projectId));
        setSelectedProjects([]);
    };

    const toggleDropdown = (projectId) => setDropdownProject(dropdownProject === projectId ? null : projectId);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        filterProjects(e.target.value, statusFilter);
    };

    const handleStatusFilter = (e) => {
        setStatusFilter(e.target.value);
        filterProjects(searchTerm, e.target.value);
    };

    const filterProjects = (search, status) => {
        let filtered = projects;
        if (search) {
            filtered = filtered.filter(project => 
                project.project_name.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (status) {
            filtered = filtered.filter(project => project.status === status);
        }
        setFilteredProjects(filtered);
        setCurrentPage(1);
    };

    const handleCheckboxChange = (projectId) => {
        setSelectedProjects(prev =>
            prev.includes(projectId)
                ? prev.filter(id => id !== projectId)
                : [...prev, projectId]
        );
    };

    const paginateProjects = () => {
        const start = (currentPage - 1) * projectsPerPage;
        return filteredProjects.slice(start, start + projectsPerPage);
    };

    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    return (
        <div className="p-6 w-full ">
            <h3 className="text-2xl font-bold mb-4 ">Project Management</h3>
            <div className='flex justify-between gap-0'>
                <div className="flex mb-4">
                    <input
                        type="text"
                        placeholder="Search by project name"
                        value={searchTerm}
                        style={{
                            background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='%235f6368'%3E%3Cpath d='M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z'/%3E%3C/svg%3E") no-repeat`,
                            backgroundPosition: '10px center',
                            backgroundSize: '24px',}}
                        onChange={handleSearch}
                        className="pl-10 pr-4 py-2 border rounded w-full "
                    />
                    <select
                        value={statusFilter}
                        onChange={handleStatusFilter}
                        className="border p-2 rounded ml-8"
                    >
                        <option value="">All Statuses</option>
                        <option value="CREATED">Created</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                </div>
                <div className=''> <button onClick={handleCreate} className=" bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600">
                    Add Project
                    </button>
                </div>
            </div>
            

            {selectedProjects.length > 0 && (
                <button
                    onClick={handleBulkDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded mb-4 hover:bg-red-600"
                >
                    Delete Selected
                </button>
            )}

            <table className="mt-4 w-full text-center bg-white rounded-lg shadow-xl ">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">
                            <input
                                type="checkbox"
                                onChange={(e) => {
                                    const allIds = paginateProjects().map(p => p._id);
                                    setSelectedProjects(e.target.checked ? allIds : []);
                                }}
                                checked={
                                    paginateProjects().length > 0 &&
                                    selectedProjects.length === paginateProjects().length
                                }
                            />
                        </th>
                        <th className="border border-gray-300 p-2">Project Name</th>
                        <th className="border border-gray-300 p-2">Category</th>
                        <th className="border border-gray-300 p-2">Client</th>
                        <th className="border border-gray-300 p-2">Due Date</th>
                        <th className="border border-gray-300 p-2">Status</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginateProjects().map((project) => (
                        <tr key={project._id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2">
                                <input
                                    type="checkbox"
                                    checked={selectedProjects.includes(project._id)}
                                    onChange={() => handleCheckboxChange(project._id)}
                                />
                            </td>
                            <td className="border border-gray-300 p-2">{project.project_name}</td>
                            <td className="border border-gray-300 p-2">{project.category}</td>
                            <td className="border border-gray-300 p-2">{project.client}</td>
                            <td className="border border-gray-300 p-2">{project.end_date}</td>
                            <td className="border border-gray-300 p-2">{project.status}</td>
                            <td className="border border-gray-300 p-2">
                               <button
                                    onClick={() => toggleDropdown(project._id)}
                                    className="font-extrabold px-2 py-1 rounded hover:bg-gray-200"
                                >
                                    ⋮
                                </button>
                                {dropdownProject === project._id && (
                                    <div className="absolute mt-1 bg-white border rounded shadow-md right-16 z-10 w-28">
                                        <button
                                            onClick={() => { handleView(project); setDropdownProject(null); }}
                                            className="w-full px-4 py-2 text-left"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => { handleUpdate(project); setDropdownProject(null); }}
                                            className="w-full px-4 py-2 text-left"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => { handleDelete(project._id); setDropdownProject(null); }}
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
                    className="px-3 py-1 rounded border border-gray-300 mr-2"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className="px-3 py-1 rounded border border-gray-300 ml-2"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProjectManager;
