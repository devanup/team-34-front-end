import './tasks.css';
import { Row, Col, Card, Button, Table, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircle,
	faClock,
	faCheckCircle,
	faEye,
} from '@fortawesome/free-regular-svg-icons';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { CreateTaskForm } from './CreateTaskForm';
// import { TaskPage } from '../../pages/TaskPage';
import { Routes, Route, useNavigate } from 'react-router-dom';
import TaskContext from './TaskContext';
import { fetchTasks } from './fetchTasks';

function Tasks({
	showActions,
	showCreateNewTaskButton,
	showViewTaskButton,
	tasksByEmpl,
	tasksByEmplCount,
	employeeName,
	hideDeleteButton,
}) {
	const { tasks, updateTasks } = useContext(TaskContext);
	const [displayForm, setDisplayForm] = useState(false);
	const [selectedTask, setSelectedTask] = useState(null);

	useEffect(() => {
		// Fetch employees when the component mounts
		fetchTaskData();
	}, []);

	async function fetchTaskData() {
		const data = await fetchTasks();
		updateTasks(data);
	}

	const handleShowFormBtn = () => {
		setDisplayForm(true);
	};

	const handleCloseFormBtn = () => {
		setDisplayForm(false);
	};
	const navigate = useNavigate();

	const handleViewBtn = (task) => {
		setSelectedTask(task);
		console.log(task);
		// Route to the corresponding Task page
		navigate(`/tasks/${task.id}`, { state: { task } });
	};

	const handleAssigneeClick = (task) => {
		// Route to the corresponding Employee page
	};

	return (
		<Container fluid className='p-0'>
			<Row className='mb-5'>
				<Col>
					<Card className='table-card'>
						<Row>
							<Col xs={8}>
								<h2 className='sans-serif tasks-heading p-4 m-0'>Tasks</h2>
							</Col>
							<Col>
								{showCreateNewTaskButton && (
									<Link to=''>
										<Button
											variant='dark'
											className='btn'
											onClick={handleShowFormBtn}
										>
											<FontAwesomeIcon icon={faPlus} className='create-icon' />
											Create New Task
										</Button>
									</Link>
								)}
								{!showCreateNewTaskButton && showViewTaskButton && (
									<Link to='/tasks'>
										<Button variant='dark' className='btn'>
											View All Tasks
										</Button>
									</Link>
								)}
							</Col>
						</Row>
					</Card>

					<Table borderless responsive>
						<thead className='sans-serif'>
							<tr>
								<th>Description</th>
								<th>Priority</th>
								<th>Status</th>
								<th>Assignee</th>
								{showActions && <th>Actions</th>}
							</tr>
						</thead>
						<tbody>
							{tasks.length === 0 || tasksByEmplCount < 1 ? (
								<tr>
									<td colSpan='12'>
										<div className='empty-state'>
											<div className='mt-4 mb-4 empty-state-icon-wrap tick-icon'></div>
											<h3>You're on top of things!</h3>
											<p>No new tasks at the moment</p>
										</div>
									</td>
								</tr>
							) : (
								(tasksByEmpl ? tasksByEmpl : tasks).map((task, index) => (
									<tr key={index}>
										<td>{task.description}</td>
										<td className='priority'>
											<span
												className={`priority-dot priority-dot-${task.priority}`}
											></span>
											<span className={`priority-${task.priority}`}>
												{task.priority.charAt(0).toUpperCase() +
													task.priority.slice(1)}
											</span>
										</td>
										<td
											className={`td-status td-${
												task.status === 'not started'
													? 'not-started'
													: task.status
											}`}
										>
											{console.log('task.status', task.status)}
											<span
												className={`status-label status-label-${
													task.status === 'not started'
														? 'not-started'
														: task.status
												}`}
											>
												{task.status === 'not started' && (
													<FontAwesomeIcon
														icon={faCircle}
														className='status-icon'
													/>
												)}
												{task.status === 'in-progress' && (
													<FontAwesomeIcon
														icon={faClock}
														className='status-icon'
													/>
												)}
												{task.status === 'completed' && (
													<FontAwesomeIcon
														icon={faCheckCircle}
														className='status-icon'
													/>
												)}
												{task.status.charAt(0).toUpperCase() +
													task.status.slice(1)}
											</span>
										</td>
										<td>{employeeName ? employeeName : task.assignee}</td>
										{showActions && (
											<td>
												<Button
													variant='outline-dark'
													className='action-btn'
													onClick={() => handleViewBtn(task)}
												>
													<FontAwesomeIcon icon={faEye} />
												</Button>
												{!hideDeleteButton && (
													<Button
														variant='outline-danger'
														className='action-btn'
														onClick=''
													>
														<FontAwesomeIcon icon={faXmark} />
													</Button>
												)}
											</td>
										)}
									</tr>
								))
							)}
							{/* Display when the state is empty */}
							{/* <tr>
								<td colSpan='4'>
									<div className='empty-state'>
										<div className='mt-4 mb-4 empty-state-icon-wrap tick-icon'></div>
										<h3>You're on top of things!</h3>
										<p>No new tasks at the moment</p>
									</div>
								</td>
							</tr> */}
							{}
						</tbody>
					</Table>
				</Col>
			</Row>
			{displayForm && (
				<CreateTaskForm
					displayForm={displayForm}
					handleCloseFormBtn={handleCloseFormBtn}
				/>
			)}
			{/* {selectedTask !== null && <TaskView task={selectedTask} />} */}
		</Container>
	);
}
export default Tasks;
