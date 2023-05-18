import React, { useEffect, useState } from 'react';
import { fetchEmployees } from '../Employees/fetchEmployees'; // Adjust import paths as needed
import { fetchEmployeeByID } from '../Employees/fetchEmployeeByID'; // Adjust import paths as needed

function EmployeesForList() {
	const [availableEmployees, setAvailableEmployees] = useState([]);

	useEffect(() => {
		fetchAllEmployees();
	}, []);

	async function fetchAllEmployees() {
		const employees = await fetchEmployees();
		try {
			const employeesWithDetails = await Promise.all(
				employees.map(async (employee) => {
					const employeeById = await fetchEmployeeByID(employee.id);
					return { ...employee, tasks: employeeById.Tasks };
				}),
			);
			setAvailableEmployees(employeesWithDetails);
		} catch (error) {
			console.error('Error fetching employees:', error);
		}
	}

	return availableEmployees;
}

export default EmployeesForList;
