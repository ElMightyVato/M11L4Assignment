import { Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
    const publicKey = '7506d082e367c9cac09df81ee1378932';
    const privateKey = 'fcdd03d88322a2e638d96cce393c78aa53a87997';
    const ts = new Date().getTime();
    const hash = md5(ts + privateKey + publicKey);

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://gateway.marvel.com/v1/public/characters?apikey=${publicKey}&ts=${ts}&hash=${hash}`
        );
        const data = await response.json();
        setCharacters(data.data.results);
      } catch (err) {
        setError('Failed to fetch characters');
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
