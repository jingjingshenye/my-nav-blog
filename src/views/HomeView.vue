<script setup>
import { ref, onMounted } from "vue";
// import * as dayjs from 'dayjs'
import data from "../data/nav.js";
import { getLocation, getWeather } from "../api/index.js";
// const weekDays = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

const loaction = ref({});
const weather = ref({});

const weekDays = ["日", "一", "二", "三", "四", "五", "六"];

let dayOfWeek = ref(null);
let day = ref(null);
let month = ref(null);
let year = ref(null);
let hour = ref(null);
let minute = ref(null);

let now = new Date();
dayOfWeek.value = weekDays[now.getDay()];
day.value = now.getDate();
month.value = now.getMonth();
year.value = now.getFullYear();
hour.value = now.getHours();
minute.value = now.getMinutes();

setInterval(() => {
  let now = new Date();
  dayOfWeek.value = weekDays[now.getDay()];
  day.value = now.getDay();
  month.value = now.getMonth();
  year.value = now.getFullYear();
  hour.value = now.getHours();
  minute.value = now.getMinutes();
}, 1000 * 60 * 60);

function toLink(item) {
  console.log(item);
  window.open(item.url);
}

let inputValue = ref("");
function onSearch() {
  window.open(`https://www.baidu.com/s?wd=${inputValue.value}`);
}

onMounted(() => {
  console.log("onMounted");
  getLocation()
    .then((res) => {
      const { data = {} } = res;
      const { city = "", province, adcode = "" } = data;

      loaction.value = {
        city,
        province,
        adcode,
      };
      console.log("adcode", adcode);
      return getWeather(adcode);
    })
    .then((res) => {
      // console.log(res);
      const { data = {} } = res;
      const { lives = [] } = data;

      weather.value = lives[0];
    });
});
</script>

<template>
  <main class="wrapper">
    <div class="bg"></div>
    <div class="top"></div>
    <div class="center">
      <div class="time">
        <div class="hour">
          {{ hour }}:{{ minute.toString().padStart(2, "0") }}
        </div>
        <div class="date">
          <span>{{ year }}年</span>
          <span>{{ month + 1 }}月</span>
          <span>{{ day }}日</span>
        </div>
      </div>
      <div class="weather">
        <span>周{{ dayOfWeek }}</span>

        <span>{{ weather.city }}</span>
        <span>{{ weather.weather }}</span>
        <span>{{ weather.temperature }}℃</span>
      </div>
      <div class="wind">
        <span>{{ weather.winddirection }}</span>
        <span>风力{{ weather.windpower }}</span>
        <span>湿度{{ weather.humidity }}%</span>
      </div>
      <div class="search">
        <div class="input-w">
          <input type="text" placeholder="输入关键字" v-model="inputValue" />
        </div>
        <div class="btn" @click="onSearch()">百度一下</div>
      </div>

      <div class="card-list">
        <div v-for="(item, index) in data" :key="index" class="card word-px">
          <div class="icon" @click="toLink(item)">
            <img v-if="item.iconURL" :src="item.iconURL" alt="" />
            <div v-else>
              {{ item.name.slice(0, 1).toString().toUpperCase() }}
            </div>
          </div>
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <div class="bottom"></div>
  </main>
</template>

<style>
@import "../assets/base.css";
</style>

<style scoped lang="scss">
main {
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
}
.bg {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/bg.jpg");
  background-size: cover;
  position: fixed;
  z-index: -10;
}
.top {
  width: 100vw;
  height: 60px;
  background-color: #000223;
  opacity: 0.3;
}
.center {
  width: 100vw;
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  .time {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    color: white;
    font-size: 18px;
    font-weight: bolder;
    .hour {
      font-size: 60px;
    }
    .date {
      display: flex;
      gap: 3px;
      margin-top: 10px;
    }
  }
  .weather {
    color: white;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }
  .wind {
    color: white;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
  .search {
    width: 460px;
    height: 40px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 15px;
    .input-w {
      width: 360px;
      height: 30px;
      padding: 0 10px;
      border: #4e6ef3 solid 2px;
      box-sizing: border-box;
      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
      background-color: white;
      display: flex;
      align-items: center;
    }
    input[type="text"] {
      width: 360px;
      height: 25px;
      border: none;
      outline: none;
    }
    .btn {
      width: 80px;
      height: 30px;
      font-size: 17px;
      font-weight: 400;
      border-bottom-right-radius: 5px;
      border-top-right-radius: 5px;
      background-color: #4e6ef3;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .card-list {
    // margin-top: 110px;
    width: 950px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 20px;
    background-color: #eef1f5;
    border-radius: 20px;
    padding: 20px;
    box-sizing: border-box;
    font-size: 20px;
    cursor: pointer;
    .card {
      width: 56px;
      height: 65px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background-color: #718af5;
        background-size: 100% 100%;
        background-position: center;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        width: 56px;
        text-align: center;
        color: black;
        font-size: 12px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }
    }
  }

  @media screen and (max-width: 950px) {
    .card-list {
      width: 650px;
    }
  }
}
.bottom {
  width: 100vw;
  height: 40px;
  background-color: #ffffff;
  position: fixed;
  bottom: 0px;
}
</style>
