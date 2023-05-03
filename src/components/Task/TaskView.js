import { Row, Col, Card, Button, Table, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircle,
	faClock,
	faCheckCircle,
} from '@fortawesome/free-regular-svg-icons';
import { faPlus, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import './TaskView.css';
export const TaskView = ({ task }) => {
	return (
		<div className='task-view-wrap'>
			<h3>{task?.description}</h3>
			<h3>{task?.priority}</h3>
			<h3>{task?.status}</h3>
			<h3>{task?.assignee}</h3>
			<p>{task?.id}</p>
		</div>
	);
};
