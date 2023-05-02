import './tasks.css';
import { Row, Col, Card, Button, Table, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircle,
	faClock,
	faCheckCircle,
} from '@fortawesome/free-regular-svg-icons';
import { faPlus, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { CreateTaskForm } from './CreateTaskForm';

function Tasks({ showCreateNewTaskButton }) {
	const tasks = [
		{
			description: 'Develop a marketing strategy for product launch',
			priority: 'medium',
			status: 'not-started',
			assignee: 'Mark Davidson',
		},
		{
			description: 'Redesign mobile app',
			priority: 'low',
			status: 'in-progress',
			assignee: 'Laura Huff',
		},
		{
			description: 'Develop prototype software for MVP',
			priority: 'high',
			status: 'completed',
			assignee: 'Christian Wu',
		},
	];
	const [displayForm, setDisplayForm] = useState(false);

	const handleShowFormBtn = () => {
		setDisplayForm(true);
	};

	const handleCloseFormBtn = () => {
		setDisplayForm(false);
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
								{!showCreateNewTaskButton && (
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
							</tr>
						</thead>
						<tbody>
							{tasks.length === 0 ? (
								<tr>
									<td colSpan='4'>
										<div className='empty-state'>
											<div className='mt-4 mb-4 empty-state-icon-wrap tick-icon'></div>
											<h3>You're on top of things!</h3>
											<p>No new tasks at the moment</p>
										</div>
									</td>
								</tr>
							) : (
								tasks.map((task, index) => (
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
										<td className={`td-status td-${task.status}`}>
											<span
												className={`status-label status-label-${task.status}`}
											>
												{task.status === 'not-started' && (
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
										<td>{task.assignee}</td>
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
		</Container>
	);
}
export default Tasks;
