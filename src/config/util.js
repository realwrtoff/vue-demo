import Cookies from 'js-cookie'

export function getCookie(key) {
  return Cookies.get(key);
}

export function setCookie(key, value) {
  return Cookies.set(key, value, { expires: 6, path: '/' });
}

export function delCookie(key) {
  return Cookies.remove(key);
}

const SIGN_REGEXP = /([yMdhsm])(\1*)/g;
const DEFAULT_PATTERN = 'yyyyMMdd';
function padding(s, len) {
  len = len - (s + '').length;
  for (var i = 0; i < len; i++) { s = '0' + s; }
  return s;
}
export function formatDate(date, pattern) {
  date = new Date(date)
  pattern = pattern || DEFAULT_PATTERN;
  return pattern.replace(SIGN_REGEXP, function ($0) {
    switch ($0.charAt(0)) {
      case 'y': return padding(date.getFullYear(), $0.length);
      case 'M': return padding(date.getMonth() + 1, $0.length);
      case 'd': return padding(date.getDate(), $0.length);
      case 'w': return date.getDay() + 1;
      case 'h': return padding(date.getHours(), $0.length);
      case 'm': return padding(date.getMinutes(), $0.length);
      case 's': return padding(date.getSeconds(), $0.length);
    }
  })
}
