import './App.css';
import Navigation from './components/Navigation/Navigation';
import { Dashboard } from './pages/Dashboard';
import { TasksPage } from './pages/TasksPage';
import { EmployeesPage } from './pages/EmployeesPage';
import { TaskPage } from './pages/TaskPage';
import { HashRouter, Routes, Route } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<div className='body-wrap'>
				<HashRouter basename='/'>
					<Navigation />
					<Routes>
						<Route exact path='/' element={<Dashboard />} />
						<Route path='/tasks' element={<TasksPage />} />
						<Route path='/tasks/:taskId' element={<TaskPage />} />
						<Route path='/employees' element={<EmployeesPage />} />
					</Routes>
				</HashRouter>
			</div>
		</div>
	);
}

export default App;
