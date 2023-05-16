import axios from 'axios';

export async function deleteTask(taskId) {
	try {
		const response = await axios.delete(
			`https://team34-backend.herokuapp.com/api/tasks/delete/${taskId}`,
		);
		return response.data;
	} catch (error) {
		console.error('Error deleting task:', error);
		return null;
	}
}
