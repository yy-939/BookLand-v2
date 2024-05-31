import { useEffect, useState } from 'react';
import BookModel from '../../Models/BookModel';
import { SpinnerLoading } from '../Utils/SpinnerLoading';
import { SearchBook } from './component/SearchBook';
import { Pagination } from '../Utils/Pagination';

export const SearchBooksPage = () => {
    const [books, setBook] = useState<BookModel[]>([]); // <BookModel[]>: specify the type of 'books' is BookModel Array
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currPage, setCurrPage] = useState(1);
    const [booksPerPage, setBooksPerPage] = useState(5);
    const [totalAmountBooks, setTotalAmountBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const [categorySelection, setCategorySelection] = useState('Book category');

    useEffect(()=>{
        const fetchBooks = async() => {
            const baseURL: string = "http://localhost:8080/api/books";

            // const url: string = `${baseURL}?page=${currPage-1}&size=${booksPerPage}`;
            let url: string = '';

            if (searchUrl === '') {
                url = `${baseURL}?page=${currPage - 1}&size=${booksPerPage}`;
            } else {
                let searchWithPage = searchUrl.replace('<pageNumber', `${currPage-1}`)
                url = baseURL + searchWithPage;
            }
            
            const response = await fetch(url);

            if(!response.ok){
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.books;

            setTotalAmountBooks(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

            const loadedBooks : BookModel[] = [];

            for (const key in responseData){
                loadedBooks.push({
                    id : responseData[key].id,
                    title : responseData[key].title,
                    author : responseData[key].author,
                    description : responseData[key].description,
                    copies : responseData[key].copies,
                    copiesAvailable : responseData[key].copiesAvailable,
                    category : responseData[key].category,
                    img : responseData[key].img
                })
            }
            setBook(loadedBooks);
            setIsLoading(false);
        };
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0); // scroll page to the top
    }, [currPage, searchUrl]) // each time currPage/searchURL changes, recall this hook

    if (isLoading){
        return(
            <SpinnerLoading/>
        )
    }

    if (httpError){
        return(
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    // pagination - url change
    const searchHandleChange = () => {
        setCurrPage(1)
        if (search === '') {
            setSearchUrl('');
        } else {
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`)
        }
        setCategorySelection('Book category')
    }

    // category
    const categoryField = (value: string) => {
        setCurrPage(1)
        if (
            value.toLowerCase() === 'fe' || 
            value.toLowerCase() === 'be' || 
            value.toLowerCase() === 'data' || 
            value.toLowerCase() === 'devops'
        ) {
            setCategorySelection(value);
            setSearchUrl(`/search/findByCategory?category=${value}&page=<pageNumber>&size=${booksPerPage}`)
        } else {
            setCategorySelection('All');
            setSearchUrl(`?page=<pageNumber>&size=${booksPerPage}`)
        }
    }

    const indexOfLastBook : number = currPage * booksPerPage;
    const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
    let lastItem = booksPerPage * currPage <= totalAmountBooks ?
        booksPerPage * currPage : totalAmountBooks;

    const paginate = (pageNumber: number) => setCurrPage(pageNumber); 

    return(
        <div>
            <div className='container'>
                <div>
                    <div className='row mt-5'>
                        <div className='col-6'>
                                <div className='d-flex'>
                                    <input className='form-control me-2' type='search'
                                        placeholder='Search' aria-labelledby='Search'
                                        onChange={e => setSearch(e.target.value)}/>
                                    <button className='btn btn-outline-success' 
                                        onClick={() => searchHandleChange()}>
                                        Search
                                    </button>
                                </div>
                         </div>
                         <div className='col-4'>
                            <div className='dropdown'>
                                <button className='btn btn-secondary dropdown-toggle' type='button'
                                    id='dropdownMenuButton1' data-bs-toggle='dropdown'
                                    aria-expanded='false'>
                                    {categorySelection}
                                </button>                   
                                                        {/* aria-labelledby matches button's id */}
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li onClick={() => categoryField('All')}>
                                        <a className='dropdown-item' href='#'>
                                            All
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('FE')}>
                                        <a className='dropdown-item' href='#'>
                                            Front End
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('BE')}>
                                        <a className='dropdown-item' href='#'>
                                            Back End
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('Data')}>
                                        <a className='dropdown-item' href='#'>
                                            Data
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('DevOps')}>
                                        <a className='dropdown-item' href='#'>
                                            DevOps
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {totalAmountBooks > 0 ? 
                        <>
                        <div className='mt-3'>
                            <h5>Number of results: ({totalAmountBooks})</h5>
                        </div>
                        <p>
                            {indexOfFirstBook+1} to {lastItem} of {totalAmountBooks} items:
                        </p>
                        {books.map(book => (
                            <SearchBook book={book} key={book.id} />
                        ))}
                        </>
                    :
                        <div className='m-5'>
                            <h3>
                                Can't find what you are looking for?
                            </h3>
                            <a type='button' className='btn main-color btn-md px-4 me-md-2 fw-bold text-white'
                                    href='#'>Library Services</a>
                        </div>
                    }
                    {totalPages > 1 &&
                        <Pagination currentPage={currPage} totalPages={totalPages} paginate={paginate} />
                    }
                </div>
            </div>
        </div>
    )
}