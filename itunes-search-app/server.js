const express = require('express');
const helmet = require('helmet'); // Import the helmet package
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 5000;

app.use(helmet()); // Use the helmet middleware
app.use(cors());
app.use(express.json());

app.get('/search', async (req, res) => {
    const { query, mediaType } = req.query;
    const country = 'us';
  
    try {
      let entity = '';
  
      // Determine the entity based on the selected media type
      switch (mediaType) {
        case 'music':
          entity = 'musicTrack';
          break;
        case 'books':
          entity = 'ebook';
          break;
        case 'podcasts':
          entity = 'podcast';
          break;
        // Add more cases for other media types as needed
        default:
          entity = 'musicTrack'; // Default to music if no media type specified
      }
  
      const response = await axios.get('https://itunes.apple.com/search', {
        params: {
          term: query,
          country,
          media: mediaType,
          entity,
        },
      });
  
      res.json({ results: response.data.results });
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});