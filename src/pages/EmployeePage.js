import './TaskPage.css';
import { Card, Button, Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export const EmployeePage = () => {
	const { state } = useLocation();
	const employee = state?.employee;
	const employeeName = employee.firstName + ' ' + employee.lastName;
	const [editEnable, setEditEnable] = useState(false);

	const handleEdit = () => {
		setEditEnable(true);
		if (editEnable) setEditEnable(!true);
	};
	return (
		<div>
			<Card className='card-wrap p-5'>
				{/* <div className='empty-state'>
					<h3>Employee not found</h3>
				</div> */}
				<Container fluid className='p-0'>
					<Row>
						<Col lg={9}>
							<h2 className='sans-serif mt-2 mb-5'>Employee Detail</h2>
						</Col>
						<Col md={3} className='mb-3'>
							<div className='edit-btn'>
								{!editEnable && (
									<Button variant='outline-secondary' onClick={handleEdit}>
										<FontAwesomeIcon icon={faPen} />
									</Button>
								)}
								{editEnable && (
									<Button variant='secondary' onClick={handleEdit}>
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
									value={employeeName}
									autoFocus
								/>
							)}
							{!editEnable && (
								<div className='mb-3 name-description'>
									<h4 className='m-0 p-0'>{employeeName}</h4>
								</div>
							)}
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
								{!editEnable && <span className=''>{employee.department}</span>}
								{editEnable && (
									<span>
										<input type='text' value={employee.department} />
									</span>
								)}
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
								{/* {editEnable && (
									<span>
										<input type='text' value={employee.taskAssigned} />
									</span>
								)} */}
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
								{/* {editEnable && (
									<span>
										<input type='text' value={employee.taskCompleted} />
									</span>
								)} */}
							</div>
						</Col>
					</Row>
				</Container>
			</Card>
		</div>
	);
};
