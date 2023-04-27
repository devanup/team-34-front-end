import React from 'react';
import './navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faClipboardList,
	faGrip,
	faPeopleGroup,
} from '@fortawesome/free-solid-svg-icons';
function Navigation() {
	return (
		<div className='navigation'>
			<a href='#' className='active-link'>
				<FontAwesomeIcon icon={faGrip} className='nav-icon' />
				<span className='tool-tip'>Dashboard</span>
				<span className='active-indicator'></span>
			</a>
			<a href='#'>
				<FontAwesomeIcon icon={faClipboardList} className='nav-icon' />
				<span className='tool-tip'>Tasks</span>
			</a>
			<a href='#'>
				<FontAwesomeIcon icon={faPeopleGroup} className='nav-icon' />
				<span className='tool-tip'>Employees</span>
			</a>
		</div>
	);
}

export default Navigation;
