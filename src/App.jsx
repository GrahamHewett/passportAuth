import React from 'react';
import {Router, Route} from 'react-router-dom';
import history from './history';
import Home from './pages/home';
import Profile from './pages/profile';
import UserProvider from './contexts/userProvider';
// import MenuBar from './components/Menu';

const App = () => {
    return <Router history={history}>
        <UserProvider>
            {/* <Route path='/' component={MenuBar}></Route> */}
            <Route path='/profile' component={Profile}></Route>
        </UserProvider>
        <Route exact path='/' component={Home}></Route>
    </Router >
};

export default App;
