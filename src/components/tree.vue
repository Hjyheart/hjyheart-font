<template>
  <section v-bind:class="[(l.length > 3 && (browser === 'FF' || browser === 'CH')) ? 'time-line-scroll' : 'time-line']" id="time-line">
    <div v-for="(item, index) in l" v-bind:class="['time-item', index * 150 - scroll < 50 ? 'active': '', othersDown ? 'others-down' : '']" v-bind:id="index">
      <div v-bind:class="['ball', (firstIn && index == 0 ) ? 'first' : '']">
        <img src="../assets/love.svg" width="25px" height="25px" alt="爱心">
      </div>
      <div v-bind:class="[index % 2 == 0 ? 'card-left' : 'card-right', (firstIn && index == 0 ) ? 'first' : '']">
        <h1 class="card-title">Title</h1>
        <p class="card-content">{{item.content}}</p>
        <time class="card-time">2017-5-16</time>
      </div>
      <div :class="['line', (firstIn && index === 0) ? 'first' : '']"></div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'tree',
    data() {
      return {
        l: [
          {
            title: 'test1',
            content: 'heihei',
            time: '2017-5-16'
          },
          {
            title: 'test2',
            content: 'haha',
            time: '2017-5-16'
          }
        ],
        browser: '',
        scroll: '',
        firstIn: false,
        othersDown: false
      }
    },
    created(){
      var userAgent = navigator.userAgent;
      var isOpera = userAgent.indexOf("Opera") > -1;
      var isMaxthon = userAgent.indexOf("Maxthon") > -1 ;
      var isFF = userAgent.indexOf("Firefox") > -1 ;
      var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") < 1 ;
      var isChrome = userAgent.indexOf("Chrome") > -1 ;

      if(isFF){console.log("当前浏览器是  Firefox");this.browser = 'FF';}
      if(isMaxthon){console.log("当前浏览器是 傲游(webkit核心)");}
      if(isOpera){console.log("当前浏览器是  Opera");}
      if(isSafari){console.log("当前浏览器是  Safari");this.browser = 'SA';}
      if(isChrome){console.log("当前浏览器是  Chrome");this.browser = 'CH';}
    },
    methods: {
      async addNode(content){
        this.firstIn = false;
        this.othersDown = true;
        setTimeout( () => {
          this.l.unshift({
            title: 'test',
            content: content,
            time: '2017-5-16'
          });
          this.firstIn = true;
          setTimeout(() => {
            this.othersDown = false;
            this.firstIn = false;
          }, 1000);
        }, 1000);
      },
      scrollSpy(){
        this.scroll = document.getElementById('time-line').scrollTop;
        console.log(this.scroll);
      }
    },
    mounted() {
      document.getElementById('time-line').addEventListener('scroll', this.scrollSpy);
    }
  }
</script>

