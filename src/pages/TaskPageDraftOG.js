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

export const TaskPage = () => {
	const { state } = useLocation();
	const task = state?.task;

	const [editEnable, setEditEnable] = useState(false);
	const handleEdit = () => {
		setEditEnable(true);
		// console.log('task.priority: ', task.priority);
		if (editEnable) setEditEnable(!true);
	};
	const taskPriority = task.priority;

	const priorities = ['Low', 'Medium', 'High'];

	const statuses = ['Not-Started', 'In-Progress', 'Completed'];

	return (
		<div>
			{console.log('task.priority: ', task.priority)}
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
										onClick={handleEdit}
									>
										{/* <FontAwesomeIcon icon={faFloppyDisk} /> */}
										Save
									</Button>
								)}
								{editEnable && (
									<Button
										className='edit-enabled-btn'
										variant='light'
										onClick={handleEdit}
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
									value={task.description}
									autoFocus
								/>
							)}
							{!editEnable && (
								<div className='mb-3 name-description'>
									{/* <h4 className='m-0'>{task.description}</h4> */}
									<h4 className='m-0 p-0'>
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
										vitae harum, consequuntur optio delectus voluptate error
										quisquam ut veniam dignissimos at porro nam unde sequi
										dolorum iste totam laudantium veritatis.
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
							<div className='properties property-title'>Priority</div>
						</Col>
						<Col md={9} className='mb-4'>
							{!editEnable && (
								<div className='properties'>
									<span
										className={`priority-dot priority-dot-${task.priority}`}
									></span>
									<span className={`priority-${task.priority}`}>
										{task.priority.charAt(0).toUpperCase() +
											task.priority.slice(1)}
									</span>
								</div>
							)}
							{editEnable && (
								<select
									id='assignee'
									name='assignee'
									className='form-input assignee-select'
									defaultValue={taskPriority}
								>
									{priorities.map((_priority) => (
										<option selected={taskPriority}>{_priority}</option>
									))}
								</select>
							)}
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
