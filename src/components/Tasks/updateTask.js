import axios from 'axios';

export async function updateTask(taskId, taskData) {
	try {
		const response = await axios.put(
			`https://team34-backend.herokuapp.com/api/tasks/update/${taskId}`,
			taskData,
		);
		return response.data;
	} catch (error) {
		console.error('Error updating employee:', error);
		return null;
	}
}
