const BookcaseDeleteBook = async (bookId:number) => {
    const token = localStorage.getItem('token');
    const bookcaseId = localStorage.getItem('bookcase_id');

    try {
        const response = await fetch(
            `http://3.143.218.54:8000/api/booksinbookcase/delete_book_from_bookcase`, {
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
    } catch (error) {
        console.log(error.message);
    }
}

export default BookcaseDeleteBook;

