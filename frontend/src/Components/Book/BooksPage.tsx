import {useEffect, useState} from "react";
import {BooksList, IBook} from "./BooksList.tsx";
import {useSearch} from "../../contexts/SearchContext.tsx";


const BooksPage = () => {
    //const [books, setBooks] = useState([] || {});
    const [books, setBooks] = useState<IBook[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { searchQuery } = useSearch();

    useEffect(() => {
        fetchData();
    }, [searchQuery]);

    const fetchData = async () => {
        try {
            let url = 'http://3.143.218.54:8000/api/books/';
            if (searchQuery) {
                url = `http://3.143.218.54:8000/api/books/?search=${encodeURIComponent(searchQuery)}`;
            }

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            const bookData = await response.json();
            setBooks(bookData);
            setError(null);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="content">
            <div className="container my-5">
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <BooksList books={books} />
            </div>
        </div>
    );
};

export default BooksPage;
