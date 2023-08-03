import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./GetUrl.css";

function GetShortUrl(props) {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [shortUrlDirect, setShortUrlDirect] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if the input is empty
    if (!longUrl) {
      setErrorMessage("Please enter a Long URL");
      return;
    }
    if (!longUrl.startsWith("http://") && !longUrl.startsWith("https://")) {
      setErrorMessage(
        'Please enter a valid URL starting with "http://" or "https://"'
      );
      return;
    }
    try {
      const request = `${props.baseUrl}/tinyUrl/getShortUrl/${longUrl}`;
      console.log(request);
      const response = await axios.get(request);
      if (response.data) {
        setShortUrl(response.data);
        setErrorMessage("");
      } else {
        setErrorMessage("Tiny URL not found");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Tiny URL not found");
    }
  };

  useEffect(() => {
    // Update shortUrlDirect whenever shortUrl changes
    if (shortUrl) {
      setShortUrlDirect(shortUrl.endsWith("/") ? shortUrl.slice(0, -1) : shortUrl);
    }
  }, [shortUrl]);

  return (
    <div className="container">
      <h1 className="header">
        Please enter the URL of a website, and I will generate a tiny URL for
        you :)
      </h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter Long URL"
          className="input"
        />
        <button type="submit" className="button">
          Get tiny URL
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {shortUrl && (
        <div className="result">
          <p className="short-url">tiny URL: {shortUrl}</p>
          <div className="buttons">
            <button className="direct-button">
              <a
                href={shortUrlDirect}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                Direct to URL
              </a>
            </button>
            <button
              className="copy-button"
              onClick={() => navigator.clipboard.writeText(shortUrl)}
            >
              Copy URL
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetShortUrl;
