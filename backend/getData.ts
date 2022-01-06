import fs from 'fs';
import axios from 'axios';
require('dotenv').config();

const getData = async () => {
  const res = await axios.get(
    `http://webservice.recruit.co.jp/hotpepper/large_area/v1/`,
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
getData();
