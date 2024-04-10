import React from "react";
import {BooksList, IBook} from "../Book/BooksList.tsx";
//import BookcaseDeleteBook from "../BookcaseDeleteBook/BookcaseDeleteBook.tsx";

export interface IBookcase {
    id: number;
    title: string;
    user_id: number;
    books: IBook[];
}

export const Bookcase: React.FC<{ bookcase: IBookcase | null }> = ({ bookcase }) => {
    if (bookcase == null) {
        return
    }

    return (
        <div>
            <BooksList books={bookcase.books}/>
        </div>
    );
};
