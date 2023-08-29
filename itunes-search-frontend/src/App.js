import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [mediaType, setMediaType] = useState('music');
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [nameVisible,] = useState(true);
  // Load favorites from localStorage when the component mounts
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // Save favorites to localStorage whenever the favorites state changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);
  const [currentPage, setCurrentPage] = useState(1);

  const resultsPerPage = 10;
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/search', {
        params: {
          query,
          mediaType,
        },
      });

      setResults(response.data.results);
      setCurrentPage(1); // Reset to first page after new search
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const addToFavorites = (item) => {
    setFavorites([...favorites, item]);
  };
  const [showFavorites, setShowFavorites] = useState(false);
  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };
  
  const removeFromFavorites = (item) => {
    const updatedFavorites = favorites.filter((favorite) => favorite.trackId !== item.trackId);
    setFavorites(updatedFavorites);
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  return (
    <section>
 

    <div className="App">
      <h1>iTunes Search App</h1>
      <div class="select-media">
        <label>Select Media Type:</label>
        <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
          <option value="music">Music</option>
          <option value="books">Books</option>
          <option value="podcasts">Podcasts</option>
      
        </select>
      </div>
      
      <div class="search-btn">
        <input
          type="text"
          placeholder={`Search for ${mediaType}`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="results-display">
          <h2>Search Results:</h2>
          <ul className="results">
            {/* Slice the results array based on the current page */}
            {results.slice(startIndex, endIndex).map((result) => (
              <li className="result-search" key={result.trackId}>
                <h3 className="track-name">{result.trackName}</h3>
                <div className="addbtn-style">
                  <button className="addbtn" onClick={() => addToFavorites(result)}>
                    Add to Favorites
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {/* Display the "Next" button if there are more results */}
          {results.length > endIndex && (
            <button class="next-btn" onClick={handleNextPage}>Next</button>
          )}
        </div>
      <div class="show-fav">
  <button onClick={toggleFavorites}>
    {showFavorites ? "Hide Favorites" : "Show Favorites"}
  </button>
  {showFavorites && (
        <div class="result-container">
        <h2>Favorite Content:</h2>
          <ul className="result-list">
            {favorites.map((favorite) => (
              <li className="result-item" key={favorite.trackId}>
                <div className={`track-name ${nameVisible ? 'visible' : 'hidden'}`}>
                  {favorite.trackName}
                </div>
                <button className="removebtn" onClick={() => removeFromFavorites(favorite)}>
                  Remove from Favorites
                </button>
              </li>
            ))}
          </ul>
        </div>
  )}
</div>
    </div>
    </section>
  );
}

export default App;