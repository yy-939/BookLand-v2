import React from 'react'
import { ReturnBook } from "./ReturnBook";
import { useEffect, useState } from 'react';
import BookModel from '../../../Models/BookModel';
import { SpinnerLoading } from '../../Utils/SpinnerLoading';
import { Link } from 'react-router-dom';

// React’s three lifestyle methods: 
// Mounting, when the component is first render; 
// Updating, when the component or state changes; 
// and lastly, Unmounting.

export const Carousel = () => {

    const [books, setBook] = useState<BookModel[]>([]); // <BookModel[]>: specify the type of 'books' is BookModel Array
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);


    // useEffect can trigger more than 1 time: first trigger->component created
    // then will be triggered every time array (of states) changes

    //* when the first page renders: useEffect(() => {}, [])
    //* when a state changes: useEffect(() => {}, [state])
    //* when the component unmounts: useEffect(() => {return () = {}}, [])
    useEffect(()=>{
        const fetchBooks = async() => {
            const baseURL: string = "http://localhost:8080/api/books";

            const url: string = `${baseURL}?page=0&size=9`; 
            // page=0: very first page
            // size=9:only have 9 items listed (cuz carousel only have 3 items listed at a time and swap 3 times)
            
            const response = await fetch(url);

            if(!response.ok){
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.books;

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
    }, [])

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

    return(
        <div className='container mt-5' style={{height:550}}>
            <div className='homepage-carousel-title'>
                <h3>Take one you will "stay up too late reading".</h3>
            </div>

            {/* Desktop */}
            <div id='carouselExampleControls' className="carousel carousel-dark slid 
            mt-5 d-none d-lg-block" data-bs-interval='false'>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row d-flex justify-content-center align-items-center">
                            {books.slice(0, 3).map(book => (
                                <ReturnBook book={book} key={book.id}/>
                            ))}
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            {books.slice(3, 6).map(book => (
                                    <ReturnBook book={book} key={book.id}/>
                                ))}
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            {books.slice(6, 9).map(book => (
                                    <ReturnBook book={book} key={book.id}/>
                                ))}
                            </div>
                    </div>
                    <button className='carousel-control-prev' type='button'
                        data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Previous</span>
                    </button>
                    <button className='carousel-control-next' type='button'
                        data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                        <span className='carousel-control-next-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Next</span>
                    </button>
                </div>
            </div>
            
            {/* Mobile */}
            {/* by using the className="d-lg-none ": hide the div on large screen sizes. 
            Hence, the div will be displayed on smaller screens, i.e. mobile devices */}
            <div className="d-lg-none mt-3">
                <div className="row d-flex justify-content-center align-item-center">
                    <ReturnBook book={books[7]} key={books[7].id}/>
                </div>
            </div>
            <div className="homepage-carousel-title mt-3">
                {/* <a className="btn btn-outline-secondary btn-lg" href="#">View More</a> */}
                <Link className="btn btn-outline-secondary btn-lg" to="/search">View More</Link>
            </div>
        </div>
    );
}