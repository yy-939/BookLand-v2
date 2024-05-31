import React from 'react'
import BookModel from '../../../Models/BookModel'

                // React.FC 是 React.FunctionComponent 的简写
                // specify that props is 'book', which is 'BookModel'
export const ReturnBook : React.FC<{book:BookModel}> = (props) => {
    return(
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="text-center">
                {props.book.img ?
                    <img src={props.book.img} 
                    width='151'
                    height='223'
                    alt="book">
                    </img> 
                    :  
                    <img src={require('./../../../Images/BooksImages/book-luv2code-1000.png')} 
                    width='151'
                    height='223'
                    alt="book">
                    </img>
                }
                <h6 className='mt-2'>{props.book.title}</h6>
                <p>{props.book.author}</p>
                <a className="btn main-color text-white" href="#">Reserve</a>
            </div>
    </div>
    )
}