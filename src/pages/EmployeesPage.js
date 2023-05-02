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
import { AddEmployee } from '../components/Employees/AddEmployeeForm';
export const EmployeesPage = () => {
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
							<Col md>
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
							</Col>
						</Row>
						<Row className='text-center'>
							<Col md>
								<Card className='card task-card p-3 mb-4'>
									<div className='icon mt-3 mb-3'>
										<FontAwesomeIcon icon={faClipboardList} />
									</div>
									<h5 className='sans-serif'>Employees</h5>
									<h6 className='mb-2 card-count-display'>3</h6>
								</Card>
							</Col>
							<Col md>
								<Card className='card completed-card p-3 mb-4'>
									<div className='icon mt-3 mb-3'>
										<FontAwesomeIcon icon={faPeopleGroup} />
									</div>
									<h5 className='sans-serif'>Tasks Assigned</h5>
									<h6 className='mb-2 card-count-display'>3</h6>
								</Card>
							</Col>
							<Col md>
								<Card className='card employees-card p-3 mb-4'>
									<div className='icon mt-3 mb-3'>
										<FontAwesomeIcon icon={faCheckCircle} />
									</div>
									<h5 className='sans-serif'>Tasks Completed</h5>
									<h6 className='mb-2 card-count-display'>9</h6>
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
