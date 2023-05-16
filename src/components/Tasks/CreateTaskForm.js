import './CreateTaskForm.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { createTask } from './createTask';

export const CreateTaskForm = ({ handleCloseFormBtn, tasks, updateTasks }) => {
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
		const taskData = Object.fromEntries(formData.entries());

		const newTask = await createTask(taskData);

		if (newTask) {
			// console.log('New task added:', newTask);
			setFormSuccess(true);
			const updatedTasks = [...tasks, newTask];
			updateTasks(updatedTasks);
			handleShowFormBtn();
			handleCloseFormBtn();
		} else {
			console.error('Failed to add task');
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
				<div className='form-wrap create-task-form-wrap'>
					<form onSubmit={handleSubmit}>
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
										name='description'
										placeholder='What needs to be done?'
										className='form-input description'
										required
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
											required
										>
											<option value='' defaultValue disabled>
												Select Priority
											</option>
											<option value='low'>Low</option>
											<option value='medium'>Medium</option>
											<option value='high'>High</option>
										</select>
									</div>
								</Col>
								<Col sm={6}>
									<div className='form-group'>
										<label className='mt-4 mb-1'>
											<h5>Completion Status</h5>
										</label>
										<select
											id='status'
											name='status'
											className='form-input select'
											required
										>
											<option value='' defaultValue disabled>
												Select Status
											</option>
											<option value='not started'>Not-started</option>
											{/* <option value='In-progress'>In-progress</option> */}
											<option value='completed'>Completed</option>
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

									<div className='assignees text-center mt-4 mb-2'>
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
									</div>
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
									<Button
										variant='primary'
										className='btn btn-submit p-3'
										type='submit'
									>
										Create Task
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
