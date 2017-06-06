<template>
  <div id="app">
    <!-- built files will be auto injected -->
    <bar></bar>
    <vue-particles
      color="#9E9E9E"
      :particleOpacity="0.1"
      linesColor="#9E9E9E"
      :particlesNumber="60"
      shapeType="circle"
      :particleSize="5"
      :linesWidth="2"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <router-view></router-view>
    <foot></foot>
  </div>
</template>

<script>

  import bar from './components/bar.vue'
  import foot from './components/foot.vue'

  export default {
    name: 'app',
    components: {
      'bar': bar,
      'foot': foot
    }
  }
</script>

<style scoped>
  @import "./assets/reset.css";
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    background-image: url("./assets/background.png");
    background-repeat: repeat-y;
  }
</style>
