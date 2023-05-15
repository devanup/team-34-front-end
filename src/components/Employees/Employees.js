import '../Tasks/tasks.css';
import { Row, Col, Card, Button, Table, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useContext } from 'react';
import { AddEmployee } from './AddEmployeeForm';
import { useNavigate } from 'react-router-dom';
import { fetchEmployees } from './fetchEmployees';
import { deleteEmployee } from './deleteEmployee';
import EmployeeContext from './EmployeeContext';

function Employees({ showAddEmployeeButton, onEmployeeUpdate }) {
	const { employees, updateEmployees } = useContext(EmployeeContext);

	useEffect(() => {
		// Fetch employees when the component mounts
		fetchEmployeeData();
	}, []);

	async function fetchEmployeeData() {
		const data = await fetchEmployees();
		updateEmployees(data);
	}

	// async function fetchEmployeeTasks(id) {
	// 	try {
	// 		const employee = await fetchEmployeeById(id);
	// 		return employee.Tasks;
	// 	} catch (error) {
	// 		console.error(`Error fetching tasks for employee with ID ${id}:`, error);
	// 		return [];
	// 	}
	// }

	const [displayForm, setDisplayForm] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState(null);

	const handleShowFormBtn = () => {
		setDisplayForm(true);
		console.log('form opened');
	};

	const handleCloseFormBtn = () => {
		setDisplayForm(false);
		console.log('form closed');
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
				updateEmployees(updatedEmployees);

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
					handleShowFormBtn={handleShowFormBtn}
					handleCloseFormBtn={handleCloseFormBtn}
					employees={employees}
					updateEmployees={updateEmployees}
				/>
			)}
		</Container>
	);
}

export default Employees;
