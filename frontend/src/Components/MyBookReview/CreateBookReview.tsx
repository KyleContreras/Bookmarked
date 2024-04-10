import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {IUserReview} from "./MyBookReview.tsx";

export const CreateBookReview: React.FC<{ userReview: IUserReview | null }> = ({ userReview }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [error, setError] = useState<string | null>(null);

    const handleCreateReview = async () => {
        try {
            if(userReview == null) {
                return
            }

            const response = await fetch(`http://127.0.0.1:8000/api/reviews/`, {
                method: "POST",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: userReview.user,
                    book: userReview.book,
                    written_review: userReview.written_review,
                    star_rating: userReview.star_rating,
                }),
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || "Failed to create review");
            }
            navigate("/books", { replace: true });
        } catch (errorMsg) {
            setError(errorMsg.message);
        }
    };

    return(
        <div>
            <button onClick={handleCreateReview} className="btn btn-primary">Submit New Review</button>
        </div>
    );
};
