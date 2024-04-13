import React from "react";
import {useNavigate} from "react-router-dom";
import {IUserReview} from "./MyBookReview.tsx";

export const DeleteBookReview: React.FC<{ userReview: IUserReview | null }> = ({ userReview }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleDeleteReview = async () => {
        try {
            if(userReview == null) {
                return
            }

            const response = await fetch(`http://127.0.0.1:8000/api/reviews/${userReview.id}/`, {
                method: "DELETE",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                }
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || "Failed to delete review");
            }
            navigate("/books", { replace: true });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return(
        <div>
            <button onClick={handleDeleteReview} className="btn-secondary">Delete Review</button>
        </div>
    );
};
