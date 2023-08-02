import React from "react";
import { Link } from "react-router-dom";
import './Header.css'

function Header() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/longUrl">Get Long URL</Link>
        </li>
        <li>
          <Link to="/shortUrl">Get Short URL</Link>
        </li>
        <li>
          <Link to="/allUrls">Get All URLs</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;