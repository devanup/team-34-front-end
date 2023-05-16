import { createContext, useState } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
	const [tasks, setTasks] = useState([]);

	const updateTasks = (data) => {
		setTasks(data);
	};

	return (
		<TaskContext.Provider value={{ tasks, updateTasks }}>
			{children}
		</TaskContext.Provider>
	);
};

export default TaskContext;
