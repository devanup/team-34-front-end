import axios from 'axios';

export async function createEmployee(employeeData) {
	try {
		const response = await axios.post(
			'https://team34-backend.herokuapp.com/api/employees/create',
			employeeData,
		);
		return response.data;
	} catch (error) {
		console.error('Error adding employee:', error);
		return null;
	}
}
