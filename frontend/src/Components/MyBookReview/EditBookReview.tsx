import React from "react";
import { useNavigate } from "react-router-dom";
import {IUserReview} from "./MyBookReview.tsx";

export const EditBookReview: React.FC<{ userReview: IUserReview | null }> = ({ userReview }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleEditReview = async () => {
        try {
            if(userReview == null) {
                return
            }
            
            const response = await fetch(`http://127.0.0.1:8000/api/reviews/${userReview.id}/`, {
                method: "PATCH",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    written_review: userReview.written_review,
                    star_rating: userReview.star_rating,
                }),
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || "Failed to create account");
            }
            navigate("/books", { replace: true });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return(
        <div>
            <button onClick={handleEditReview} className="btn btn-primary">Submit Edit</button>
        </div>
    );
};
