const BookcaseDeleteBook = async (bookId:number) => {
    const token = localStorage.getItem('token');
    const bookcaseId = localStorage.getItem('bookcase_id');

    try {
        const response = await fetch(
            `http://127.0.0.1:8000/api/booksinbookcase/delete_book_from_bookcase`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                book: bookId,
                bookcase: bookcaseId,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to delete book from bookcase');
        }
        alert('Removed book from your bookcase! Refresh to see change.');
    } catch (error: any) {
        console.log(error.message);
    }
}

export default BookcaseDeleteBook;

