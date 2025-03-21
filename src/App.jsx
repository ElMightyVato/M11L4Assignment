import { Routes, Route, Link } from 'react-router-dom';
import Home from './Components/Home';
import BrowseCharacters from './Components/BrowseCharacters';
import CharacterDetails from './Components/CharacterDetails';
import Comics from './Components/Comics';

const App = () => {
  const characters = [
    { id: 1, name: 'Iron Man' },
    { id: 2, name: 'Spider-Man' },
    { id: 3, name: 'Thor' },
    { id: 4, name: 'Captain America' },
    { id: 5, name: 'Black Panther' }
  ];

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
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;
