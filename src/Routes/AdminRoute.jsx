import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProviders';
import axios from 'axios';
import Loader from '../Pages/Shared/Loader';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(null); // Initialize to null
    const location = useLocation();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUserResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/current-user/${user.email}`);
                setIsAdmin(currentUserResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (user) {
            fetchUserData();
        }
    }, [user]);

    if (loading) {
        return <Loader />;
    }

    if (isAdmin === null) {
        return <Loader />;
    }

    if (user && isAdmin.role === 'admin') {
        return children;
    }

    return <Navigate to='/log-in' state={{ from: location }} replace />;
};

export default AdminRoute;
