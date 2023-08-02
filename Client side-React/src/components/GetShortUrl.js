
import React, { useState } from 'react';
import axios from 'axios';

function GetShortUrl(props) {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if the input is empty
    if (!longUrl) {
      setErrorMessage('Please enter a Long URL');
      return;
    }
    if (!longUrl.startsWith('http://') && !longUrl.startsWith('https://')) {
      setErrorMessage('Please enter a valid URL starting with "http://" or "https://"');
      return;
    }
    try {
      const request = `${props.baseUrl}/tinyUrl/getShortUrl/${longUrl}`;
      console.log(request)
      const response = await axios.get(request);
      if(response.data){
        setShortUrl(response.data);
        setErrorMessage('');
      } else{
        setErrorMessage('Long URL not found')
      }

    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Long URL not found');
    }
  };

  return (
    <div>
      <h1>Get Short URL</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter Long URL"
        />
        <button type="submit">Get Short URL</button>
      </form>
      {shortUrl && (
        <div>
          <p>Short URL: {shortUrl}</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            Redirect
          </a>
          <button onClick={() => navigator.clipboard.writeText(shortUrl)}>Copy URL</button>
        </div>
      )}
    </div>
  );
}

export default GetShortUrl;
