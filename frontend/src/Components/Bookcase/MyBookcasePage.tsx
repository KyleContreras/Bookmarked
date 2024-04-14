import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import {Bookcase, IBookcase} from "./Bookcase.tsx";
import CreateBookcase from "./CreateBookcase.tsx";
import DeleteBookcase from "./DeleteBookcase.tsx";

const MyBookcasePage = () => {
    const navigate = useNavigate();
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem('token');
    const [bookcase, setBookcase] = useState<IBookcase | null>(null);

    useEffect(() => {
        fetchBookcase();
    }, []);

    const fetchBookcase = async () => {
        try {
            const url = `http://3.143.218.54:8000/api/bookcase/my_bookcase`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch bookcase data');
            }
            const responseData = await response.json();
            setBookcase(responseData);
            localStorage.setItem('bookcase_id', responseData.id);
        } catch (error) {
            console.error(error);
        }
    };

    function handleToggleProfile() {
        navigate("/myprofile", { replace: true });
    }

    const handleBookcaseCreated = (newBookcaseData: IBookcase) => {
        setBookcase(newBookcaseData);
    };

    const handleBookcaseDeleted = () => {
        setBookcase(null);
    }

    return (
        <div className="container-fluid d-flex flex-column align-items-center">
            <h2>My Profile</h2>
            <div>
                {!bookcase ? (
                    <CreateBookcase user_id={user_id as string} token={token as string} onBookcaseCreated={handleBookcaseCreated} />
                ) : (
                    <div className="card-body">
                        <h2>My Bookcase</h2>
                        <Bookcase bookcase={bookcase}/>
                        <DeleteBookcase bookcase={bookcase} token={token as string} onBookcaseDeleted={handleBookcaseDeleted}/>
                    </div>
                )}
                <button className="btn-primary" onClick={handleToggleProfile}>My Profile</button>
            </div>
        </div>
    );
};

export default MyBookcasePage;
