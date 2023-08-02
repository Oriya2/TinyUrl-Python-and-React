import React from "react";
import './Header.css'

const Home = () =>{
    return (
        <div className="container">
        <div className="content">
          <p className="title" style={{'color':'#FF67FF', 'font-size': '36px'}}>Welcome to Tiny-URL Project!</p>
          <p className="description" style={{'color':'#007bff'}}>
            Your solution for shortening and managing URLs. Create compact links
            instantly for easy sharing on social media, emails, and more.
          </p>
          <p className="description" style={{'color':'#67DB55'}}>
            Simplify your links with TinyUrl and enhance user experience.
          </p>
        </div>
      </div>)
}

export default Home;