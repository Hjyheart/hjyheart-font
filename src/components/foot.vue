<template>
  <footer>
    <p>©2017 洪嘉勇 web课程设计 —— time tree</p>
  </footer>
</template>

<script>
  export default {
    name: 'footer'
  }
</script>

<style scoped>
  p {
    text-align: center;
  }
  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #0085f5;
    background-color: white;
    height: 60px;
    z-index: 10001;
  }

  footer > p {
    padding: 25px;
    color: #0088f5;
  }
</style>
