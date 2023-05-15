import './AddEmployeeForm.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { createEmployee } from './createEmployee';

export const AddEmployee = ({
	handleCloseFormBtn,
	employees,
	updateEmployees,
}) => {
	const [formSuccess, setFormSuccess] = useState(false);
	const handleCancelBtn = () => {
		handleCloseFormBtn();
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Escape') {
			handleCancelBtn();
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const employeeData = Object.fromEntries(formData.entries());

		const newEmployee = await createEmployee(employeeData);

		if (newEmployee) {
			console.log('New employee added:', newEmployee);
			setFormSuccess(true);
			const updatedEmployees = [...employees, newEmployee];
			updateEmployees(updatedEmployees);
			handleShowFormBtn();
			handleCloseFormBtn();
		} else {
			console.error('Failed to add employee');
		}
	};

	const handleShowFormBtn = () => {
		setFormSuccess(false);
	};

	return (
		<div className='form-flex-wrap'>
			{!formSuccess && (
				<div className='form-overlay' onClick={handleCancelBtn}></div>
			)}
			{!formSuccess && (
				<div className='form-wrap add-employee-form-wrap'>
					<form onSubmit={handleSubmit}>
						<h1 className='mb-4 p-0'>Add Employee</h1>
						<Container fluid className='p-0'>
							<Row>
								<label className='mt-4 mb-1'>
									<h5>Full Name</h5>
								</label>
								<Col>
									<input
										type='text'
										id='firstName'
										name='Fname'
										placeholder='First Name'
										className='form-input firstName'
										required
									/>
								</Col>
								<Col>
									<input
										type='text'
										id='lastName'
										name='Lname'
										placeholder='Last Name'
										className='form-input lastName'
										required
									/>
								</Col>
								<Col sm={12}>
									<div className='form-group'>
										<label className='mt-4 mb-1'>
											<h5>Department</h5>
										</label>
										<select
											id='department'
											name='department'
											className='form-input select'
											required
										>
											<option value='' defaultValue>
												Select a Department
											</option>
											<option value='Marketing &amp; Sales'>
												Marketing &amp; Sales
											</option>
											<option value='Design'>Design</option>
											<option value='Engineering'>Engineering</option>
											<option value='Finance'>Finance</option>
											<option value='Legal'>Legal</option>
											<option value='HR'>HR</option>
										</select>
									</div>
								</Col>
								<Col className='mt-5' style={{ textAlign: 'right' }}>
									<Button
										variant='light'
										style={{
											backgroundColor: 'transparent',
											borderColor: 'rgba(220, 220, 220, .5)',
											color: 'inherit',
											marginRight: '15px',
										}}
										className='btn-cancel p-3'
										onClick={handleCancelBtn}
									>
										Cancel
									</Button>
									<Button
										variant='primary'
										className='btn btn-submit p-3'
										type='submit'
									>
										Add Employee
									</Button>
								</Col>
							</Row>
						</Container>
					</form>
				</div>
			)}
		</div>
	);
};
