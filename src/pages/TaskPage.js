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
import { faPen, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet';

const priorityList = [
	{ value: 'Low', label: 'Low' },
	{ value: 'Medium', label: 'Medium' },
	{ value: 'High', label: 'High' },
];
const statusList = [
	{ value: 'Not-Started', label: 'Not-Started' },
	{ value: 'In-Progress', label: 'In-Progress' },
	{ value: 'Completed', label: 'Completed' },
];
const assigneeList = [
	{ value: 'Mark Davidson', label: 'Mark Davidson' },
	{ value: 'Laura Huff', label: 'Laura Huff' },
	{ value: 'Christian Wu', label: 'Christian Wu' },
	{ value: 'Jason Smith', label: 'Jason Smith' },
	{ value: 'Kayla Davis', label: 'Kayla Davis' },
	{ value: 'Andrew Chen', label: 'Andrew Chen' },
];

export const TaskPage = () => {
	const { state } = useLocation();
	const task = state?.task;

	const [editEnable, setEditEnable] = useState(false);
	const handleEdit = () => {
		setEditEnable(true);
	};
	const [selectedTask, setSelectedTask] = useState(task);

	const handleCancel = () => {
		setEditEnable(false);
		setSelectedTask(task);
	};
	const handleSave = () => {
		setEditEnable(false);
		task.description = selectedTask.description;
		task.priority = selectedTask.priority;
		task.status = selectedTask.status;
		task.assignee = selectedTask.assignee;
	};
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
		// console.log('task.status: ', task.status);
		// console.log('newTask.status: ', newTask.status);
		// console.log('task: ', task);
		// console.log('newTask: ', newTask);
	};
	const handleAssigneeChange = (e) => {
		const newTask = { ...selectedTask, assignee: e.target.value };
		setSelectedTask(newTask);
		// console.log('task.status: ', task.status);
		// console.log('newTask.status: ', newTask.status);
		// console.log('task: ', task);
		// console.log('newTask: ', newTask);
	};

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
									<h4 className='m-0 p-0'>{task.description}</h4>
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
							{!editEnable && task.priority}
							{editEnable && (
								<Form.Select
									aria-label='Default select example'
									className='assignee-select'
									style={{ textTransform: 'capitalize' }}
									onChange={handlePriorityChange}
								>
									<option selected disabled>
										{task?.priority}
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
								{!editEnable && task.status}
								{editEnable && (
									<Form.Select
										aria-label='Default select example'
										className='assignee-select'
										style={{ textTransform: 'capitalize' }}
										onChange={handleStatusChange}
									>
										<option selected disabled>
											{task?.status}
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
								{!editEnable && task.assignee}
								{editEnable && (
									<Form.Select
										aria-label='Default select example'
										className='assignee-select'
										style={{ textTransform: 'capitalize' }}
										onChange={handleAssigneeChange}
									>
										<option selected disabled>
											{task?.assignee}
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
								<Button variant='secondary'>
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
