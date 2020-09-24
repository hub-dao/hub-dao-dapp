import http from './http';

export const getPrice = (p) => http({
    method: 'GET',
    url: `/hubdao-server/market/price?symbols=gxc,eth,bnb,HT`
});
