import axios from 'axios';

const API_URL = `${process.env.API_URL}/api/songs`;
const songsAPI = {
  
  getSongs: () => {
    return axios
      .get(`${API_URL}/getSongs`)
      .then((response) => {
        return response.data; // n'oublie pas de retourner la réponse u stupid
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getSongById: (id) => {
    return axios
      .get(`${API_URL}/getSongById/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  },
};

export default songsAPI;
