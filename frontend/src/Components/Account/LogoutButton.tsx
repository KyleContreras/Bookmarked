import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found in local storage.');
            return;
        }

        try {
            const response = await fetch('http://3.143.218.54:8000/api/user/logout/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                }
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'LogoutButton failed.');
            }

            localStorage.removeItem('user_id');
            localStorage.removeItem('token');
            localStorage.removeItem('bookcase_id');
            console.log(`User successfully logged out.`);

            navigate('/books');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container-fluid d-flex flex-column align-items-center">
            <button onClick={handleLogout} className="btn btn-danger mb-2">Logout</button>
        </div>
    );
};

export default LogoutButton;
