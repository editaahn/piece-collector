const axios = require("axios");
const apiBaseUrl = "http://localhost:3000";

export const errorMessage = {
  400: "잘못된 요청으로 인하여 서버가 요청을 이해할 수 없습니다.",
  404: "요청한 리소스가 존재하지 않습니다.",
  409: "요청이 서버의 현재 상태와 충돌합니다.",
  500: "서버 오류입니다.",
};

const request = async (method, url) => {
  const result = await axios({ method, url });
  return result.data;
};

export const api = {
  getMonthlyData: (year, month) =>
    request("get", `${apiBaseUrl}/monthly?year=${year}&month=${month}`),
  getDailyData: (id) => request("get", `${apiBaseUrl}/daily/${id}`),
};
