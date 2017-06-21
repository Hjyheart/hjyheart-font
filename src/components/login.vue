<template>
  <div class="main-container">
    <transition name="slide-fade">
      <div class="login-form" v-if="!register && show">
        <div class="avatar">
          <img src="../../static/avatar.jpg" alt="avatar">
        </div>
        <div class="username">
          <input type="text" placeholder="用户名" v-model="username" autofocus>
        </div>
        <div class="password">
          <input type="password" v-model="password" placeholder="密码" @keyup.enter="onSubmit">
          <div>
            <i class="fa fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide-up">
      <div class="register-form" v-if="register">
        <h1>注册</h1>
        <div class="username">
          <input type="text" placeholder="用户名" v-model="username" autofocus>
        </div>
        <div class="password" style="width: 100%">
          <input type="password" v-model="password" placeholder="密码">
        </div>
        <div class="password" style="width: 100%">
          <input type="password" v-model="repassword" placeholder="重新输入密码" @keyup.enter="onSubmit">
        </div>
        <el-button type="success" size="small">确认提交</el-button>
      </div>
    </transition>
    <transition name="slide-up">
      <a v-if="show" @click="register=!register">{{text}}</a>
    </transition>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    data () {
      return {
        title: '登录',
        username: '',
        password: '',
        repassword: '',
        show: false,
        text: '注册',
        register: false
      }
    },
    watch: {
      register: function (val) {
        if (val === true) {
          this.text = '登录'
        } else {
          this.text = '注册'
        }
      }
    },
    methods: {
      onSubmit () {
        console.log(this.username)
        console.log(this.password)

        this.$session.start()
        this.$session.set('Auth', this.username)
        this.$router.push('/blogs')
      }
    },
    mounted () {
      document.title = this.title
      document.body.style.height = '100%'
      setTimeout(() => this.show = true, 500)
    }
  }
</script>

<style scoped>
  /* animation */
  .slide-fade-enter-active {
    transition: all .5s ease;
  }
  .slide-fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-active {
    transform: translateX(30px);
    opacity: 0;
  }

  .slide-up-enter-active {
    transition: all .5s ease;
  }
  .slide-up-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-up-enter, .slide-up-leave-active {
    transform: translateY(30px);
    opacity: 0;
  }

  /* main */
  .main-container {
    position: absolute;
    width: 100%;
    height: 100%;
    /*background: url("../../static/loginbg.jpg") no-repeat center center fixed;*/
    background-size: cover;
    -webkit-background–size: cover;
  }

  /* login form */
  .login-form {
    position: absolute;
    width: 300px;
    height: 120px;
    left: 38%;
    bottom: 55%;
    border-radius: 10px;
    opacity: 0.8;
  }

  .register-form {
    position: absolute;
    width: 300px;
    height: 200px;
    left: 38%;
    bottom: 44%;
    border-radius: 10px;
    opacity: 0.8;
  }

  .avatar {
    width: 100%;
  }

  .avatar img {
    position: relative;
    left: 29%;
    margin-bottom: 5px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .username {
    width: 100%;
    margin: 6px;
    margin-left: 10px;
    padding-top: 5px;
  }

  .username input {
    font-size: 0.8em;
    width: 80%;
    height: 35px;
    color: black;
    background: none;
    border-radius: 5px;
    border: 1px solid #0088f5;
  }

  .username i {
    position: absolute;
    color: black;
    transform: scale(1.3, 1.3);
    margin-top: 8px;
    margin-left: -15px;
  }

  .username input:focus {
    font-size: 0.9em;
  }

  .password {
    width: 80%;
    margin: 4px;
    margin-top: 26px;
    margin-left: 10px;
  }

  .password input {
    font-size: 0.8em;
    text-indent: 5px;
    width: 80%;
    height: 30px;
    color: white;
    background: none;
    border-radius: 5px;
    border: 1px solid #0088f5;
  }

  .password input:focus {
    font-size: 0.9em;
  }

  .password > div {
    position: absolute;
    top: 186px;
    right: 53px;
    background-color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
  }

  .password i {
    position: absolute;
    color: black;
    margin-top: 7px;
    margin-left: 9px;
  }

  h2 {
    font-size: 2.0em;
    position: fixed;
    bottom: 80px;
    right: 9%;
    color: white;
    font-style: italic;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  span {
    color: white;
    position: absolute;
    right: 9%;
    bottom: 60px;
    opacity: 0.6;
    font-size: 0.9em;
  }

  a {
    color: #0088f5;
    position: absolute;
    left: 39%;
    bottom: 35%;
    cursor: pointer;
  }

  h1 {
    color: white;
    margin-left: 10px;
    font-size: 1.5em;
  }

  .el-button {
    margin-left: 10px;
    margin-top: 5px;
  }



</style>