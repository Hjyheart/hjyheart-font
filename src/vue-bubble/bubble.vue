<template>
  <div class="bubbles">
    <div @click="select(index, tag)" v-for="(tag, index) in tags" :id="index" :class="[index % 4 === 0 ? 'left-bottom':'', index % 4 === 1 ? 'left-top':'', index % 4 === 2 ? 'right-top':'', index % 4 === 3 ? 'right-bottom':'']">
      <span>{{tag}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    props: ["tags"],
    methods: {
      flush () {
        let bubbles = document.getElementsByClassName('bubbles')[0].childNodes;
        console.log(bubbles.length)
        for (let i = 0; i < bubbles.length; i++){
          this.run(bubbles[i], (i % 3) + 1)
        }
      },
      run (e, s) {
        let clientWidth = document.getElementsByClassName('bubbles')[0].clientWidth;
        let clientHeight = document.getElementsByClassName('bubbles')[0].clientHeight;

        e.timer = setInterval(() => {
          if (e.offsetLeft <= 0){
            e.speedL = s;
          }else if ((e.offsetLeft + e.offsetWidth) >= clientWidth){
            e.speedL = -s
          }
          if (e.offsetTop <= 0){
            e.speedT = s
          }else if ((e.offsetTop + e.offsetHeight) >= clientHeight){
            e.speedT = -s
          }
          e.style.left = e.offsetLeft + e.speedL + 'px'
          e.style.top = e.offsetTop + e.speedT + 'px'
        }, 20);

        e.onMouseover = () =>{
          clearInterval(e.timer)
        };

        e.onMouseOut = () => {
          run(e, s)
        }

      },
      select (id, tag) {
        this.$emit('select', tag, id)
      }
    },
    mounted () {
      let bubbles = document.getElementsByClassName('bubbles')[0].childNodes;
      console.log(bubbles.length)
      for (let i = 0; i < bubbles.length; i++){
        this.run(bubbles[i], (i % 2) + 1)
      }
    },
    watch: {
      tags: function () {
        setTimeout(() => {
          let bubbles = document.getElementsByClassName('bubbles')[0].childNodes;
          console.log(bubbles.length)
          this.run(bubbles[bubbles.length - 1], Math.random() % 2 + 1)
        })
      }
    }
  }
</script>

<style scoped>
  .left-bottom {
    left: 0;
    bottom: 0;
    border: 1px solid #0088f5;
  }

  .left-top {
    left: 0;
    top: 0;
    border: 1px solid red;
  }

  .right-bottom {
    right: 0;
    bottom: 0;
    border: 1px solid yellow;
  }

  .right-top {
    right: 0;
    top: 0;
    border: 1px solid green;
  }


  .bubbles > div {
    width:60px;
    height:60px;
    background:green;
    position:absolute;
    z-index:99;
    border-radius: 100px;
    background: none;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }

  .bubbles > div > span {
    position: relative;
    top: 40%;
    font-size: 0.3em;
  }
</style>
