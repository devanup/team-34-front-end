import './TaskPage.css';
import { Card, Button, Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircle,
	faClock,
	faCheckCircle,
} from '@fortawesome/free-regular-svg-icons';
import { faPen, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Select from 'react-select';

const priorityList = [
	{ value: 1, label: 'Low' },
	{ value: 2, label: 'Medium' },
	{ value: 3, label: 'High' },
];

export const TaskPage = () => {
	const { state } = useLocation();
	const task = state?.task;

	const [editEnable, setEditEnable] = useState(false);
	const [selectedTask, setSelectedTask] = useState({
		id: task.id,
		name: task.name,
		description: task.description,
		assignee: task.assignee,
		priority: task.priority,
	});
	console.log('selectedTask.priority: ', selectedTask.priority);
	// Check the value of task.priority and set selectedTask.priority accordingly
	// useEffect(() => {
	// 	setSelectedTask((prevSelectedTask) => ({
	// 		...prevSelectedTask,
	// 		priority: task.priority,
	// 	}));
	// }, [task.priority]);

	const handleEdit = () => {
		setEditEnable(true);
	};

	const handleCancel = () => {
		setEditEnable(false);
		setSelectedTask(task);
	};

	const handleSave = () => {
		setEditEnable(false);
		task.description = selectedTask.description;
		task.priority = selectedTask.priority;
	};
	/*
	const handleEdit = () => {
		setEditEnable(true);
		// console.log('task.priority: ', task.priority);
		if (editEnable) setEditEnable(!true);
	};
	*/

	// const taskPriority = task.priority;
	// const [selectedPriority, setSelectedPriority] = useState(taskPriority);

	const handleDescriptionChange = (e) => {
		const newTask = { ...selectedTask, description: e.target.value };
		setSelectedTask(newTask);
	};

	const handlePriorityChange = (e) => {
		const newTask = { ...selectedTask, priority: e.target.value };
		setSelectedTask(newTask);
	};

	const priorities = ['Low', 'Medium', 'High'];

	const statuses = ['Not-Started', 'In-Progress', 'Completed'];

	return (
		<div>
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
									<Button variant='outline-secondary' onClick={handleEdit}>
										<FontAwesomeIcon icon={faPen} />
									</Button>
								)}
								{editEnable && (
									<Button
										className='edit-enabled-btn'
										variant='secondary'
										onClick={handleSave}
									>
										{/* <FontAwesomeIcon icon={faFloppyDisk} /> */}
										Save
									</Button>
								)}
								{editEnable && (
									<Button
										className='edit-enabled-btn'
										variant='light'
										onClick={handleCancel}
									>
										Cancel
									</Button>
								)}
							</div>
						</Col>
					</Row>
					<Row>
						<Col md={9}>
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
							<div className='properties'>
								{/* <span>
										{task.priority.charAt(0).toUpperCase() +
											task.priority.slice(1)}
									</span> */}
								{/* <select
									id='assignee'
									name='assignee'
									className='form-input assignee-select'
									onChange={handlePriorityChange}
								>
									{priorities.map((_priority) => (
										<option key={_priority} value={_priority}>
											{_priority}
										</option>
									))}
								</select> */}
								<Select
									// value={''}
									// onChange={handlePriorityChange}
									options={priorityList}
									placeholder='Select priority'
								/>
							</div>

							{/* {editEnable && (
								<select
									id='assignee'
									name='assignee'
									className='form-input assignee-select'
									value={selectedTask.priority}
									onChange={handlePriorityChange}
									defaultValue={task.priority}
								>
									{priorities.map((_priority) => (
										<option key={_priority} value={_priority}>
											{_priority}
										</option>
									))}
								</select>
							)} */}
						</Col>

						<Col md={3} className='mb-4'>
							<div className='properties property-title'>Status</div>
						</Col>
						<Col md={9} className={`mb-4 td-${task.status}`}>
							<div className='properties'>
								{!editEnable && (
									<span className={`status-label status-label-${task.status}`}>
										{task.status === 'not-started' && (
											<FontAwesomeIcon
												icon={faCircle}
												className='status-icon'
											/>
										)}
										{task.status === 'in-progress' && (
											<FontAwesomeIcon icon={faClock} className='status-icon' />
										)}
										{task.status === 'completed' && (
											<FontAwesomeIcon
												icon={faCheckCircle}
												className='status-icon'
											/>
										)}
										{task.status.charAt(0).toUpperCase() + task.status.slice(1)}
									</span>
								)}
								{editEnable && (
									<select
										id='assignee'
										name='assignee'
										className='form-input assignee-select'
									>
										{statuses.map((_status) => (
											<option>{_status}</option>
										))}
									</select>
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
									<select
										id='assignee'
										name='assignee'
										className='form-input assignee-select'
									>
										<option value={task.assignee}>{task.assignee}</option>
										<option value={task.assignee}>{task.assignee}</option>
										<option value={task.assignee}>{task.assignee}</option>
									</select>
								)}
							</div>
						</Col>
					</Row>
				</Container>
			</Card>
		</div>
	);
};
