import React, { useEffect, useState } from "react";
import { getBooksByType } from "./book-search.service";
import WishList from '../wish-list/WishList';


const BookSearch = () => {
    
    const [bookType, updateBookType] = useState("");
    const [bookTypeToSearch, updateBookTypeToSearch] = useState("");
    const [allAvailableBooks, setAllAvailableBooks] = useState([]);
    const[wishlist,onwishlistClick]= useState([]);
    const bookData:any=allAvailableBooks;
    async function requestBooks() {
        if (bookType) {
            const allBooks = await getBooksByType(bookType);
            setAllAvailableBooks(allBooks.items);
        }else{
            setAllAvailableBooks([]);
        }
    }

    useEffect(() => {
        const timer = setTimeout(()=>{
            async function getAllBooks() {
                await requestBooks();
            }
            getAllBooks();
        },500) 
        return () => clearTimeout(timer);
    }, [bookType]);

    // useEffect(() => {
    // }, [allAvailableBooks]);

    useEffect(() => {
    }, [wishlist]);
    
    return (

            <>
                <div className={wishlist.length > 0 ?"book--container":"book-containerOnly"}>
                    <div className="search-params">
                        <div>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                   updateBookTypeToSearch(bookType)
                                }}
                            >
                                <input
                                    className="full-width"
                                    autoFocus
                                    name="gsearch"
                                    type="search"
                                    value={bookType}
                                    placeholder="Search for books to add to your reading list and press Enter"
                                    onChange={(e) =>{
                                        e.preventDefault();
                                        updateBookType(e.target.value)
                                    } }
                                />
                            </form>
                            {!bookType   && (
                                <div className="empty">
                                    <p>
                                        Try searching for a topic, for example
                                        <a onClick={() => {
                                                updateBookType("Javascript");
                                            }}
                                        >
                                            {" "}
                                            "Javascript"
                                        </a>
                                    </p>
                                </div>
                            )}{
                                bookData && <div className="list">
                               {
                                    bookData.map((item: any,i: any) =>{
                                        return(
                                            <div className={wishlist.length > 0 ?"list-elements":"list-elementsOnly"}  key={i}>
                                                {item.volumeInfo.imageLinks? <div className="list-image"><img  src={item.volumeInfo.imageLinks.thumbnail}></img></div>:<div></div>}
                                               
                                                <div className="list-items">
                                                    <p><strong>{item.volumeInfo.title}</strong> by {item.volumeInfo.authors} | {item.volumeInfo.publisher} | {item.volumeInfo.publishedDate}</p>
                                                    <p className="description">{item.volumeInfo.description}</p>    
                                                </div>
                                                <button className="wish-button" onClick={() => {
                                                                item.disable = true;
                                                                onwishlistClick(wishlist.concat(item));
                                                            }} disabled={item.disable}>Add to WishList</button>
                                            </div>
                                            )
                                    })
                                }
                            </div>
                            }     
                        </div>
                    </div>
                </div>{
                    wishlist.length > 0 ?<WishList wishlist = {wishlist} removeClick={(item: any,i:number)=>{item.disable = !item.disable;
                        onwishlistClick(wishlist.filter(res=> res !== item))}}/>  : <div></div>
                }
                
            </>
    );
};

export default BookSearch;
