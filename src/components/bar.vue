<template>
  <div class="bar">
    <div class="logo">
      <h1>< / >Hjyheart</h1>
    </div>
    <div class="title">
      <h2>Web课程设计 —— time tree</h2>
    </div>
    <div class="option">
      <div><router-link to="/" :class="[this.$route.path === '/emotion' ? 'active':'']">心情</router-link></div>
      <div><router-link to="/blogs" :class="[(this.$route.path === '/blog-editor' || this.$route.path === '/blogs') ? 'active':'']">日志</router-link></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'header-bar',
    data(){
      return {

      }
    },
    methods: {}
  }
</script>

<style scoped>
  .bar {
    position: fixed;
    height: 60px;
    width: 100%;
    background-color: white;
    z-index: 9999;
    opacity: 0.8;
  }

  .logo {
    float: left;
    padding: 15px 0 20px 90px;
    font-size: 28px;
    color: #0088f5;
  }

  .title {
    float: left;
    padding: 24px 0 20px 50px;
    font-size: 15px;
    color: #0088f5;
  }

  .option > div {
    display: block;
    float: left;
    position: relative;
    padding: 24px 0 20px 50px;
  }

  .option > div > a {
    text-decoration: none;
    color: #0088f5;
    transition: 0.5s;
  }

  .option > div > a:hover {
    opacity: 0.6;
    font-size: 1.5em;
  }

  .active {
    opacity: 0.6;
    font-size: 1.5em;
  }
</style>
