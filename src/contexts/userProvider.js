import React, {createContext, useState, useEffect} from 'react';

const context = createContext(null);

const UserProvider = ({children}) => {
	const [user, setUser] = useState({})
	useEffect(() => {
		fetch('/user')
		.then(res => res.json())
		.then(profile => setUser(profile))
		.catch(err => console.log(err))
		return () => {
			cleanup
		};
	}, [])

	return <context.Provider value={user}>
		{children}
	</context.Provider>
}

UserProvider.context = context;

export default UserProvider;

