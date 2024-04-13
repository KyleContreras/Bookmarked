import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {IBookcase} from "./Bookcase.tsx";

interface ICreateBookcase {
    user_id: string;
    token: string;
    onBookcaseCreated: (newBookcaseData: IBookcase) => void;
}

const CreateBookcase = ({user_id, token, onBookcaseCreated}: ICreateBookcase) => {
    const navigate = useNavigate();
    const [bookcaseName, setBookcaseName] = useState('');

    const handleCreate = async (e) => {
        e.preventDefault();

        const url = `http://127.0.0.1:8000/api/bookcase/`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user_id,
                    title: bookcaseName
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to create/update bookcase');
            }
            console.log('Bookcase successfully created/updated!');
            onBookcaseCreated(data);
            navigate("/books", { replace: true });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container-fluid d-flex flex-column align-items-center">
            <form onSubmit={handleCreate} className="mb-2">
                <div className="mb-2">
                    <label htmlFor="profileSocials" className="form-label">
                        Bookcase:
                        <input
                            type="text"
                            placeholder="Bookcase Title"
                            value={bookcaseName}
                            onChange={(e) => setBookcaseName(e.target.value)}
                            className="form-control"
                        />
                    </label>
                </div>
                <button type="submit">Create Bookcase</button>
            </form>
        </div>

    );
}

export default CreateBookcase;
