const crypto = require('crypto');

import { api } from 'src/utils/vroongRequest';

const apiUrl = process.env.VROONG_API_URL;
const apiKey = process.env.VROONG_API_KEY ;
const secretKey = process.env.VROONG_SECRET_KEY;
const path = '/api/delivery/track';

//배송중 조회 데이터 받아오기
export function getDelivery(delivery_id) {

const hmacDigest = generateHMACDigest(delivery_id);
const Hmac = `${apiKey}:${hmacDigest}`;
  return api
    .post(path, {
      headers: {
        Hmac,
      },
    })
    .then(response => response.json())
    .then(json => {
      //에러일때 처리
      if (json.result === 'ERROR') {
        throw new Error(JSON.stringify(json));
      }
      //데이터 받아오는 것  성공시 promise를 resolve 함.
        return Promise.resolve(json);
      }).catch(({ response }) => {
        throw response.data.error;
      });
}
//부릉 API는 HMAC-SHA256 을 이용한 커스텀 인증 헤더값을 만들어 넣은 뒤 호출해야만 합니다. 
//따라서 아래와 같은 작업을 수행합니다.
function generateHMACDigest(delivery_id) {
  const method = 'POST';
  return crypto.createHmac('sha256', secretKey)
    .update(`${method}${path}${delivery_id}`)
    .digest('hex');
}