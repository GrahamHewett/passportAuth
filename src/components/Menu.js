import React, {useContext} from 'react';
import UserProvider from '../contexts/userProvider';
import { data } from '../data/index'
import {Link} from 'react-router-dom';

export default function Menu() {
	const userData = useContext(UserProvider.context);
	const loginType = Object.values(userData).length ? 
		data.find(provider => provider.name === userData.provider) : {};
	return (
		<div className='menu-bar' style ={{display: 'flex'}}>
			<Link to='/'>&#9776;</Link>
			{!!Object.values(userData).length && <div >
				<p>Logged in with {loginType.name}</p>
				<button>Logout</button>
			</div>
			}
		</div>
	)
}
