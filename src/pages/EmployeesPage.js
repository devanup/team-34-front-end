import { Card, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faClipboardList,
	faCheckCircle,
	faPeopleGroup,
	faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import Employees from '../components/Employees/Employees';
import { Helmet } from 'react-helmet';
import { fetchEmployees } from '../components/Employees/fetchEmployees';
// import {  } from '../components/Tasks/fetchTasks';
import { AddEmployee } from '../components/Employees/AddEmployeeForm';
import { fetchEmployeeById } from '../components/Employees/fetchEmployeesByID';
import { useEffect, useState } from 'react';

export const EmployeesPage = () => {
	const [employees, setEmployees] = useState([]);
	const [tasks, setTasks] = useState({});
	const [numEmployees, setNumEmployees] = useState(0);
	const [numTasks, setNumTasks] = useState(0);
	const [numCompletedTasks, setNumCompletedTasks] = useState(0);

	useEffect(() => {
		// Fetch employees when the component mounts
		fetchEmployeeData();
	}, []);

	async function fetchEmployeeData() {
		const data = await fetchEmployees();
		setEmployees(data);
		setNumEmployees(data.length);

		// Fetch tasks for each employee and store them in the tasks state
		const tasksData = {};
		let totalTasks = 0;
		let totalCompletedTasks = 0;

		for (const employee of data) {
			const tasks = await fetchEmployeeTasks(employee.id);
			tasksData[employee.id] = tasks;
			totalTasks += tasks.length;
			totalCompletedTasks += tasks.filter(
				(task) => task.status === 'completed',
			).length;
		}

		setTasks(tasksData);
		setNumEmployees(data.length);
		setNumTasks(totalTasks);
		setNumCompletedTasks(totalCompletedTasks);
	}

	async function fetchEmployeeTasks(id) {
		try {
			const employee = await fetchEmployeeById(id);
			return employee.Tasks;
		} catch (error) {
			console.error(`Error fetching tasks for employee with ID ${id}:`, error);
			return [];
		}
	}

	// useEffect(() => {
	// 	// Update numTasks and numCompletedTasks when the tasks state changes
	// const nonEmptyTasks = Object.values(tasks).filter(
	// 	(taskArr) => taskArr.length > 0,
	// );
	// 	setNumTasks(nonEmptyTasks.length);

	// const completedTasks = nonEmptyTasks.flatMap((taskArr) =>
	// 	taskArr.filter((task) => task.status === 'completed'),
	// );
	// 	setNumCompletedTasks(completedTasks.length);
	// }, [employees]);

	const updateEmployeeCount = (newEmployees) => {
		setEmployees(newEmployees);
		// console.log(`Number of employees: ${newEmployees.length}`);
	};

	// console.log('Employees[ ]: ', employees);

	return (
		<div>
			<Helmet>
				<title>Employees</title>
			</Helmet>
			<Card className='overview p-0 mb-4'>
				<Card.Body className='p-0'>
					<Container fluid className='p-0'>
						<Row>
							{/* <Col md={8}>
								<h2 className='sans-serif mt-2'>Employees Overview</h2>
							</Col> */}
							{/* <Col md>
								<div className='search-wrap'>
									<div className='search-icon-wrap'>
										<FontAwesomeIcon
											className='search-icon'
											icon={faMagnifyingGlass}
										/>
									</div>
									<input
										type='text'
										placeholder='Search employee'
										className='search-input'
									/>
								</div>
							</Col> */}
						</Row>
						{/* <Row className='text-center mt-5'>
							<Col md>
								<Card className='card task-card p-3 mb-4'>
									<div className='icon mt-3 mb-3'>
										<FontAwesomeIcon icon={faClipboardList} />
									</div>
									<h5 className='sans-serif'>Employees</h5>
									<h6 className='mb-2 card-count-display'>{numEmployees}</h6>
								</Card>
							</Col>
							<Col md>
								<Card className='card completed-card p-3 mb-4'>
									<div className='icon mt-3 mb-3'>
										<FontAwesomeIcon icon={faPeopleGroup} />
									</div>
									<h5 className='sans-serif'>Tasks Assigned</h5>
									<h6 className='mb-2 card-count-display'>{numTasks}</h6>
								</Card>
							</Col>
							<Col md>
								<Card className='card employees-card p-3 mb-4'>
									<div className='icon mt-3 mb-3'>
										<FontAwesomeIcon icon={faCheckCircle} />
									</div>
									<h5 className='sans-serif'>Tasks Completed</h5>
									<h6 className='mb-2 card-count-display'>
										{numCompletedTasks}
									</h6>
								</Card>
							</Col>
						</Row> */}
					</Container>
				</Card.Body>
			</Card>
			<Employees
				showAddEmployeeButton={true}
				onEmployeeUpdate={updateEmployeeCount}
			/>
		</div>
	);
};
