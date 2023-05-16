import Overview from '../components/Overview/Overview';
import Tasks from '../components/Tasks/Tasks';
import Employees from '../components/Employees/Employees';
import { Helmet } from 'react-helmet';
import { EmployeeProvider } from '../components/Employees/EmployeeContext';
import { TaskProvider } from '../components/Tasks/TaskContext';

export const Dashboard = () => {
	return (
		<>
			<Helmet>
				<title>Dashboard</title>
			</Helmet>
			<Overview />
			<TaskProvider>
				<Tasks
					showActions={false}
					showCreateNewTaskButton={false}
					showViewTaskButton={true}
				/>
			</TaskProvider>
			<EmployeeProvider>
				<Employees />
			</EmployeeProvider>
		</>
	);
};
