import '../Tasks/tasks.css';
import { Row, Col, Card, Button, Table, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { AddEmployee } from './AddEmployeeForm';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { fetchEmployees } from './fetchEmployees';
import { fetchEmployeeById } from './fetchEmployeesByID';
import { deleteEmployee } from './deleteEmployee';

function Employees({ showAddEmployeeButton, onEmployeeUpdate }) {
	const [employees, setEmployees] = useState([]);
	const [tasks, setTasks] = useState({});
	const [numEmployees, setNumEmployees] = useState(0);
	const [numTasks, setNumTasks] = useState(0);
	const [numCompletedTasks, setNumCompletedTasks] = useState(0);

	async function fetchEmployeeData() {
		const data = await fetchEmployees();
		setEmployees(data);
		onEmployeeUpdate(data);

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
		const nonEmptyTasks = Object.values(tasksData).filter(
			(taskArr) => taskArr.length > 0,
		);
		// console.log('Number of tasks:', nonEmptyTasks.length);
		// console.log('tasks', tasksData);
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

	useEffect(() => {
		// Fetch employees when the component mounts
		fetchEmployeeData();
	}, []);

	const [displayForm, setDisplayForm] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState(null);

	const handleShowFormBtn = () => {
		setDisplayForm(true);
	};

	const handleCloseFormBtn = () => {
		setDisplayForm(false);
	};

	const navigate = useNavigate();

	const handleViewBtn = (employee) => {
		setSelectedEmployee(employee);
		// Route to the corresponding Task page
		navigate(`/employees/${employee.id}`, { state: { employee } });
	};

	async function handleDeleteBtn(Fname, id) {
		try {
			if (
				window.confirm(
					`Are you sure you want to delete ${Fname.split(' ')
						.map((word) => word.charAt(0).toLocaleUpperCase() + word.slice(1))
						.join(' ')}?`,
				)
			) {
				await deleteEmployee(id);
				const updatedEmployees = employees.filter(
					(employee) => employee.id !== id,
				);
				setEmployees(updatedEmployees);
				// setEmployees((prevEmployees) =>
				// 	prevEmployees.filter((employee) => employee.id !== id),
				// );
				onEmployeeUpdate(updatedEmployees);
			}
		} catch (error) {
			console.error('Error deleting employee:', error);
		}
	}
	return (
		<Container fluid className='p-0'>
			<Row className='mb-5'>
				<Col className=''>
					<Card className='table-card'>
						<Row>
							<Col xs={8}>
								<h2 className='sans-serif p-4 m-0'>Employees</h2>
							</Col>
							<Col>
								{showAddEmployeeButton && (
									<Link to=''>
										<Button
											variant='dark'
											className='btn'
											onClick={handleShowFormBtn}
										>
											<FontAwesomeIcon icon={faPlus} className='create-icon' />
											Add New Employee
										</Button>
									</Link>
								)}
								{!showAddEmployeeButton && (
									<Link to='/employees'>
										<Button variant='dark' className='btn'>
											View All Employees
										</Button>
									</Link>
								)}
							</Col>
						</Row>
					</Card>
					<Table borderless responsive style={{ textTransform: 'capitalize' }}>
						<thead className='sans-serif'>
							<tr>
								<th>Name</th>
								<th>Department</th>
								{/* <th>Tasks Assigned</th>
								<th>Tasks Completed</th> */}
								{showAddEmployeeButton && <th>Actions</th>}
							</tr>
						</thead>
						<tbody>
							{employees.length === 0 ? (
								<tr>
									<td colSpan='4'>
										<div className='empty-state'>
											<div className='mt-4 mb-4 empty-state-icon-wrap add-people-icon'></div>
											<h3>You're all by yourself</h3>
											<p>Add a new employee to get things moving</p>
										</div>
									</td>
								</tr>
							) : (
								employees.map((employee, index) => (
									<tr key={index}>
										<td>{`${employee.Fname + ' ' + employee.Lname}`}</td>
										<td className='department'>{employee.department}</td>
										{/* <td className='task-assigned-count'>
											{employee.taskAssigned}
										</td> */}
										{/* <td>{employee.taskCompleted}</td> */}
										{showAddEmployeeButton && (
											<td>
												<Button
													variant='outline-dark'
													className='action-btn'
													onClick={() => handleViewBtn(employee)}
												>
													<FontAwesomeIcon icon={faEye} />
												</Button>
												<Button
													variant='outline-danger'
													className='action-btn'
													onClick={() =>
														handleDeleteBtn(employee.Fname, employee.id)
													}
												>
													<FontAwesomeIcon icon={faXmark} />
												</Button>
											</td>
										)}
									</tr>
								))
							)}
						</tbody>
					</Table>
					{/* the div below was added to leave a space at the bottom of the in the Homepage */}
					<div className='mb-5'></div>{' '}
				</Col>
			</Row>
			{displayForm && (
				<AddEmployee
					displayForm={displayForm}
					handleCloseFormBtn={handleCloseFormBtn}
				/>
			)}
		</Container>
	);
}

export default Employees;
