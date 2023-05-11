import axios from 'axios';

export async function deleteEmployee(employeeId) {
	try {
		const response = await axios.delete(
			`https://team34-backend.herokuapp.com/api/employees/delete/${employeeId}`,
		);
		console.log('Employee deleted!');
		return response.data;
	} catch (error) {
		console.error('Error deleting employee:', error);
		return null;
	}
}
