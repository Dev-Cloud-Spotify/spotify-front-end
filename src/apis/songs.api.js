import axios from 'axios';

const API_URL = `${process.env.API_URL}/api/songs`;
const songsAPI = {
 
  getSongs: async (title) => {
    try {
      const response = await axios.get(`${API_URL}/getSongs`);

      if (title) {
        // Filter the songs based on the title
        const filteredSongs = response.data.filter((song) => {
          return song.title.toLowerCase().includes(title.toLowerCase())
          || song.artist?.name.toLowerCase().includes(title.toLowerCase())
        }
        );
        console.log(`Filtered songs with title "${title}":`, filteredSongs);
        return filteredSongs;
      }

      console.log('All songs:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching songs:', error);
      throw error;
    }
  },

  getSongById: (id) => {
    return axios
      .get(`${API_URL}/getSongById/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  },

  likeSong: (id) => {
    return axios
      .get(`${API_URL}/likeSong/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  },
};

export default songsAPI;
