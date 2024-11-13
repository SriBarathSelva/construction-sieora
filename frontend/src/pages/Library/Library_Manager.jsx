import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LibraryFormModal from './Library_Form_Modal';
import { LIBRARY_DETAIL } from '../../api/api';

const LibraryManager = () => {
    const [libraries, setLibraries] = useState([]);
    const [filteredLibraries, setFilteredLibraries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedLibraries, setSelectedLibraries] = useState([]);
    const [dropdownLibrary, setDropdownLibrary] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedLibrary, setSelectedLibrary] = useState(null);
    const [action, setAction] = useState('');
    const librariesPerPage = 5;

    const loadLibraries = () => {
        axios.get(LIBRARY_DETAIL)
            .then(response => {
                setLibraries(response.data.data);
                setFilteredLibraries(response.data.data);
            })
            .catch(() => setLibraries([]));
    };

    useEffect(() => {
        loadLibraries();
    }, []);

    const handleCreate = () => {
        setSelectedLibrary(null);
        setAction('create');
        setShowModal(true);
    };

    const handleView = (library) => {
        setSelectedLibrary(library);
        setAction('view');
        setShowModal(true);
    };

    const handleUpdate = (library) => {
        setSelectedLibrary(library);
        setAction('update');
        setShowModal(true);
    };

    const handleDelete = (libraryId) => {
        axios.delete(`${LIBRARY_DETAIL}/${libraryId}`)
            .then(loadLibraries)
            .catch(err => console.error("Failed to delete library item:", err));
    };

    const handleBulkDelete = () => {
        selectedLibraries.forEach(libraryId => handleDelete(libraryId));
        setSelectedLibraries([]);
    };

    const toggleDropdown = (libraryId) => setDropdownLibrary(dropdownLibrary === libraryId ? null : libraryId);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        filterLibraries(e.target.value);
    };

    const filterLibraries = (search) => {
        const filtered = libraries.filter(library =>
            library.material_name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredLibraries(filtered);
        setCurrentPage(1);
    };

    const handleCheckboxChange = (libraryId) => {
        setSelectedLibraries(prev =>
            prev.includes(libraryId)
                ? prev.filter(id => id !== libraryId)
                : [...prev, libraryId]
        );
    };

    const paginateLibraries = () => {
        const start = (currentPage - 1) * librariesPerPage;
        return filteredLibraries.slice(start, start + librariesPerPage);
    };

    const totalPages = Math.ceil(filteredLibraries.length / librariesPerPage);

    return (
        <div className="p-6 w-full">
            <h3 className="text-2xl font-bold mb-4">Library Management</h3>
            <div className="flex justify-between">
                <input
                    type="text"
                    placeholder="Search by material name"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10 pr-4 py-2 border rounded w-1/2"
                />
                <button onClick={handleCreate} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Add Library Item
                </button>
            </div>

            {selectedLibraries.length > 0 && (
                <button
                    onClick={handleBulkDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600"
                >
                    Delete Selected
                </button>
            )}

            {showModal && (
                <LibraryFormModal
                    open={showModal}
                    onClickClose={() => setShowModal(false)}
                    loadLibraries={loadLibraries}
                    library={selectedLibrary}
                    action={action}
                />
            )}

            <table className="mt-4 w-full text-center bg-white rounded-lg shadow-xl">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">
                            <input
                                type="checkbox"
                                onChange={(e) => {
                                    const allIds = paginateLibraries().map(lib => lib._id);
                                    setSelectedLibraries(e.target.checked ? allIds : []);
                                }}
                                checked={
                                    paginateLibraries().length > 0 &&
                                    selectedLibraries.length === paginateLibraries().length
                                }
                            />
                        </th>
                        <th className="border border-gray-300 p-2">Material Name</th>
                        <th className="border border-gray-300 p-2">Nos</th>
                        <th className="border border-gray-300 p-2">GST %</th>
                        <th className="border border-gray-300 p-2">Cost Code</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginateLibraries().map((library) => (
                        <tr key={library._id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2">
                                <input
                                    type="checkbox"
                                    checked={selectedLibraries.includes(library._id)}
                                    onChange={() => handleCheckboxChange(library._id)}
                                />
                            </td>
                            <td className="border border-gray-300 p-2">{library.material_name}</td>
                            <td className="border border-gray-300 p-2">{library.nos}</td>
                            <td className="border border-gray-300 p-2">{library.gst}</td>
                            <td className="border border-gray-300 p-2">{library.cost_code}</td>
                            <td className="border border-gray-300 p-2">
                                <button
                                    onClick={() => toggleDropdown(library._id)}
                                    className="font-extrabold px-2 py-1 rounded hover:bg-gray-200"
                                >
                                    ⋮
                                </button>
                                {dropdownLibrary === library._id && (
                                    <div className="absolute mt-1 bg-white border rounded shadow-md right-0 z-10 w-28">
                                        <button
                                            onClick={() => { handleView(library); setDropdownLibrary(null); }}
                                            className="w-full px-4 py-2 text-left"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => { handleUpdate(library); setDropdownLibrary(null); }}
                                            className="w-full px-4 py-2 text-left"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => { handleDelete(library._id); setDropdownLibrary(null); }}
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
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="px-3 py-1 rounded border border-gray-300 mr-2"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className="px-3 py-1 rounded border border-gray-300 ml-2"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default LibraryManager;
