import '../Tasks/tasks.css';
import { Row, Col, Card, Button, Table, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { AddEmployee } from './AddEmployeeForm';

function Employees({ showAddEmployeeButton }) {
	const [employees, setEmployees] = useState([
		{
			firstName: 'Jason',
			lastName: 'Smith',
			department: 'Marketing',
			taskAssigned: 'None',
			taskCompleted: '2',
		},
		{
			firstName: 'Kayla',
			lastName: 'Davis',
			department: 'Design',
			taskAssigned: '1',
			taskCompleted: '4',
		},
		{
			firstName: 'Andrew',
			lastName: 'Chen',
			department: 'Engineering',
			taskAssigned: '2',
			taskCompleted: '3',
		},
	]);

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
				<Col className=''>
					<Card className='table-card'>
						<Row>
							<Col xs={8}>
								<h2 className='sans-serif p-4 m-0'>Employees</h2>
							</Col>
							<Col>
								{showAddEmployeeButton && (
									<Link to=''>
										<Button
											variant='dark'
											className='btn'
											onClick={handleShowFormBtn}
										>
											<FontAwesomeIcon icon={faPlus} className='create-icon' />
											Add New Employee
										</Button>
									</Link>
								)}
								{!showAddEmployeeButton && (
									<Link to='/employees'>
										<Button variant='dark' className='btn'>
											View All Employees
										</Button>
									</Link>
								)}
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
							{employees.length === 0 ? (
								<tr>
									<td colSpan='4'>
										<div className='empty-state'>
											<div className='mt-4 mb-4 empty-state-icon-wrap add-people-icon'></div>
											<h3>You're all by yourself</h3>
											<p>Add a new employee to get things moving</p>
										</div>
									</td>
								</tr>
							) : (
								employees.map((employee, index) => (
									<tr key={index}>
										<td>{`${employee.firstName} ${employee.lastName}`}</td>
										<td className='department'>{employee.department}</td>
										<td className='task-assigned-count'>
											{employee.taskAssigned}
										</td>
										<td>{employee.taskCompleted}</td>
									</tr>
								))
							)}
						</tbody>
					</Table>
					{/* the div below was added to leave a space at the bottom of the in the Homepage */}
					<div className='mb-5'></div>{' '}
				</Col>
			</Row>
			{displayForm && (
				<AddEmployee
					displayForm={displayForm}
					handleCloseFormBtn={handleCloseFormBtn}
				/>
			)}
		</Container>
	);
}

export default Employees;