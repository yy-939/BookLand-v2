import React from 'react'
import { ReturnBook } from "./ReturnBook";

export const Carousel = () => {
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
                            <ReturnBook/>
                            <ReturnBook/>
                            <ReturnBook/>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            <ReturnBook/>
                            <ReturnBook/>
                            <ReturnBook/>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            <ReturnBook/>
                            <ReturnBook/>
                            <ReturnBook/>
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
                    <ReturnBook/>
                    <ReturnBook/>
                    <ReturnBook/>
                </div>
            </div>
            <div className="homepage-carousel-title mt-3">
                <a className="btn btn-outline-secondary btn-lg" href="#">View More</a>
            </div>
        </div>
    );
}