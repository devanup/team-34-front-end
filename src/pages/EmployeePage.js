import './TaskPage.css';
import { Card, Button, Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

export const EmployeePage = () => {
	const { state } = useLocation();
	const employee = state?.employee;
	const employeeName = employee.firstName + ' ' + employee.lastName;
	return (
		<div>
			<Card className='card-wrap p-5'>
				<div className='empty-state'>
					<h3>Employee not found</h3>
				</div>
				<Container fluid className='p-0'>
					<Row>
						<Col lg={9}>
							<h2 className='sans-serif mt-2 mb-5'>Employee Detail</h2>
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
								value={employeeName}
								autoFocus
							/>
							<div className='mb-3 name-description'>
								<h4 className='m-0 p-0'>{employeeName}</h4>
							</div>
						</Col>
					</Row>

					<Row style={{ textTransform: 'capitalize' }}>
						<Col lg={12} className='mb-4'>
							<hr />
						</Col>

						<Col md={3} className='mb-4'>
							<div className='properties property-title'>Department</div>
						</Col>
						<Col md={9} className='mb-4'>
							<div className='properties'>
								<span className=''>{employee.department}</span>
							</div>
						</Col>

						<Col md={3} className='mb-4'>
							<div className='properties property-title'>
								{employee.taskAssigned > 1 ? 'Tasks' : 'Task'} Assigned
							</div>
						</Col>
						<Col md={9} className='mb-4'>
							<div className='properties'>
								<span className=''>{employee.taskAssigned}</span>
							</div>
						</Col>

						<Col md={3} className='mb-4'>
							<div className='properties property-title'>
								{employee.taskAssigned > 1 ? 'Tasks' : 'Task'} Completed
							</div>
						</Col>
						<Col md={9} className='mb-4'>
							<div className='properties'>
								<span className=''>{employee.taskCompleted}</span>
							</div>
						</Col>
					</Row>
				</Container>
			</Card>
		</div>
	);
};
