import './TaskPage.css';
import { Card, Button, Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect } from 'react';
import Tasks from '../components/Tasks/Tasks';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet';
import { updateEmployee } from '../components/Employees/updateEmployee';
import { fetchEmployeeByID } from '../components/Employees/fetchEmployeeByID';
import { deleteEmployee } from '../components/Employees/deleteEmployee';
import { useNavigate } from 'react-router-dom';

const departmentList = [
	{ value: 'Marketing & Sales', label: 'Marketing & Sales' },
	{ value: 'Design', label: 'Design' },
	{ value: 'Engineering', label: 'Engineering' },
	{ value: 'Finance', label: 'Finance' },
	{ value: 'Legal', label: 'Legal' },
	{ value: 'HR', label: 'HR' },
];
export const EmployeePage = () => {
	const { state } = useLocation();
	const employee = state?.employee;
	const employeeName = employee.Fname + ' ' + employee.Lname;
	const [editEnable, setEditEnable] = useState(false);
	const [tasksByEmpl, setTasksByEmpl] = useState([]);
	const [selectedEmployee, setSelectedEmployee] = useState(employee);

	const handleEdit = () => {
		setEditEnable(true);
	};

	const handleCancel = () => {
		setEditEnable(false);
		setSelectedEmployee(employee);
	};
	async function handleSave() {
		setEditEnable(false);
		try {
			const updatedEmployee = await updateEmployee(selectedEmployee.id, {
				Fname: selectedEmployee.Fname,
				Lname: selectedEmployee.Lname,
				department: selectedEmployee.department,
			});
			setSelectedEmployee(updatedEmployee);
			console.log('Employee updated successfully!');
		} catch (error) {
			// Handle error
			console.error('Error deleting employee:', error);
		}
	}
	const handleFirstNameChange = (e) => {
		const newEmployee = { ...selectedEmployee, Fname: e.target.value };
		setSelectedEmployee(newEmployee);
	};
	const handleLastNameChange = (e) => {
		const newEmployee = { ...selectedEmployee, Lname: e.target.value };
		setSelectedEmployee(newEmployee);
	};
	const handleDepartmentChange = (e) => {
		const newEmployee = { ...selectedEmployee, department: e.target.value };
		setSelectedEmployee(newEmployee);
	};
	useEffect(() => {
		fetchEmployeeData();
		setSelectedEmployee(employee);
	}, [employee]);

	const navigate = useNavigate();

	async function handleDeleteBtn(id) {
		// Display a confirmation dialog
		const confirmDelete = window.confirm(
			'Are you sure you want to delete this employee?',
		);

		if (confirmDelete) {
			try {
				await deleteEmployee(id);
				// Redirect to the employee list or perform any other necessary action
				navigate('/employees');
			} catch (error) {
				// Handle error
				console.error('Error deleting employee:', error);
			}
		}
	}

	async function fetchEmployeeData() {
		const tasks = await fetchEmployeeTasks(employee.id);
		setTasksByEmpl(tasks);
	}
	async function fetchEmployeeTasks(id) {
		try {
			const employee = await fetchEmployeeByID(id);
			return employee.Tasks;
		} catch (error) {
			console.error(`Error fetching tasks for employee with ID ${id}:`, error);
			return [];
		}
	}
	const completedTasksCount = tasksByEmpl.reduce(
		(count, task) => (task.status === 'completed' ? count + 1 : count),
		0,
	);

	return (
		<div>
			<Helmet>
				<title>
					{employeeName
						? employeeName
								.split(' ')
								.map(
									(word) => word.charAt(0).toLocaleUpperCase() + word.slice(1),
								)
								.join(' ')
						: 'Employee Detail'}
				</title>
			</Helmet>
			<Card className='card-wrap p-5'>
				{/* <div className='empty-state'>
					<h3>Employee not found</h3>
				</div> */}
				<Container fluid className='p-0'>
					<Row>
						<Col lg={9}>
							<h2 className='sans-serif mt-2 mb-5'>Employee Detail</h2>
						</Col>
						<Col md={3} className='mb-3'>
							<div className='edit-btn'>
								{!editEnable && (
									<Button variant='outline-dark' onClick={handleEdit}>
										<FontAwesomeIcon icon={faPen} />
									</Button>
								)}
							</div>
						</Col>
					</Row>
					{editEnable && (
						<Row className='mb-4'>
							<Col md={6}>
								<label className=' mb-1'>
									<h5>First Name</h5>
								</label>
								<input
									type='text'
									id='firstName'
									value={selectedEmployee.Fname}
									className='form-input firstName'
									onChange={handleFirstNameChange}
								/>
							</Col>
							<Col md={6}>
								<label className=' mb-1'>
									<h5>Last Name</h5>
								</label>
								<input
									type='text'
									id='lastName'
									value={selectedEmployee.Lname}
									className='form-input lastName'
									onChange={handleLastNameChange}
								/>
							</Col>
						</Row>
					)}
					<Row>
						<Col>
							{!editEnable && (
								<div className='mb-3 name-description'>
									<h4 className='m-0 p-0'>
										{(selectedEmployee.Fname + ' ' + selectedEmployee.Lname)
											.split(' ')
											.map(
												(word) =>
													word.charAt(0).toLocaleUpperCase() + word.slice(1),
											)
											.join(' ')}
									</h4>
								</div>
							)}
						</Col>
					</Row>

					<Row style={{ textTransform: 'capitalize' }}>
						<Col lg={12} className='mb-4'>
							<hr />
						</Col>

						<Col md={3} className='mb-4'>
							<div className='properties property-title'>Department</div>
						</Col>
						<Col md={9} className='mb-4'>
							<div className='properties'>
								{/* {!editEnable && <span className=''>{employee.department}</span>}
								{editEnable && (
									<span>
										<input
											type='text'
											value={employee.department}
											className='department-input'
										/>
									</span>
								)} */}
								{!editEnable && selectedEmployee.department}
								{editEnable && (
									<Form.Select
										aria-label='Default select example'
										className='assignee-select'
										style={{ textTransform: 'capitalize' }}
										onChange={handleDepartmentChange}
									>
										<option selected disabled>
											{selectedEmployee?.department}
										</option>
										{departmentList.map((_department) => (
											<option key={_department.value} value={_department.value}>
												{_department.label}
											</option>
										))}
									</Form.Select>
								)}
							</div>
						</Col>

						<Col md={3} className='mb-4'>
							<div className='properties property-title'>
								{tasksByEmpl.length > 1 ? 'Tasks' : 'Task'} Assigned
							</div>
						</Col>
						<Col md={9} className='mb-4'>
							<div className='properties'>
								{/* {console.log('nonEmptyTasks', nonEmptyTasks)} */}
								<span className=''>{tasksByEmpl.length}</span>
								{/* {editEnable && (
									<span>
										<input type='text' value={employee.taskAssigned} />
									</span>
								)} */}
							</div>
						</Col>

						<Col md={3} className='mb-4'>
							<div className='properties property-title'>
								{tasksByEmpl.length > 1 ? 'Tasks' : 'Task'} Completed
							</div>
						</Col>
						<Col md={9} className='mb-4'>
							<div className='properties'>
								<span className=''>{completedTasksCount}</span>
								{/* {editEnable && (
									<span>
										<input type='text' value={employee.taskCompleted} />
									</span>
								)} */}
							</div>
						</Col>

						{/* view employee specific Tasks here */}
						<Col md={12} className='mt-4'>
							<div className='properties'>
								<Tasks
									showActions={true}
									showViewTaskButton={false}
									hideDeleteButton={true}
									tasksByEmpl={tasksByEmpl}
									tasksByEmplCount={tasksByEmpl.length}
									employeeName={employeeName}
								/>
							</div>
						</Col>
						{editEnable && (
							<Col md={12} className='mb-2'>
								<Button
									variant='secondary'
									onClick={() => handleDeleteBtn(selectedEmployee.id)}
								>
									<FontAwesomeIcon icon={faTrashCan} className='remove-btn' />
									Remove
								</Button>
								<div className='edit-btn'>
									{editEnable && (
										<Button
											className='edit-enabled-btn'
											variant='dark'
											onClick={handleSave}
										>
											{/* <FontAwesomeIcon icon={faFloppyDisk} /> */}
											Save
										</Button>
									)}
									{editEnable && (
										<Button
											className='edit-enabled-btn'
											variant='outline-secondary'
											onClick={handleCancel}
										>
											Cancel
										</Button>
									)}
								</div>
							</Col>
						)}
					</Row>
				</Container>
			</Card>
		</div>
	);
};
