import './TaskPage.css';
import { Card, Button, Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircle,
	faClock,
	faCheckCircle,
	faTrashCan,
} from '@fortawesome/free-regular-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet';
import { fetchTaskByID } from '../components/Tasks/fetchTaskByID';
import { fetchEmployees } from '../components/Employees/fetchEmployees';
import { updateTask } from '../components/Tasks/updateTask';
import { useNavigate } from 'react-router-dom';
import { deleteTask } from '../components/Tasks/deleteTask';
import EmployeesForList from '../components/Employees/EmployeesForList';
import { fetchEmployeeByID } from '../components/Employees/fetchEmployeeByID';

const priorityList = [
	{ value: 'low', label: 'Low' },
	{ value: 'medium', label: 'Medium' },
	{ value: 'high', label: 'High' },
];
const statusList = [
	{ value: 'not started', label: 'Not-Started' },
	// { value: 'In-Progress', label: 'In-Progress' },
	{ value: 'completed', label: 'Completed' },
];

export const TaskPage = () => {
	const { state } = useLocation();
	const task = state?.task;
	// const employeeState = state?.employee;
	const [tasksByEmployee, setTasksByEmployee] = useState([]);
	// const employeeName = tasksByEmployee?.Fname + ' ' + tasksByEmployee?.Lname;
	const [employeeName, setEmployeeName] = useState('');

	const [editEnable, setEditEnable] = useState(false);

	const employeeList = EmployeesForList();

	const handleEdit = () => {
		setEditEnable(true);
	};
	const [selectedTask, setSelectedTask] = useState(task);
	const [assigneeList, setAssigneeList] = useState([]);

	const handleCancel = () => {
		setEditEnable(false);
		setSelectedTask(task);
	};
	async function handleSave() {
		setEditEnable(false);
		try {
			const updatedTask = await updateTask(selectedTask.id, {
				description: selectedTask.description,
				priority: selectedTask.priority,
				status: selectedTask.status,
				employeeId: selectedTask.assignee,
			});
			setSelectedTask(updatedTask);
			setTasksByEmployee(updatedTask);
			const updatedAssignee = await fetchEmployeeByID(selectedTask.assignee);
			setEmployeeName(updatedAssignee.Fname + ' ' + updatedAssignee.Lname);
			// console.log('Task updated successfully!');
		} catch (error) {
			// Handle error
			console.error('Error updating task:', error);
		}
		task.description = selectedTask.description;
		task.priority = selectedTask.priority;
		task.status = selectedTask.status;
		task.assignee = selectedTask.assignee;
	}
	const handleDescriptionChange = (e) => {
		const newTask = { ...selectedTask, description: e.target.value };
		setSelectedTask(newTask);
	};
	const handlePriorityChange = (e) => {
		const newTask = { ...selectedTask, priority: e.target.value };
		setSelectedTask(newTask);
	};
	const handleStatusChange = (e) => {
		const newTask = { ...selectedTask, status: e.target.value };
		setSelectedTask(newTask);
	};
	const handleAssigneeChange = (e) => {
		const newTask = { ...selectedTask, assignee: e.target.value };
		setSelectedTask(newTask);
	};

	const navigate = useNavigate();

	async function handleDeleteBtn(id) {
		// Display a confirmation dialog
		const confirmDelete = window.confirm(
			'Are you sure you want to delete this task?',
		);

		if (confirmDelete) {
			try {
				await deleteTask(id);
				// Redirect to the employee list or perform any other necessary action
				navigate('/tasks');
			} catch (error) {
				// Handle error
				console.error('Error deleting task:', error);
			}
		}
	}

	useEffect(() => {
		// Update employeeName whenever tasksByEmployee or selectedTask changes
		if (tasksByEmployee && tasksByEmployee.Fname && tasksByEmployee.Lname) {
			setEmployeeName(tasksByEmployee.Fname + ' ' + tasksByEmployee.Lname);
		} else {
			setEmployeeName('Unassigned');
		}
	}, [tasksByEmployee, selectedTask]);

	useEffect(() => {
		fetchTaskData();
		setSelectedTask(task);
		async function getData() {
			try {
				const employeesData = await fetchEmployees();

				const list = employeesData.map((employee) => ({
					value: employee.id.toString(),
					label: `${employee.Fname} ${employee.Lname}`,
				}));

				setAssigneeList(list);
			} catch (error) {
				console.error('Error:', error);
			}
		}

		getData();
	}, [task]);

	async function fetchTaskData() {
		const tasks = await fetchTaskEmployee(task.id);
		setTasksByEmployee(tasks);
	}
	async function fetchTaskEmployee(id) {
		try {
			const task = await fetchTaskByID(id);
			return task.Employee;
		} catch (error) {
			console.error(`Error fetching employee for task with ID ${id}:`, error);
			return [];
		}
	}
	return (
		<div>
			<Helmet>
				<title>Task Detail</title>
			</Helmet>
			<Card className='card-wrap p-5'>
				{/* <div className='empty-state'>
					<h3>Task not found</h3>
				</div> */}
				<Container fluid className='p-0'>
					<Row>
						<Col lg={9}>
							<h2 className='sans-serif mt-2 mb-5'>Task Detail</h2>
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
					<Row>
						<Col md={12}>
							{editEnable && (
								<input
									className='mt-0 mb-3 input edit-input'
									type='text'
									value={selectedTask.description}
									onChange={handleDescriptionChange}
									autoFocus
								/>
							)}
							{!editEnable && (
								<div className='mb-3 name-description'>
									{/* <h4 className='m-0'>{task.description}</h4> */}
									<h4 className='m-0 p-0'>{selectedTask.description}</h4>
								</div>
							)}
						</Col>
					</Row>

					<Row style={{ textTransform: 'capitalize' }}>
						<Col lg={12} className='mb-4'>
							<hr />
						</Col>

						<Col md={3} className='mb-4'>
							<div className='properties property-title'>Priority</div>
						</Col>
						<Col md={9} className='mb-4'>
							{!editEnable && selectedTask.priority}
							{editEnable && (
								<Form.Select
									aria-label='Default select example'
									className='assignee-select'
									style={{ textTransform: 'capitalize' }}
									onChange={handlePriorityChange}
								>
									<option selected disabled>
										{selectedTask?.priority}
									</option>
									{priorityList.map((_priority) => (
										<option key={_priority.value} value={_priority.value}>
											{_priority.label}
										</option>
									))}
								</Form.Select>
							)}
						</Col>

						<Col md={3} className='mb-4'>
							<div className='properties property-title'>Status</div>
						</Col>
						<Col md={9} className={`mb-4`}>
							<div className='properties'>
								{!editEnable && selectedTask.status}
								{editEnable && (
									<Form.Select
										aria-label='Default select example'
										className='assignee-select'
										style={{ textTransform: 'capitalize' }}
										onChange={handleStatusChange}
									>
										<option selected disabled>
											{selectedTask?.status}
										</option>
										{statusList.map((_status) => (
											<option key={_status.value} value={_status.value}>
												{_status.label}
											</option>
										))}
									</Form.Select>
								)}
							</div>
						</Col>

						<Col md={3} className='mb-4'>
							<div className='properties property-title'>Assignee</div>
						</Col>
						<Col md={9} className='mb-4'>
							<div className='properties assignee-property'>
								{!editEnable && (employeeName ? employeeName : 'Unassigned')}
								{editEnable && (
									<Form.Select
										aria-label='Default select example'
										className='assignee-select'
										style={{ textTransform: 'capitalize' }}
										value={selectedTask.assignee}
										onChange={handleAssigneeChange}
									>
										<option selected disabled>
											{employeeName ? employeeName : 'Unassigned'}
										</option>
										{assigneeList.map((_assignee) => (
											<option key={_assignee.value} value={_assignee.value}>
												{_assignee.label}
											</option>
										))}
									</Form.Select>
								)}
							</div>
						</Col>
						{editEnable && (
							<Col md={12} className='mt-4 mb-4'>
								<Button
									variant='secondary'
									onClick={() => handleDeleteBtn(selectedTask.id)}
								>
									<FontAwesomeIcon icon={faTrashCan} className='remove-btn' />
									Remove
								</Button>
								<div className='edit-btn'>
									{!editEnable && (
										<Button variant='outline-dark' onClick={handleEdit}>
											<FontAwesomeIcon icon={faPen} />
										</Button>
									)}
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
