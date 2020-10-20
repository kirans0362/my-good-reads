import React from "react";

const WishList =(props: any)=>{
    return(<div className="wish-list-container">
                <header className="header-wishlist">
                    <div className="header--content wishListTitle">My Reading Wishlist</div>
                </header>
                <div className="wishListItems">  
                    {props.wishlist.map((item: { volumeInfo: { title: React.ReactNode; authors: React.ReactNode}; },i: number )=>{
                        return(<div className="wish-List-elements" key={i}>
                        <p > <strong>{item.volumeInfo.title}</strong> by {item.volumeInfo.authors}</p>
                        <button className="tag-remove" onClick={()=>props.removeClick(item,i)}></button>
                    </div>)
                    })      
                    }
                </div>
            </div>)
}

export default WishList;