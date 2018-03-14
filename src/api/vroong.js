import { api } from 'src/utils/vroongRequest';
const crypto = require('crypto');

const apiUrl = process.env.PLATING_VROONG_API_URL;
const apiKey = process.env.PLATING_VROONG_API_KEY ;
const secretKey = process.env.PLATING_VROONG_SECRET_KEY;

const path = '/api/delivery/track';

//부릉 API는 HMAC-SHA256 을 이용한 커스텀 인증 헤더값을 만들어 넣은 뒤 호출해야만 합니다.
//따라서 아래와 같은 작업을 수행합니다.
function generateHMACDigest(body) {
  const method = 'POST';
  return crypto.createHmac('sha256', secretKey)
    .update(`${method}${path}${body}`)
    .digest('hex');
}

  //배송중 조회 데이터 받아오기
  export function getDelivery(delivery_id) {
  const vroongRequestContent = Object.assign(
      {
        delivery_id,
      }
    );
  console.log(delivery_id);
  const body = JSON.stringify(vroongRequestContent);
  const hmacDigest = generateHMACDigest(body);
  console.log(hmacDigest);
  //헤더
  const headers = {
    "Content-Type": "application/json",
    Hmac: `${apiKey}:${hmacDigest}`,
  };
  console.log(headers);
  //option
  const options = {
    method: 'POST',
    body,
    headers,
  };
  console.log(options);
  return fetch(`${apiUrl}${path}`, options)
    .then(response => response.json())
    .then(json => {
      console.log(json);
      if (json.result === 'ERROR') {
        throw new Error(JSON.stringify(json));
      }
      return Promise.resolve(json);
    });
}
