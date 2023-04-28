import Overview from '../components/Overview/Overview';
import Tasks from '../components/Tasks/Tasks';
import Employees from '../components/Employees/Employees';

export const Dashboard = () => {
	return (
		<>
			<Overview />
			<Tasks />
			<Employees />
		</>
	);
};
