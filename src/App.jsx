import { Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'md5';
import Home from './Components/Home';
import BrowseCharacters from './Components/BrowseCharacters';
import CharacterDetails from './Components/CharacterDetails';
import Comics from './Components/Comics';
import NotFound from './Components/NotFound';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const publicKey = 'ec8cd50207b6932df648feaaf3cc1471';
    const privateKey = '24677de941af50e791e16d99cfc913c5a5b97dd8';
    const ts = 1; 
    const hash = md5(ts + privateKey + publicKey);

    const fetchData = async () => {
      try {
        const url = `https://gateway.marvel.com/v1/public/characters?apikey=${publicKey}&ts=${ts}&hash=${hash}`;
        
        // Log the full request URL for debugging
        console.log('Request URL:', url);

        const response = await axios.get(url);
        setCharacters(response.data.data.results);
      } catch (err) {
        // Log the full error response details for debugging
        if (err.response) {
          console.error('Error Response Status:', err.response.status);
          console.error('Error Response Data:', err.response.data); // API-specific error details
          console.error('Error Response Headers:', err.response.headers);
          setError(`API Error: ${err.response.status} - ${err.response.data.message}`);
        } else if (err.request) {
          console.error('Error Request:', err.request);
          setError('No response from the API');
        } else {
          console.error('Error Message:', err.message);
          setError('Error occurred while fetching data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/browse-characters">Browse Characters</Link></li>
          <li><Link to="/comics">Comics</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse-characters" element={<BrowseCharacters characters={characters} />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
