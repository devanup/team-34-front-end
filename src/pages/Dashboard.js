import Overview from '../components/Overview/Overview';
import Tasks from '../components/Tasks/Tasks';
import Employees from '../components/Employees/Employees';
import { Helmet } from 'react-helmet';

export const Dashboard = () => {
	return (
		<>
			<Helmet>
				<title>Dashboard</title>
			</Helmet>
			<Overview />
			<Tasks />
			<Employees />
		</>
	);
};
