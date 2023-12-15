import axios from 'axios';

const API_URL = `${process.env.API_URL}/api/playlists`;

const playlistsAPI = {
    
        getPlaylists: () => {
            return axios.get(`${API_URL}/getPlaylists`)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
        },

        getPlaylistById: (id) => {
            return axios.get(`${API_URL}/getPlaylistById/${id}`)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
        },

        getAllSongsPlaylist: () => {
            return axios.get(`${API_URL}/getAllSongsPlaylist`)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
        }
        
}

export default playlistsAPI;