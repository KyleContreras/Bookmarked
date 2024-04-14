const BookcaseAddBook = async (bookId:number) => {
    const token = localStorage.getItem('token');
    const bookcaseId = localStorage.getItem('bookcase_id');

    try {
        const response = await fetch(`http://3.143.218.54:8000/api/booksinbookcase/`, {
            method: 'POST',
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
            throw new Error('Failed to add book to bookcase');
        }
        alert('Added book to your bookcase!');
    } catch (error) {
        console.log(error.message);
    }
}

export default BookcaseAddBook;
