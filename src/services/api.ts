import axios from 'axios';

export default axios.create({
  baseURL: 'http://192.168.0.6:3333/api', // 'https://jobfinder-rest-api.herokuapp.com/api',
});
