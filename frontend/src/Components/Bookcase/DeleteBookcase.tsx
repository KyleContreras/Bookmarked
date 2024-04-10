import { useState } from 'react';
import { useNavigate } from "react-router-dom";
//import {IProfile} from "../Profile/Profile.tsx";
import {IBookcase} from "./Bookcase.tsx";

interface IDeleteBookcase {
    bookcase: IBookcase;
    token: string;
    onBookcaseDeleted: () => void;
}

const DeleteBookcase = ({ bookcase, token, onBookcaseDeleted }: IDeleteBookcase) => {
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/bookcase/${bookcase.id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete bookcase');
            }
            onBookcaseDeleted();
            localStorage.removeItem('bookcase_id');
            setStatus('Your bookcase has been successfully deleted.');
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
                <button className="btn-secondary" onClick={handleDelete}>Delete Bookcase</button>
            )}
        </div>
    );
}

export default DeleteBookcase;
