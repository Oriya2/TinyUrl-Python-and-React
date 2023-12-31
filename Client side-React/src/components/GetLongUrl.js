import React, { useState } from "react";
import axios from "axios";
import styles from "./GetUrl.css";

function GetLongUrl(props) {
  const [shortUrl, setShortUrl] = useState("");
  const [longUrl, setLongUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('')

    // Check if the input is empty
    if (!shortUrl) {
      setErrorMessage("Please enter a Short URL");
      return;
    }
    if (!shortUrl.startsWith("http://") && !shortUrl.startsWith("https://")) {
      setErrorMessage(
        'Please enter a valid URL starting with "http://" or "https://"'
      );
      return;
    }
    try {
      const request = `${props.baseUrl}/tinyUrl/getLongUrl/${shortUrl}`;
      console.log(request);
      const response = await axios.get(request);
      if (response.data) {
        setLongUrl(response.data);
        setErrorMessage("");
      } else {
        setErrorMessage("Long URL not found");
      }
    
      // Your code to handle the data...
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Error occurred while fetching data.');
    }
  };

  return (
    <div className="container">
      <h1 className="header">
        Please provide the tiny URL, and I will give you the corresponding long
        URL :)
      </h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={shortUrl}
          onChange={(e) => setShortUrl(e.target.value)}
          placeholder="Enter Short URL"
          className="input"
        />
        <button type="submit" className="button">
          Get Long URL
        </button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      {console.log('longUrl='+longUrl)}
      {longUrl && (
        <div className="result">
          <p className="short-url">Long URL: {longUrl}</p>
          <div className="buttons">
            <button className="direct-button">
              <a
                href={longUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                Direct to URL
              </a>
            </button>
            <button
              className="copy-button"
              onClick={() => navigator.clipboard.writeText(longUrl)}
            >
              Copy URL
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetLongUrl;
