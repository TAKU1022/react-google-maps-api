import fs from 'fs';
import axios from 'axios';
require('dotenv').config();

const fetchLargeArea = async () => {
  const res = await axios.get(
    'http://webservice.recruit.co.jp/hotpepper/large_area/v1/',
    {
      params: {
        key: process.env.REACT_APP_HOTPEPPER_API_KEY,
        format: 'json',
      },
    }
  );
  fs.writeFileSync('./src/data/largeArea.json', JSON.stringify(res.data));
  console.log('finish load largeArea data');
};

const fetchMiddleArea = async () => {
  const res = await axios.get(
    'http://webservice.recruit.co.jp/hotpepper/middle_area/v1/',
    {
      params: {
        key: process.env.REACT_APP_HOTPEPPER_API_KEY,
        format: 'json',
      },
    }
  );
  fs.writeFileSync('./src/data/middleArea.json', JSON.stringify(res.data));
  console.log('finish load middleArea data');
};

const fetchGenre = async () => {
  const res = await axios.get(
    'http://webservice.recruit.co.jp/hotpepper/genre/v1/',
    {
      params: {
        key: process.env.REACT_APP_HOTPEPPER_API_KEY,
        format: 'json',
      },
    }
  );
  fs.writeFileSync('./src/data/genre.json', JSON.stringify(res.data));
  console.log('finish load genre data');
};

fetchLargeArea();
fetchMiddleArea();
fetchGenre();
