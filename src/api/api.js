import axios from 'axios';

const api = axios.create({
  baseURL: 'https://deckofcardsapi.com/api/deck/',
});

const bridgeApi = {
  getCards(data) {
    return api.get(`${data}/draw/?count=2`);
  },
};

export default bridgeApi;
