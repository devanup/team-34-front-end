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
				to='/'
			>
				<FontAwesomeIcon icon={faGrip} className='nav-icon' />
				<span className='tool-tip'>Dashboard</span>
				{location.pathname === '/' && (
					<span className='active-indicator'></span>
				)}
			</Link>
			<Link
				className={`link ${
					location.pathname.startsWith('/tasks') ? 'active-link' : ''
				}`}
				to='/tasks'
			>
				<FontAwesomeIcon icon={faClipboardList} className='nav-icon' />
				<span className='tool-tip'>Tasks</span>
				{location.pathname.startsWith('/tasks') && (
					<span className='active-indicator'></span>
				)}
			</Link>
			<Link
				className={`link ${
					location.pathname.startsWith('/employee') ? 'active-link' : ''
				}`}
				to='/employees'
			>
				<FontAwesomeIcon icon={faPeopleGroup} className='nav-icon' />
				<span className='tool-tip'>Employees</span>
				{location.pathname.startsWith('/employee') && (
					<span className='active-indicator'></span>
				)}
			</Link>
		</div>
	);
}

export default Navigation;
