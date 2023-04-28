import './App.css';
import Navigation from './components/Navigation/Navigation';
import { Dashboard } from './pages/Dashboard';
import { TasksPage } from './pages/TasksPage';
import { EmployeesPage } from './pages/EmployeesPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<div className='body-wrap'>
				<Router basename='/'>
					<Navigation />
					<Routes>
						<Route exact path='/' element={<Dashboard />} />
						<Route path='/tasks' element={<TasksPage />} />
						<Route path='/employees' element={<EmployeesPage />} />
					</Routes>
				</Router>
			</div>
		</div>
	);
}

export default App;
