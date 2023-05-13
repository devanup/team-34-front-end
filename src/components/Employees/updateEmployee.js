import axios from 'axios';

export async function updateEmployee(employeeId, employeeData) {
	try {
		const response = await axios.put(
			`https://team34-backend.herokuapp.com/api/employees/update/${employeeId}`,
			employeeData,
		);
		return response.data;
	} catch (error) {
		console.error('Error updating employee:', error);
		return null;
	}
}
