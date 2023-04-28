import Tasks from '../components/Tasks/Tasks';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faClipboardList,
	faClock,
	faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { Helmet } from 'react-helmet';
export const TasksPage = () => {
	return (
		<div>
			<Helmet>
				<title>Tasks</title>
			</Helmet>
			<Card className='overview p-0 mb-4'>
				<Card.Body className='p-0'>
					<Container fluid className='p-0'>
						<Row className='text-center'>
							<Col md={3}>
								<Card className='card task-card p-3 mb-4'>
									<div className='icon mt-3 mb-3'>
										<FontAwesomeIcon icon={faClipboardList} />
									</div>
									<h5 className='sans-serif'>Tasks</h5>
									<h6 className='mb-2 card-count-display'>3</h6>
								</Card>
							</Col>
							<Col md={3}>
								<Card className='card completed-card p-3 mb-4'>
									<div className='icon mt-3 mb-3'>
										<FontAwesomeIcon icon={faCheckCircle} />
									</div>
									<h5 className='sans-serif'>Completed</h5>
									<h6 className='mb-2 card-count-display'>1</h6>
								</Card>
							</Col>
							<Col md={3}>
								<Card className='card employees-card p-3 mb-4'>
									<div className='icon mt-3 mb-3'>
										<FontAwesomeIcon icon={faClock} />
									</div>
									<h5 className='sans-serif'>In Progress</h5>
									<h6 className='mb-2 card-count-display'>1</h6>
								</Card>
							</Col>
							<Col md={3}>
								<Card className='card employees-card p-3 mb-4'>
									<div className='icon mt-3 mb-3'>
										<FontAwesomeIcon icon={faCircle} />
									</div>
									<h5 className='sans-serif'>Not Started</h5>
									<h6 className='mb-2 card-count-display'>1</h6>
								</Card>
							</Col>
						</Row>
					</Container>
				</Card.Body>
			</Card>
			<Tasks showCreateNewTaskButton={true} />
		</div>
	);
};
