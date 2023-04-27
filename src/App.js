import './App.css';
import Employees from './components/Employees/Employees';
import Navigation from './components/Navigation/Navigation';
import Overview from './components/Overview/Overview';
import Tasks from './components/Tasks/Tasks';

function App() {
	return (
		<div className='App'>
			<div className='body-wrap'>
				<Navigation />
				<Overview />
				<Tasks />
				<Employees />
			</div>
		</div>
	);
}

export default App;
