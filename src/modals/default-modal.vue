<template>
  <div>
    <div :class="['modal', show ? 'show':'', opacityCtr ? 'modal-op':'']">
      <div class="modal-header">
        <slot name="modal-header">标题</slot>
      </div>
      <i class="fa fa-times" @click="hide"></i>
      <div class="modal-body">
        <slot name="modal-body">文本</slot>
      </div>
      <div class="modal-footer">
        <a @click="hide">确认</a>
      </div>
    </div>
    <div :class="['overlay', show ? 'show':'', opacityCtr ? 'modal-lay':'']" @click="hide"></div>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    data () {
      return {
        show: false,
        opacityCtr: false
      }
    },
    methods: {
      open () {
        this.show = true
        $('body').css('overflow-y', 'hidden')
        setTimeout(() => this.opacityCtr = true, 200)
      },
      hide () {
        $('body').css('overflow-y', 'auto')
        this.opacityCtr = false
        setTimeout(() => this.show = false, 1000)
      },
      confirm () {
        this.$emit('confirm')
        this.hide()
      }
    }
  }
</script>

<style scoped>
  .overlay{
    display: none;
    position: fixed;
    opacity: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.8);
    z-index: 10010;
    transition: opacity 1s;
  }
  .modal {
    display: none;
    margin: 0 auto;
    position: absolute;
    top: 10%;
    left: 33%;
    width: 40%;
    height: 250px;
    background: #fff;
    opacity: 0;
    z-index: 20000;
    border-radius: 4px;
    transition: opacity 1s;
  }

  .modal-header {
    font-size: 1.5em;
    text-align: center;
    padding-top: 10px;
  }

  i {
    position: absolute;
    right: 3%;
    top: 4%;
    cursor: pointer;
  }

  i:hover {
    transform: scale(1.5, 1.5);
    -webkit-transform: scale(1.5, 1.5);
    -moz-transform: scale(1.5, 1.5);
    -o-transform: scale(1.5, 1.5);
  }

  .modal-body {
    text-align: center;
    margin-top: 10px;
    padding-top: 40px;
    border-top: 1px solid #eaeaea;
    height: 110px;
  }

  .modal-footer {
    border-top: 1px solid #eaeaea;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
  }

  a {
    margin: 10px auto;
    border: 1px solid #0088f5;
    padding: 8px 25px 8px 25px;
    text-decoration: none;
    transition: 0.5s;
    border-radius: 3px;
    color: #0088f5;
    cursor: pointer;
  }

  a:hover {
    background-color: #0088f5;
    color: white;
  }

  /* show */
  .show {
    display: block !important;
    position: fixed;
  }

  .modal-op {
    opacity: 1.0 !important;
  }

  .modal-lay {
    opacity: 0.8 !important;
  }
</style>
