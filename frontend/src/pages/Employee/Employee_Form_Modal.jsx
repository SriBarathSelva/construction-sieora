// Employee_Form_Modal.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { EMPLOYEE_DETAIL } from "../../api/api";
import { useToast } from "../../Reusable/Toast";

export default function EmployeeFormModal({ open, onClickClose, loadEmployees, employee, action }) {
    const showToast = useToast();

    const initialEmployeeObject = {
        employee_name: "",
        employee_id: "",
        email_address: "",
        phone_number: "",
        address: "",
        city: "",
        zip_code: "",
        country: "",
        role: "",
        designation: ""
    };

    const [employeeData, setEmployeeData] = useState(initialEmployeeObject);

    useEffect(() => {
        if (employee) {
            setEmployeeData(employee);
        }
    }, [employee]);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setEmployeeData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const endpoint = action === 'create' ? axios.post : axios.put;
        const url = action === 'create' ? EMPLOYEE_DETAIL : `${EMPLOYEE_DETAIL}/${employeeData._id}`;
        const message = action === 'create' ? "Employee created successfully!" : "Employee updated successfully!";

        endpoint(url, employeeData)
            .then((resp) => {
                showToast(resp.data.message || message, "success");
                onClickClose();
                loadEmployees();
                setEmployeeData(initialEmployeeObject);
            })
            .catch(() => {
                showToast("Error processing employee", "error");
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
                        {isViewMode ? "View Employee" : action === 'update' ? "Update Employee" : "Create Employee"}
                    </h1>
                    <button onClick={onClickClose} className="text-gray-500 hover:text-gray-700">X</button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="employee_name"
                        value={employeeData.employee_name}
                        onChange={onChangeInput}
                        placeholder="Employee Name"
                        readOnly={isViewMode}
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="text"
                        name="employee_id"
                        value={employeeData.employee_id}
                        onChange={onChangeInput}
                        placeholder={employeeData?.employee_id || "Employee ID(auto-generate)"}
                        readOnly
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="email"
                        name="email_address"
                        value={employeeData.email_address}
                        onChange={onChangeInput}
                        placeholder="Email Address"
                        readOnly={isViewMode}
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="text"
                        name="phone_number"
                        value={employeeData.phone_number}
                        onChange={onChangeInput}
                        placeholder="Phone Number"
                        readOnly={isViewMode}
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="text"
                        name="address"
                        value={employeeData.address}
                        onChange={onChangeInput}
                        placeholder="Address"
                        readOnly={isViewMode}
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="text"
                        name="city"
                        value={employeeData.city}
                        onChange={onChangeInput}
                        placeholder="City"
                        readOnly={isViewMode}
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="text"
                        name="zip_code"
                        value={employeeData.zip_code}
                        onChange={onChangeInput}
                        placeholder="Zip Code"
                        readOnly={isViewMode}
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="text"
                        name="country"
                        value={employeeData.country}
                        onChange={onChangeInput}
                        placeholder="Country"
                        readOnly={isViewMode}
                        className="border p-2 rounded w-full"
                    />
                    <select
                        name="role"
                        value={employeeData.role}
                        onChange={onChangeInput}
                        disabled={isViewMode}
                        className="border p-2 rounded w-full"
                    >
                        <option value="">Select role</option>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Supervisor">Supervisor</option>
                    </select>
                    <input
                        type="text"
                        name="designation"
                        value={employeeData.designation}
                        onChange={onChangeInput}
                        placeholder="Designation"
                        readOnly={isViewMode}
                        className="border p-2 rounded w-full"
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
