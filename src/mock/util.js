const responseBody = {
  body: "",
  cause: null,
  state: true,
  timestamp: 0,
  message: "SUCCESS"
};
//模拟接口返回
export const builder = (data, message, code = 0, headers = {}) => {
  responseBody.body = data;
  if (message !== undefined && message !== null) {
    responseBody.message = message;
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code;
    responseBody._status = code;
  }
  if (
    headers !== null &&
    typeof headers === "object" &&
    Object.keys(headers).length > 0
  ) {
    responseBody._headers = headers;
  }
  responseBody.timestamp = new Date().getTime();
  return responseBody;
};
