/**
 * 좌측문자열채우기
 * @params
 *  - padLen : 최대 채우고자 하는 길이
 *  - padStr : 채우고자하는 문자(char)
 */
String.prototype.lpad = function (padLen, padStr) {
  var str = this;
  if (padStr.length > padLen) {
    console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
    return str + "";
  }
  while (str.length < padLen) str = padStr + str;
  str = str.length >= padLen ? str.substring(0, padLen) : str;
  return str;
};
console.log("05".lpad(5, "00")); // 00000
console.log("05".lpad(5, "01")); // 01010

/**
 * 우측문자열채우기
 * @params
 *  - padLen : 최대 채우고자 하는 길이
 *  - padStr : 채우고자하는 문자(char)
 */
String.prototype.rpad = function (padLen, padStr) {
  var str = this;
  if (padStr.length > padLen) {
    console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
    return str + "";
  }
  while (str.length < padLen) str += padStr;
  str = str.length >= padLen ? str.substring(0, padLen) : str;
  return str;
};
