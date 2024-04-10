import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [showForm, setShowForm] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/user/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to login');
            }

            const { token } = responseData;
            localStorage.setItem('token', token);
            const { id } = responseData.user;
            localStorage.setItem('user_id', id);

            navigate('/mybookcase', { replace: true });
        } catch (errorMsg: any) {
            setError(errorMsg.message);
            alert('Failed to login.');
        }
    };

    return (
        <div className="container-fluid d-flex flex-column align-items-center">
            <button onClick={() => setShowForm(!showForm)} className="btn btn-primary mb-2">
                {showForm ? 'Cancel' : 'Login'}
            </button>
            {showForm && (
                <form onSubmit={handleSubmit} className="mb-2">
                    <div className="mb-2">
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            )}
        </div>
    );
};

export default Login;
