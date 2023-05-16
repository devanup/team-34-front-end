import { createContext, useState } from 'react';

const EmployeeNamesContext = createContext();

const EmployeeNamesProvider = ({ children }) => {
	const [employeeNames, setEmployeeNames] = useState({});

	const updateEmployeeName = (taskId, name) => {
		setEmployeeNames((prevNames) => ({
			...prevNames,
			[taskId]: name,
		}));
	};

	return (
		<EmployeeNamesContext.Provider
			value={{ employeeNames, updateEmployeeName }}
		>
			{children}
		</EmployeeNamesContext.Provider>
	);
};

export { EmployeeNamesContext, EmployeeNamesProvider };
