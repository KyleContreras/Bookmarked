import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {IProfile} from "./Profile.tsx";

interface IDeleteProfile {
    profile: IProfile;
    token: string;
    onProfileDeleted: () => void;
}

const DeleteProfileButton = ({profile, token, onProfileDeleted}: IDeleteProfile) => {
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/userprofile/${profile.id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete profile');
            }
            setStatus('Your profile has been successfully deleted.');
            onProfileDeleted();
            navigate("/myprofile", { replace: true });
        } catch (error: any) {
            setStatus(error.message);
        }
    };

    return (
        <div className="container-fluid d-flex flex-column align-items-center">
            {status ? (
                <p>{status}</p>
            ) : (
                <button className="btn-secondary" onClick={handleDelete}>Delete Profile</button>
            )}
        </div>
    );
};

export default DeleteProfileButton;