<style scoped>
  /* TODO: 加上一个心情之后树动态变化 */
  /* 动画 */
  /* 加入心情动画 */
  @keyframes first-in
  {
    0%   {opacity: 0;}
    50%  {opacity: 0.5;}
    100% {opacity: 1;}
  }

  @-moz-keyframes first-in
  {
    0%   {opacity: 0;}
    50%  {opacity: 0.5;}
    100% {opacity: 1;}
  }

  @-webkit-keyframes first-in
  {
    0%   {opacity: 0;}
    50%  {opacity: 0.5;}
    100% {opacity: 1;}
  }

  @-o-keyframes first-in
  {
    0%   {opacity: 0;}
    50%  {opacity: 0.5;}
    100% {opacity: 1;}
  }

  /*选中特效*/
  @keyframes left-center
  {
    0%   {left: 7%;}
    50%  {left: 8%;}
    100% {left: 9%;}
  }

  @-moz-keyframes left-center
  {
    0%   {left: 7%;}
    50%  {left: 8%;}
    100% {left: 9%;}
  }

  @-webkit-keyframes left-center
  {
    0%   {left: 7%;}
    50%  {left: 8%;}
    100% {left: 9%;}
  }

  @-o-keyframes left-center
  {
    0%   {left: 7%;}
    50%  {left: 8%;}
    100% {left: 9%;}
  }

  @keyframes right-center {
    0%   {left: 60%;}
    50%  {left: 59%;}
    100% {left: 58%;}
  }

  @-moz-keyframes right-center
  {
    0%   {left: 60%;}
    50%  {left: 59%;}
    100% {left: 58%;}
  }

  @-webkit-keyframes right-center {
    0%   {left: 60%;}
    50%  {left: 59%;}
    100% {left: 58%;}
  }

  @-o-keyframes right-center {
    0%   {left: 60%;}
    50%  {left: 59%;}
    100% {left: 58%;}
  }

  /* 时间线 */
  .time-line {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .time-line-scroll {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .time-line::before {
    content: '';
    position: absolute;
    top: 0;
    background-color: #0088f5;
    width: 4px;
    height: 100px;
    left: 49%;
  }

  .time-line-scroll::before {
    /*content: '';*/
    position: absolute;
    top: 0;
    background-color: #0088f5;
    width: 4px;
    height: 100px;
    left: 49%;
    z-index: -999;
  }

  .line {
    width: 4px;
    height: 140px;
    position: relative;
    left: 49%;
    top: -97px;
    background-color: #0088f5;
    z-index: -1;
  }

  /* 时间项 */
  .time-item {
    margin-top: 40px;
    height: 40px;
    margin-bottom: 110px;
    transition: 1s;
  }

  .first {
    opacity: 0;
    animation: first-in 2s linear 0s 1 normal forwards;
    -webkit-animation: first-in 2s linear 0s 1 normal forwards;
    -moz-animation: first-in 2s linear 0s 1 normal forwards;
    -o-animation: first-in 2s linear 0s 1 normal forwards;
  }

  .others-down {
    transform: translateY(100px);
    -webkit-transform: translateY(100px);
    -moz-transform: translateY(100px);
    -o-transform: translateY(100px);
  }

  /*中间的球*/
  .ball {
    border-radius: 50%;
    position: relative;
    left: 46.5%;
    background-color: red;
    width: 50px;
    height: 50px;
    text-align: center;
  }

  .active > div.ball {
    background-color: green;
  }

  .active > div.card-left {
    animation: left-center 0.5s linear 0s 1 normal forwards;
    -moz-animation: left-center 0.5s linear 0s 1 normal forwards;
    -webkit-animation: left-center 0.5s linear 0s 1 normal forwards;
    -o-animation: left-center 0.5s linear 0s 1 normal forwards;
    transform: scale(1.2, 1.2);
    -webkit-transform: scale(1.2, 1.2);
    -moz-transform: scale(1.2, 1.2);
    -o-transform: scale(1.2, 1.2);
  }

  .active > div.card-right {
    animation: right-center 0.5s linear 0s 1 normal forwards;
    -moz-animation: right-center 0.5s linear 0s 1 normal forwards;
    -webkit-animation: right-center 0.5s linear 0s 1 normal forwards;
    -o-animation: right-center 0.5s linear 0s 1 normal forwards;
    transform: scale(1.2, 1.2);
    -webkit-transform: scale(1.2, 1.2);
    -moz-transform: scale(1.2, 1.2);
    -o-transform: scale(1.2, 1.2);
  }


  .ball::before {
    content: '';
    position: absolute;
    left: -9%;
    top: -9%;
    height: 50px;
    width: 50px;
    border: 4px solid white;
    border-radius: 50%;
  }

  .ball > img {
    position: relative;
    top: 13px;
  }

  /* 卡片 */
  .card-left {
    background-color: white;
    max-width: 260px;
    min-height: 100px;
    position: relative;
    top: -170%;
    left: 7%;
    border-radius: 6px;
    transition: width 0.5s;
    text-align: left;
  }

  .card-left::before {
    content: '';
    position: absolute;
    border: 25px solid white;
    border-color: transparent transparent transparent white;
    right: -39px;
    top: 20px;
    z-index: -999;
  }

  .card-right {
    background-color: white;
    max-width: 260px;
    min-height: 100px;
    position: relative;
    top: -170%;
    left: 60%;
    border-radius: 6px;
    transition: width 0.5s;
    text-align: left;
  }

  .card-right::before {
    content: '';
    position: absolute;
    border: 25px solid white;
    border-color: transparent white transparent transparent;
    left: -39px;
    top: 20px;
    z-index: -999;
  }

  .active > div.card-right {
    transform: scale(1.2, 1.2);
  }

  .card-title {
    position: relative;
    left: 2%;
    padding-top: 5px;
    font-size: 1.58em;
  }

  .card-content {
    text-indent: 2em;
  }

  .card-time {
    position: absolute;
    right: 5px;
    bottom: 5px;
    font-size: 12px;
    opacity: 0.8;
  }

  @media screen and (max-width: 1500px) {

    /*柱子侧移*/
    .time-line::before {
      content: '';
      position: absolute;
      top: 0;
      background-color: #0088f5;
      width: 4px;
      height: 400px;
      left: 3%;
    }

    .time-line-scroll::before {
      content: '';
      position: absolute;
      top: 0;
      background-color: #0088f5;
      width: 4px;
      height: 400px;
      left: 3%;
    }

    .line {
      width: 4px;
      height: 140px;
      position: relative;
      left: 3%;
      top: -97px;
      z-index: -1;
      background-color: #0088f5;
    }

    /*球侧移*/
    .ball {
      left: 0;
    }


    /*卡片改变浮动方式*/
    .card-left {
      top: -170%;
      left: 20%;
      max-width: 300px;
    }

    .card-right {
      top: -170%;
      left: 20%;
      max-width: 300px;
    }

    .card-left::before {
      border-color: transparent transparent transparent transparent;
    }

    .card-left::after {
      content: '';
      position: absolute;
      border: 25px solid white;
      border-color: transparent white transparent transparent;
      left: -39px;
      top: 20px;
      z-index: -999;
    }

    @keyframes to-right {
      0% {left: 25%;}
      50% {left: 26%;}
      100% {left: 27%;}
    }

    @-moz-keyframes to-right {
      0% {left: 25%;}
      50% {left: 26%;}
      100% {left: 27%;}
    }

    @-webkit-keyframes to-right {
      0% {left: 25%;}
      50% {left: 26%;}
      100% {left: 27%;}
    }

    @-o-keyframes to-right {
      0% {left: 25%;}
      50% {left: 26%;}
      100% {left: 27%;}
    }

    .active > div.card-right {
      animation: to-right 0.5s linear 0s 1 normal forwards;
      -moz-animation: to-right 0.5s linear 0s 1 normal forwards;
      -webkit-animation: to-right 0.5s linear 0s 1 normal forwards;
      -o-animation: to-right 0.5s linear 0s 1 normal forwards;
      transform: scale(1.2, 1.2);
    }

    .active > div.card-left {
      animation: to-right 0.5s linear 0s 1 normal forwards;
      -moz-animation: to-right 0.5s linear 0s 1 normal forwards;
      -webkit-animation: to-right 0.5s linear 0s 1 normal forwards;
      -o-animation: to-right 0.5s linear 0s 1 normal forwards;
      transform: scale(1.2, 1.2);
    }
  }
</style>
