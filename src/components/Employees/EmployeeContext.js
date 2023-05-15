import { createContext, useState } from 'react';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
	const [employees, setEmployees] = useState([]);

	const updateEmployees = (data) => {
		setEmployees(data);
	};

	return (
		<EmployeeContext.Provider value={{ employees, updateEmployees }}>
			{children}
		</EmployeeContext.Provider>
	);
};

export default EmployeeContext;
