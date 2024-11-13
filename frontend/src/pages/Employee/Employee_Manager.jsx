// Employee_Manager.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeFormModal from './Employee_Form_Modal';
import { EMPLOYEE_DETAIL } from '../../api/api';

const Employee_Manager = () => {
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [action, setAction] = useState('');
    const [dropdownEmployee, setDropdownEmployee] = useState(null);

    const loadEmployees = () => {
        axios.get(EMPLOYEE_DETAIL)
            .then(response => setEmployees(response.data.data))
            .catch(() => setEmployees([]));
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    const handleCreate = () => {
        setSelectedEmployee(null);
        setAction('create');
        setShowModal(true);
    };

    const handleView = (employee) => {
        setSelectedEmployee(employee);
        setAction('view');
        setShowModal(true);
    };

    const handleUpdate = (employee) => {
        setSelectedEmployee(employee);
        setAction('update');
        setShowModal(true);
    };

    const handleDelete = (employeeId) => {
        axios.delete(`${EMPLOYEE_DETAIL}/${employeeId}`)
            .then(loadEmployees)
            .catch(console.error);
    };

    const toggleDropdown = (employeeId) => {
        setDropdownEmployee(dropdownEmployee === employeeId ? null : employeeId);
    };

    return (
        <div className="p-6 w-full">
            <h3 className="text-2xl font-bold mb-4">Employee Management</h3>
            <button onClick={handleCreate} className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600">
                Add Employee
            </button>

            {showModal && (
                <EmployeeFormModal
                    open={showModal}
                    onClickClose={() => setShowModal(false)}
                    loadEmployees={loadEmployees}
                    employee={selectedEmployee}
                    action={action}
                />
            )}

            <div className='flex gap-5 flex-wrap'>
                {employees.map((employee) => (
                    <div key={employee._id} className="flex w-[32%]  min-w-[300px]  flex-col justify-between hover:bg-white-100 border-2 rounded-lg">
                        <div className='flex justify-between'>
                            <div className="p-2">
                                <strong>{employee.employee_name}</strong><br />{employee.email_address}
                            </div>
                            <div className="p-2 relative">
                                <button
                                    onClick={() => toggleDropdown(employee._id)}
                                    className="font-extrabold px-2 py-1 rounded hover:bg-gray-200"
                                >
                                    ⋮
                                </button>
                                {dropdownEmployee === employee._id && (
                                    <div className="absolute mt-1 bg-white border rounded shadow-md right-0 z-10 w-28">
                                        <button
                                            onClick={() => { handleView(employee); setDropdownEmployee(null); }}
                                            className="w-full px-4 py-2 text-left"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => { handleUpdate(employee); setDropdownEmployee(null); }}
                                            className="w-full px-4 py-2 text-left"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => { handleDelete(employee._id); setDropdownEmployee(null); }}
                                            className="w-full px-4 py-2 text-left"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-2">
                            <strong><h4>Address</h4></strong> {employee.address}, {employee.city} - {employee.zip_code}, {employee.country}
                        </div>

                        <div className="p-2"><div className='flex gap-1'><h4 className='font-semibold'>Role:</h4> {employee.role}</div>  <div className='flex gap-1'><h4 className='font-semibold'>Designation:</h4> {employee.designation}</div></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Employee_Manager;
