import axios from 'axios';

export async function fetchEmployees() {
	try {
		const response = await axios.get(
			'https://team34-backend.herokuapp.com/api/employees/',
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching employees:', error);
		return [];
	}
}
