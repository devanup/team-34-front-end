import axios from 'axios';

export async function fetchTasks() {
	try {
		const response = await axios.get(
			'https://team34-backend.herokuapp.com/api/tasks',
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching all tasks:', error);
		return [];
	}
}

export async function fetchTasksByEmployee(employeeId) {
	try {
		const response = await axios.get(
			`https://team34-backend.herokuapp.com/api/employees/${employeeId}`,
		);
		// const employee = response.data;

		return response.data;
	} catch (error) {
		console.error(
			`Error fetching tasks for employee with ID ${employeeId}:`,
			error,
		);
		return [];
	}
}
