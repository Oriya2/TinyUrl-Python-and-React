import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GetAllUrls(props) {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const request = `${props.baseUrl}/tinyUrl/`;
        // const response = await axios.get(request);
        const response = await axios.get(request);
        setUrls(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchUrls();
  }, []);

  return (
    <div>
      <h1>All URLs</h1>
      <table>
      <thead>
        <tr>
          <th>Short URL</th>
          <th>Long URL</th>
        </tr>
      </thead>
      <tbody>
        {urls.map((url) => (
          <tr key={url[0]}>
            <td>{url[0]}</td>
            <td>{url[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default GetAllUrls;
