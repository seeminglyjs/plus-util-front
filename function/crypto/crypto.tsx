import { AES, enc } from 'crypto-js';
 
export function encrypt(data: string, key: string, iv: string): string {
  const dataWA = enc.Utf8.parse(data);
  const keyWA = enc.Utf8.parse(key);
  const ivWA = enc.Utf8.parse(iv);
 
  const cipher = AES.encrypt(dataWA, keyWA, { iv: ivWA });
  return cipher.ciphertext.toString(enc.Base64);
}
 
export function decrypt(encData: string, key: string, iv: string): string {
  const keyWA = enc.Utf8.parse(key);
  const ivWA = enc.Utf8.parse(iv);
 
  const cipher = AES.decrypt(enc.Base64.parse(encData.replace(/=/gi, '')).toString(enc.Base64), keyWA, { iv: ivWA }); // 해쉬된 값이 url encode 일 수도 있으므로 base64url 로 파싱하고 다시 base64 로 인코딩
  return cipher.toString(enc.Utf8);
}