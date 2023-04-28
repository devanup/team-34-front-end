import React from 'react';
import './navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faClipboardList,
	faGrip,
	faPeopleGroup,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
	const location = useLocation();

	return (
		<div className='navigation'>
			<Link
				className={`link ${location.pathname === '/' ? 'active-link' : ''}`}
				to='/team-34-front-end'
			>
				<FontAwesomeIcon icon={faGrip} className='nav-icon' />
				<span className='tool-tip'>Dashboard</span>
				{location.pathname === '/' && (
					<span className='active-indicator'></span>
				)}
			</Link>
			<Link
				className={`link ${
					location.pathname === '/tasks' ? 'active-link' : ''
				}`}
				to='/tasks'
			>
				<FontAwesomeIcon icon={faClipboardList} className='nav-icon' />
				<span className='tool-tip'>Tasks</span>
				{location.pathname === '/tasks' && (
					<span className='active-indicator'></span>
				)}
			</Link>
			<Link
				className={`link ${
					location.pathname === '/employees' ? 'active-link' : ''
				}`}
				to='/employees'
			>
				<FontAwesomeIcon icon={faPeopleGroup} className='nav-icon' />
				<span className='tool-tip'>Employees</span>
				{location.pathname === '/employees' && (
					<span className='active-indicator'></span>
				)}
			</Link>
		</div>
	);
}

export default Navigation;
