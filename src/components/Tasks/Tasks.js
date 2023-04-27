import './tasks.css';
import { Row, Col, Card, Button, Table, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircle,
	faClock,
	faCheckCircle,
} from '@fortawesome/free-regular-svg-icons';

function Tasks() {
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
								<Button variant='dark' className='btn'>
									View All Tasks
								</Button>
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
							<tr>
								<td>Develop a marketing strategy for product launch</td>
								<td className='priority'>
									<span className='priority-dot priority-dot-med'></span>
									<span className='priority-med'>Medium</span>
								</td>
								<td className='td-status td-not-started'>
									<span className='status-label status-label-not-started'>
										<FontAwesomeIcon icon={faCircle} /> Not Started
									</span>
								</td>
								<td>Mark Davidson</td>
							</tr>
							<tr>
								<td>Redesign mobile app</td>
								<td className='priority'>
									<span className='priority-dot priority-dot-low'></span>
									<span className='priority-low'>Low</span>
								</td>
								<td className='td-status td-in-progress'>
									<span className='status-label status-label-in-progress'>
										<FontAwesomeIcon icon={faClock} /> In Progress
									</span>
								</td>
								<td>Laura Huff</td>
							</tr>
							<tr>
								<td>Develop prototype software for MVP</td>
								<td className='priority'>
									<span className='priority-dot priority-dot-high'></span>
									<span className='priority-high'>High</span>
								</td>
								<td className='td-status td-completed'>
									<span className='status-label status-label-completed'>
										<FontAwesomeIcon icon={faCheckCircle} /> Completed
									</span>
								</td>
								<td>Christian Wu</td>
							</tr>
						</tbody>
					</Table>
				</Col>
			</Row>
		</Container>
	);
}
export default Tasks;
