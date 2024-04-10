import React, {useState} from "react";
import BookcaseAddBook from "../BooksInBookcase/BookcaseAddBook.tsx";
import BookcaseDeleteBook from "../BooksInBookcase/BookcaseDeleteBook.tsx";
import {MyBookReview} from "../MyBookReview/MyBookReview.tsx";

export interface IBook {
    id: number;
    title: string;
    author: string;
    publication_date: string;
    isbn: string;
    genre: string;
    synopsis: string;
    cover_image_url: string;
    price: string;
    page_count: number;
    reviews: IBookReviews[];
}

export interface IBookReviews {
    book: number;
    user: number;
    written_review: string;
    star_rating: string;
}

export interface IBookProps {
    books: IBook[];
}

export const Book: React.FC<{ book: IBook }> = ({ book }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const [showMyReview, setShowMyReview] = useState(false);

    return (
        <div className="card">
            <div className="row">
                <img src={book.cover_image_url} className="img-fluid" alt={book.title}/>
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <button className="book-icon" onClick={() => BookcaseAddBook(book.id)}>
                            <i className="bi bi-bookmark-plus-fill me-3"></i>
                        </button>
                        <button className="book-icon" onClick={() => {setShowMyReview(!showMyReview)}}>
                            <i className="bi bi-pencil-square"></i>
                        </button>
                        <button className="book-icon" onClick={() => BookcaseDeleteBook(book.id)}>
                            <i className="bi bi-trash-fill"></i>
                        </button>
                    </div>
                    {showMyReview && <MyBookReview bookId={book.id}/>}
                    <div>
                        <button className="btn-primary" type="button"
                                onClick={() => setShowDetails(!showDetails)}>
                            {showDetails ? "Hide Book Details" : "Show Book Details"}
                        </button>
                    </div>
                    <div className={`collapse ${showDetails ? 'show' : ''}`}>
                        <h6 className="card-title">{book.title}</h6>
                        <p className="card-text">Book Id: {book.id}</p>
                        <p className="card-text">Author: {book.author}</p>
                        <p className="card-text">Genre: {book.genre}</p>
                        <p className="card-text">Synopsis: {book.synopsis}</p>
                        <p className="card-text">Price: {book.price}</p>
                        <p className="card-text">Page Count: {book.page_count}</p>
                        <p className="card-text">Publication Date: {book.publication_date}</p>
                        <p className="card-text">ISBN: {book.isbn}</p>
                    </div>
                    <div>
                        <button className="btn-primary" type="button"
                                onClick={() => setShowReviews(!showReviews)}>
                            {showReviews ? "Hide Book Reviews" : "Show Book Reviews"}
                        </button>
                    </div>
                    <div className={`collapse ${showReviews ? 'show' : ''}`}>
                        <h6>Reviews:</h6>
                        {book.reviews.map((review, index) => (
                            <div key={index} className="mb-3">
                                <p>User: {review.user}</p>
                                <p>Written Review: {review.written_review}</p>
                                <p>Star Rating: {review.star_rating}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


export function BooksList({books}: IBookProps) {

    return (
        <div className="container-fluid">
            {books.map((book:IBook) => <Book book={book} key={book.id}/>)}
        </div>
    );
}
