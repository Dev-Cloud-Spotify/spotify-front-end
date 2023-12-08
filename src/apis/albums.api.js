import axios from 'axios';

const API_URL = `${process.env.API_URL}/api/albums`;

const albumsAPI = {
    
    getAlbums: () => {
        return axios.get(`${API_URL}/getAlbums`)
        .then(response => response.data)
        .catch(error => {
            console.log(error);
        });
    },

    getAlbumbyId: (id) => {
        return axios.get(`${API_URL}/getAlbumById/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.log(error);
        });
    },
        
    
}

export default albumsAPI;