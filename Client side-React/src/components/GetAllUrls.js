import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./GetUrl.css";


function GetAllUrls(props) {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const request = `${props.baseUrl}/tinyUrl/`;
        const response = await axios.get(request);
        setUrls(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchUrls();
  }, []);

  return (
    <div className='container'>
      <p className='header-all-url'>This is the list of all tiny URL and the corresponding long URL</p>
      <table>
      <thead>
        <tr>
          <th>Long URL</th>
          <th>Tiny URL</th>
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
