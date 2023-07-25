import axios from 'axios';
import { configAx } from './index';

async function serviceGetImages(query, pg=1) {
  configAx.params.q = query;
  configAx.params.page = pg;
  try {
    const { data } = await axios('', configAx);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export { serviceGetImages };
