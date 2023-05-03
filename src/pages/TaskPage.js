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

export const TaskPage = () => {
	const { state } = useLocation();
	const task = state?.task;
	return (
		<div>
			<Card className='card-wrap p-5'>
				<Container fluid className='p-0'>
					<Row>
						<Col lg={9}>
							<h2 className='sans-serif mt-2 mb-5'>Task Detail</h2>
						</Col>
						<Col md={3} className='mb-3'>
							<div className='edit-btn'>
								<Button variant='outline-secondary'>
									<FontAwesomeIcon icon={faPen} />
								</Button>
								{/* <Button variant='outline-secondary'>
									<FontAwesomeIcon icon={faFloppyDisk} />
								</Button> */}
							</div>
						</Col>
					</Row>
					<Row>
						<Col md={9}>
							<input
								className='mt-0 mb-3 p-0 input'
								type='text'
								value={task.description}
								autoFocus
							/>
							<div className='mb-3 task-description'>
								{/* <h4 className='m-0'>{task.description}</h4> */}
								<h4 className='m-0 p-0'>
									Develop a marketing strategy for product launch.
								</h4>
							</div>
						</Col>
						{/* <Col md={3} className='mb-3'>
							<div className='edit-btn'>
								<Button variant='outline-secondary'>
									<FontAwesomeIcon icon={faPen} />
								</Button>
							</div>
						</Col> */}
					</Row>

					<Row style={{ textTransform: 'capitalize' }}>
						<Col lg={12} className='mb-4'>
							<hr />
						</Col>
						<Col md={3} className='mb-4'>
							<div className='priority-wrap'>Priority</div>
						</Col>
						<Col md={9} className='mb-4'>
							{/* <div className='priority-wrap'>{task.priority}</div> */}
							<div className='priority-wrap'>
								<span
									className={`priority-dot priority-dot-${task.priority}`}
								></span>
								<span className={`priority-${task.priority}`}>
									{task.priority.charAt(0).toUpperCase() +
										task.priority.slice(1)}
								</span>
							</div>
						</Col>

						<Col md={3} className='mb-4'>
							<div className='priority-wrap'>Status</div>
						</Col>
						<Col md={9} className={`mb-4 td-${task.status}`}>
							{/* <div className='priority-wrap'>{task.status}</div> */}
							<div className='priority-wrap'>
								<span className={`status-label status-label-${task.status}`}>
									{task.status === 'not-started' && (
										<FontAwesomeIcon icon={faCircle} className='status-icon' />
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
							</div>
						</Col>

						<Col md={3} className='mb-4'>
							<div className='priority-wrap'>Assignee</div>
						</Col>
						<Col md={9} className='mb-4'>
							<div className='priority-wrap'>{task.assignee}</div>
						</Col>
					</Row>
				</Container>
			</Card>
		</div>
	);
};
