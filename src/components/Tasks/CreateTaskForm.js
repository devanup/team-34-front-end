import './CreateTaskForm.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export const CreateTaskForm = ({ handleCloseFormBtn }) => {
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

	return (
		<div className='form-flex-wrap'>
			<div className='form-overlay' onClick={handleCancelBtn}></div>
			<div className='form-wrap create-task-form-wrap'>
				{/* <div className='close-menu-icon'>
					<FontAwesomeIcon icon={faXmark} onClick={handleCancelBtn} />
				</div> */}
				<h1 className='mb-4 p-0'>Create New Task</h1>
				<Container fluid className='p-0'>
					<Row>
						<label className='mt-4 mb-1'>
							<h5>Description</h5>
						</label>
						<Col lg={12}>
							<input
								type='text'
								id='description'
								placeholder='What needs to be done?'
								className='form-input description'
							/>
						</Col>

						<Col sm={6}>
							<div className='form-group'>
								<label className='mt-4 mb-1'>
									<h5>Priority</h5>
								</label>
								<select
									id='priority'
									name='priority'
									className='form-input select'
								>
									<option value='Low'>Low</option>
									<option value='Medium'>Medium</option>
									<option value='High'>High</option>
								</select>
							</div>
						</Col>
						<Col sm={6}>
							<div className='form-group'>
								<label className='mt-4 mb-1'>
									<h5>Completion Status</h5>
								</label>
								<select id='status' name='status' className='form-input select'>
									<option value='Not-started'>Not-started</option>
									{/* <option value='In-progress'>In-progress</option> */}
									<option value='Completed'>Completed</option>
								</select>
							</div>
						</Col>
						<label className='mt-4 mb-1'>
							<h5>Assignee</h5>
						</label>
						<Col lg={12}>
							<input
								type='text'
								id='asignee'
								placeholder='Invite team member'
								className='form-input description'
							/>

							{/* <div className='name-suggestion'>
								<ul className='m-0 p-0'>
									<li className=' mt-1 mb-1 name-list'>Jason Smith</li>
									<li className=' mt-1 mb-1 name-list'>Kayla Davis</li>
									<li className=' mt-1 mb-1 name-list'>Andrew Chen</li>
								</ul>
							</div> */}

							{/* <div className='assignees text-center mt-4 mb-2'>
								<ul className='m-0 p-0'>
									<li className='assignee-list'>
										Jason Smith{' '}
										<FontAwesomeIcon
											icon={faXmark}
											className='assignee-list-cross'
										/>
									</li>
									<li className='assignee-list'>
										Kayla Davis{' '}
										<FontAwesomeIcon
											icon={faXmark}
											className='assignee-list-cross'
										/>
									</li>
									<li className='assignee-list'>
										Andre Chen{' '}
										<FontAwesomeIcon
											icon={faXmark}
											className='assignee-list-cross'
										/>
									</li>
									<li className='assignee-list'>
										Andre Chen{' '}
										<FontAwesomeIcon
											icon={faXmark}
											className='assignee-list-cross'
										/>
									</li>
									<li className='assignee-list'>
										Andre Chen{' '}
										<FontAwesomeIcon
											icon={faXmark}
											className='assignee-list-cross'
										/>
									</li>
								</ul>
							</div> */}
						</Col>
						<Col style={{ textAlign: 'right' }} className='mt-5 '>
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
							<Button variant='primary' className='btn btn-submit p-3'>
								Create Task
							</Button>
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	);
};
