import React, { useEffect, useState } from 'react';
import { fetchEmployees } from '../Employees/fetchEmployees'; // Adjust import paths as needed
import { fetchEmployeeByID } from '../Employees/fetchEmployeeByID'; // Adjust import paths as needed

function AvailableEmployees({ handleRadioChange }) {
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

	/*
	async function fetchEmployeesWithNoTasks() {
		const employees = await fetchEmployees();
		const employeesWithNoTasks = [];
		try {
			for (const employee of employees) {
					employeesWithNoTasks.push(employee);
			}

			setAvailableEmployees(employeesWithNoTasks);
		} catch (error) {
			console.error('Error fetching employees:', error);
		}
	}
	*/

	return (
		<div
			className='assignees mt-4 mb-2'
			style={{ textTransform: 'capitalize' }}
		>
			{availableEmployees.length > 0 ? (
				availableEmployees.map((employee) => (
					<div
						key={employee.id}
						className='assignee-list'
						onClick={() => {
							const radioButton = document.getElementById(
								`employee-${employee.id}`,
							);
							if (radioButton) {
								radioButton.click();
							}
						}}
					>
						<input
							type='radio'
							id={`employee-${employee.id}`}
							name='assignee'
							value={employee.id}
							required
							onChange={handleRadioChange}
						/>
						<label
							htmlFor={`employee-${employee.id}`}
							style={{ marginLeft: '8px', cursor: 'pointer' }}
						>
							{employee.Fname + ' ' + employee.Lname}
						</label>
						<br />
					</div>
				))
			) : (
				<p>No available employees at the moment.</p>
			)}
		</div>
	);
}

export default AvailableEmployees;
