import axios from 'axios';

export async function fetchTaskByID(id) {
	try {
		const response = await axios.get(
			`https://team34-backend.herokuapp.com/api/tasks/${id}`,
		);
		return response.data;
	} catch (error) {
		console.error(`Error fetching task with ID ${id}:`, error);
		return null;
	}
}
