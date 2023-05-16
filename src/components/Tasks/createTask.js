import axios from 'axios';

export async function createTask(taskData) {
	try {
		const response = await axios.post(
			'https://team34-backend.herokuapp.com/api/tasks/create',
			taskData,
		);
		return response.data;
	} catch (error) {
		console.error('Error adding task:', error);
		return null;
	}
}
