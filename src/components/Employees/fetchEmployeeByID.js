import axios from 'axios';

export async function fetchEmployeeByID(id) {
	try {
		const response = await axios.get(
			`https://team34-backend.herokuapp.com/api/employees/${id}`,
		);
		return response.data;
	} catch (error) {
		console.error(`Error fetching employee with ID ${id}:`, error);
		return null;
	}
}
