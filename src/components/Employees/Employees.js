import '../Tasks/tasks.css';
import { Row, Col, Card, Button, Table, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function Employees() {
	return (
		<Container fluid className='p-0'>
			<Row className='mb-5'>
				<Col>
					<Card className='table-card'>
						<Row>
							<Col xs={8}>
								<h2 className='sans-serif p-4 m-0'>Employees</h2>
							</Col>
							<Col>
								<Link to='/employees'>
									<Button variant='dark' className='btn'>
										View All Employees
									</Button>
								</Link>
							</Col>
						</Row>
					</Card>
					<Table borderless responsive>
						<thead className='sans-serif'>
							<tr>
								<th>Name</th>
								<th>Department</th>
								<th>Tasks Assigned</th>
								<th>Tasks Completed</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Jason Smith</td>
								<td className='department'>Marketing</td>
								<td className='task-assigned-count'>None</td>
								<td>2</td>
							</tr>
							<tr>
								<td>Kayla Davis</td>
								<td className='department'>Design</td>
								<td className='task-assigned-count'>1</td>
								<td>4</td>
							</tr>
							<tr>
								<td>Andre Chen</td>
								<td className='department'>Engineering</td>
								<td className='task-assigned-count'>2</td>
								<td>3</td>
							</tr>
						</tbody>
					</Table>
					{/* the div below was added to leave a space at the bottom of the in the Homepage */}
					<div className='mb-5'></div>{' '}
				</Col>
			</Row>
		</Container>
	);
}
export default Employees;
