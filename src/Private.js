/*
import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from './context/authContext';

const PrivateRoutes = () => {
    const { loggedIn } = useContext(AuthContext);

    return(
        loggedIn ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes
*/