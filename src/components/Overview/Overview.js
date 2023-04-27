import './overview.css';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faClipboardList,
	faClipboardCheck,
	faPeopleGroup,
} from '@fortawesome/free-solid-svg-icons';

function Overview() {
	return (
		<Card className='overview p-0 mb-5'>
			<Card.Body className='p-0'>
				<h2 className='sans-serif mt-2 mb-5'>Dashboard</h2>
				<Container fluid className='p-0'>
					<Row className='text-center'>
						<Col md>
							<Card className='card task-card p-3 mb-4'>
								<div className='icon mt-3 mb-3'>
									<FontAwesomeIcon icon={faClipboardList} />
								</div>
								<h5 className='sans-serif'>Tasks</h5>
								<h6 className='mb-2 card-count-display'>48</h6>
							</Card>
						</Col>
						<Col md>
							<Card className='card completed-card p-3 mb-4'>
								<div className='icon mt-3 mb-3'>
									<FontAwesomeIcon icon={faClipboardCheck} />
								</div>
								<h5 className='sans-serif'>Completed</h5>
								<h6 className='mb-2 card-count-display'>48</h6>
							</Card>
						</Col>
						<Col md>
							<Card className='card employees-card p-3 mb-4'>
								<div className='icon mt-3 mb-3'>
									<FontAwesomeIcon icon={faPeopleGroup} />
								</div>
								<h5 className='sans-serif'>Employees</h5>
								<h6 className='mb-2 card-count-display'>48</h6>
							</Card>
						</Col>
					</Row>
				</Container>
			</Card.Body>
		</Card>
	);
}

export default Overview;
