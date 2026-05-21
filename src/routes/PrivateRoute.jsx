
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth();

    if (loading) {
        return <div className="flex items-center justify-center py-10">
            <div className="w-10 h-10 border-4 border-base-300 border-t-primary rounded-full animate-spin"></div>
        </div>
    }

    if(!user){
        return <Navigate to = '/login'></Navigate>
    }

    return children
};

export default PrivateRoute;