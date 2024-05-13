import { useEffect, useState, useRef } from 'react';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [bookNumber, setBookNumber] = useState(1);
    const [query, setQuery] = useState("");
    const pageCount = useRef(1);

    const fetchBooksByQuery = async () => {
        const response = await fetch(
            `https://freetestapi.com/api/v1/books?search=${query}`,
            {
                mode: 'cors',
                method: "GET",
            }
        );

        const data = await response.json();

        setBooks(data);
    };

    const fetchBooks = async () => {
        const response = await fetch(
            `https://freetestapi.com/api/v1/books/${bookNumber}`,
            {
                mode: 'cors',
                method: "GET",
            }
        );

        const data = await response.json();

        setBooks(data);
    };

    const handleNextBook = () => {
        setBookNumber(bookNumber + 1);
    };

    const handlePrevBook = () => {
        if (bookNumber - 1 > 0)
            setBookNumber(bookNumber - 1);
    };

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    };

    useEffect(() => {
        fetchBooks();
    }, [bookNumber]);


    const getPages = (length) => {
        const pages = [];

        for (let i = 0; i < length; i++) {
            pages.push(
                <ul>
                    <li onClick={() => setBookNumber(i)}>{i + 1}</li>
                </ul>
            );
        }

        return pages
    }

    return (
        <>
            <h1>도서 목록</h1>
            <p>페이지: {bookNumber}</p>
            <div>
                <span>검색</span>
                <input type="text" onChange={handleQueryChange} />
                <button onClick={fetchBooksByQuery}>도서 검색</button>
            </div>
            <button onClick={handlePrevBook}>이전 도서</button>
            <button onClick={handleNextBook}>다음 도서</button>
            <div>
                {
                    Array.isArray(books) ? getPages(books.length).map(page => {
                        return page;
                    }) : <></>
                }

                {Array.isArray(books) ? books.map((book, idx) => {
                    return (
                        <>
                            <p>{book.title}</p>
                        </>
                    )
                    })
                    :
                    <>
                        <p>{books.title}</p>
                    </>
                } 
            </div>
        </>
    );
}

export default BookList;