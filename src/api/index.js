import axios from "axios";
const key = "fb6e1c7a7ab3dc2b7a28a3ae7a61496a";

export function getLocation() {
  return axios({
    url: "https://restapi.amap.com/v3/ip",
    method: "POST",
    params: {
      key,
    },
  })
    .then(function (res) {
      return res;
    })
    .catch();
}

export function getWeather(cityCode) {
  return axios({
    url: "https://restapi.amap.com/v3/weather/weatherInfo",
    method: "GET",
    params: {
      key,
      city: cityCode,
      extensions: "base",
      output: "JSON",
    },
  })
    .then(function (res) {
      //  此处获得天气预报数据
      return res;
      // 相隔3小时同一浏览器再次访问时会重新获取天气
    })
    .catch();
}
