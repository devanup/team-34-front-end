import { Card, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faClipboardList,
	faCheckCircle,
	faPeopleGroup,
	faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import Employees from '../components/Employees/Employees';
import { Helmet } from 'react-helmet';
import {
	fetchEmployees,
	fetchEmployeeById,
} from '../components/Employees/fetchEmployees';
// import {  } from '../components/Tasks/fetchTasks';
import { AddEmployee } from '../components/Employees/AddEmployeeForm';
import { useEffect, useState } from 'react';

export const EmployeesPage = () => {
	const [employees, setEmployees] = useState([]);
	const [employeeIds, setEmployeeIds] = useState([]);
	const [tasks, setTasks] = useState({});
	const nonEmptyTasks = Object.values(tasks).filter(
		(taskArr) => taskArr.length > 0,
	);
	const countNonEmptyTasks = nonEmptyTasks.length;

	useEffect(() => {
		// Fetch employees when the component mounts
		fetchEmployeeData();
	}, []);

	async function fetchEmployeeData() {
		const data = await fetchEmployees();
		setEmployees(data);

		const ids = employees.map((employee) => employee.id);
		setEmployeeIds(ids);

		const tasksByEmployee = {};
		for (const employeeId of ids) {
			const employee = await fetchEmployeeById(employeeId);
			tasksByEmployee[employeeId] = employee.Tasks;
		}
		setTasks(tasksByEmployee);
	}

	// console.log('employeeIds', employeeIds);
	// console.log('tasksByEmployees: ', tasks);
	return (
		<div>
			<Helmet>
				<title>Employees</title>
			</Helmet>
			<Card className='overview p-0 mb-4'>
				<Card.Body className='p-0'>
					<Container fluid className='p-0'>
						<Row>
							<Col md={8}>
								<h2 className='sans-serif mt-2 mb-5'>
									{/* <FontAwesomeIcon icon={faRectangleList} />*/} Employees
									Overview
								</h2>
							</Col>
							{/* <Col md>
								<div className='search-wrap'>
									<div className='search-icon-wrap'>
										<FontAwesomeIcon
											className='search-icon'
											icon={faMagnifyingGlass}
										/>
									</div>
									<input
										type='text'
										placeholder='Search employee'
										className='search-input'
									/>
								</div>
							</Col> */}
						</Row>
						<Row className='text-center'>
							<Col md>
								<Card className='card task-card p-3 mb-4'>
									<div className='icon mt-3 mb-3'>
										<FontAwesomeIcon icon={faClipboardList} />
									</div>
									<h5 className='sans-serif'>Employees</h5>
									<h6 className='mb-2 card-count-display'>
										{employees.length}
									</h6>
								</Card>
							</Col>
							<Col md>
								<Card className='card completed-card p-3 mb-4'>
									<div className='icon mt-3 mb-3'>
										<FontAwesomeIcon icon={faPeopleGroup} />
									</div>
									<h5 className='sans-serif'>Tasks Assigned</h5>
									<h6 className='mb-2 card-count-display'>
										{countNonEmptyTasks}
									</h6>
								</Card>
							</Col>
							<Col md>
								<Card className='card employees-card p-3 mb-4'>
									<div className='icon mt-3 mb-3'>
										<FontAwesomeIcon icon={faCheckCircle} />
									</div>
									<h5 className='sans-serif'>Tasks Completed</h5>
									<h6 className='mb-2 card-count-display'>
										{countNonEmptyTasks}
									</h6>
								</Card>
							</Col>
						</Row>
					</Container>
				</Card.Body>
			</Card>
			<Employees showAddEmployeeButton={true} />
		</div>
	);
};
