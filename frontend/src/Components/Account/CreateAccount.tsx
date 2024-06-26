import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
    const [showForm, setShowForm] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://3.143.218.54:8000/api/user/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email,
                }),
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to create account');
            }
            const { token } = responseData;
            localStorage.setItem('token', token);

            const { id } = responseData.user;
            localStorage.setItem('user_id', id);

            navigate('/books');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container-fluid d-flex flex-column align-items-center">
            <button onClick={() => setShowForm(!showForm)} className="btn btn-primary mb-2">
                {showForm ? 'Cancel' : 'Create Account'}
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
                    <div className="mb-2">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

export default CreateAccount;
