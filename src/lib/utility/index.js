import moment from 'moment';
import { reduce, concat } from 'lodash';

/* Convert File Size for human-readable  */
export const humanSize = (size) => {
  const num = size == 0 ? 0 : Math.floor( Math.log(size) / Math.log(1024));
  return ( size / Math.pow(1024, num) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][num];
}

/* Convert UNIX Time Stamp to ISO DATE and Date Format */
export const getDateFromTimeStamp = (timestamp) => {
  return moment.unix(timestamp).format('YYYY-MM-DD HH:mm:ss');
}

export const getDate = (date) => {
  return moment(date).format('YYYY-MM-DD');
}

export const getUnixTimeStamp = (timestamp) => {
    return Math.floor(new Date(timestamp).getTime()/1000);
}

export const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const objectToQueryString = obj => reduce(obj, (acc, v, k) => concat(acc, `${k}=${v}`),[]).join('&')
