import axios from 'axios';

export default axios.create({
  baseURL: 'https://jobfinder-rest-api.herokuapp.com/api',
});
