import Overview from '../components/Overview/Overview';
import Tasks from '../components/Tasks/Tasks';
import Employees from '../components/Employees/Employees';
import { Helmet } from 'react-helmet';
import { EmployeeProvider } from '../components/Employees/EmployeeContext';

export const Dashboard = () => {
	return (
		<>
			<Helmet>
				<title>Dashboard</title>
			</Helmet>
			<Overview />
			<Tasks
				showActions={false}
				showCreateNewTaskButton={false}
				showViewTaskButton={true}
			/>
			<EmployeeProvider>
				<Employees />
			</EmployeeProvider>
		</>
	);
};
