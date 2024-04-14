import {useEffect, useState} from "react";
import {CreateBookReview} from "./CreateBookReview.tsx";
import {DeleteBookReview} from "./DeleteBookReview.tsx";
import {EditBookReview} from "./EditBookReview.tsx";
//import { useNavigate } from "react-router-dom";

export interface IUserReview {
    id: number,
    book: number,
    user: number,
    written_review: string,
    star_rating: string
}

interface IBookId {
    bookId: number;
}

export const MyBookReview = ({bookId}: IBookId) => {
    //const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id') || '0';

    const [userReview, setUserReview] = useState<IUserReview>({id: 0, book: bookId, user: parseInt(userId), written_review: '', star_rating: ''});

    useEffect(() => {
        fetchBookReview()
    },[]);

    const fetchBookReview = async () => {
        try {
            const response = await fetch(`http://3.143.218.54:8000/api/reviews/my_book_review?user_id=${userId}&book_id=${bookId}`, {
                method: "GET",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || "Failed to get review");
            }

            setUserReview(responseData);
            //navigate("/myprofile", { replace: true });
            console.log(userReview);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h3>My Review:</h3>
            <div className="container-fluid d-flex flex-column align-items-center" id="reviewContainer">
                <form className="mb-2">
                    <div className="mb-2">
                        <label htmlFor="writtenReview" className="form-label">
                            Written Review:
                            <input
                                type="text"
                                id="writtenReview"
                                value={userReview.written_review}
                                 onChange={(e) => {setUserReview({...userReview, written_review:e.target.value} as IUserReview)}}
                                className="form-control"
                            />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="starRating" className="form-label">
                            Star Rating:
                            <input
                                type="string"
                                id="starRating"
                                value={userReview.star_rating}
                                onChange={(e) => {setUserReview({...userReview, star_rating:e.target.value} as IUserReview)}}
                                className="form-control"
                            />
                        </label>
                    </div>
                </form>
            </div>

            {userReview.id == 0?
                (<CreateBookReview userReview={userReview} />
            ) : (
                <div>
                    <EditBookReview userReview= {userReview} />

                    <DeleteBookReview userReview={userReview} />
                </div>
            )}
        </div>
    );
}
