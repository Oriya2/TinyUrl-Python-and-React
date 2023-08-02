import React, { useState } from 'react';
import axios from 'axios';

function GetLongUrl(props) {
  const [shortUrl, setShortUrl] = useState('');
  const [longUrl, setLongUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the input is empty
    if (!shortUrl) {
      setErrorMessage('Please enter a Short URL');
      return;
    }
    if (!shortUrl.startsWith('http://') && !shortUrl.startsWith('https://')) {
      setErrorMessage('Please enter a valid URL starting with "http://" or "https://"');
      return;
    }

    try {
      const request = `${props.baseUrl}/tinyUrl/getLongUrl/${shortUrl}`;
      const response = await axios.get(request);
      if(response.data){
        setLongUrl(response.data);
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
      <h1>Get Long URL</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={shortUrl}
          onChange={(e) => setShortUrl(e.target.value)}
          placeholder="Enter Short URL"
        />
        <button type="submit">Get Long URL</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      {longUrl && (
        <div>
          <p>Long URL: {longUrl}</p>
        </div>
      )}
    </div>
  );
}

export default GetLongUrl;
