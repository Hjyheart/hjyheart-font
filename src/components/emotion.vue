<template>
  <div class="demo">
    <div class="edit-window">
      <div class="profile">
        <div class="avatar">
          <img src="../assets/avatar.jpg" alt="yeah!">
        </div>
        <div class="my-info">
          <div>
            <i class="fa fa-user" aria-hidden="true"></i>
            洪嘉勇
          </div>
          <div>
            <i class="fa fa-envelope" aria-hidden="true"></i>
            tj_island@163.com
          </div>
          <div>
            <i class="fa fa-github-square" aria-hidden="true"></i>
            <a href="https://github.com/Hjyheart">Hjyheart</a>
          </div>
          <div>
            <i class="fa fa-star" aria-hidden="true"></i>
            但行好事，莫问前程
          </div>
        </div>
      </div>
      <div class="edit-area">
        <input type="text" placeholder="标题" v-model="emotionTitle"/>
        <textarea placeholder="记录下今天的心情" v-model="content" autofocus></textarea>
        <a @click="notifyTree">提交</a>
      </div>
    </div>
    <div class="time-tree">
      <tree ref="tree"></tree>
    </div>
  </div>
</template>

<script>
  import tree from './tree.vue'

  export default {
    name: 'emotion',
    data () {
      return {
        title: '心情管理',
        content: '',
        emotionTitle: ''
      }
    },
    components:{
      'tree': tree
    },
    methods:{
      notifyTree(event){
        this.$refs.tree.addNode(this.content);
      }
    },
    mounted () {
      document.title = this.title
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .demo {
    position: relative;
    padding-top: 60px;
    bottom: 0;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: center;
    height: 750px;
    opacity: 0.7;
  }

  /*个人的信息*/
  .edit-window {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    background-color: white;
    width: 30%;
    height: 250px;
    border-radius: 0 0 8px 8px;
    margin-right: 5%;
    position: relative;
    top: 80px;
    transition: height 0.5s;
  }

  .profile {
    position: relative;
    width: 100%;
    height: 50%;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
  }

  .avatar {
    position: relative;
    top: -40px;
    left: 20px;
  }

  .avatar > img {
    width: 120px;
    height: auto;
    border-radius: 4px;
    border: 2px solid;
    box-sizing: content-box;
    transition: width 0.5s;
  }

  .my-info {
    position: relative;
    right: 0;
    margin-left: 9%;
    width: 60%;
    background-color: white;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .my-info > div {
    margin: 7px 0 0 2px;
  }

  .my-info > div > a {
    text-decoration: none;
    color: black;
  }

  /*输入的框*/
  .edit-area {
    position: relative;
    height: 50%;
    border-radius: 0 0 8px 8px;
    border-top: 1px dashed;
    width: 100%;
  }

  .edit-area > input {
    border: none;
    width: 95%;
    height: 13%;
    margin-top: 2%;
  }

  .edit-area > textarea {
    margin-top: 10px;
    opacity: 0.8;
    height: 40%;
    width: 95%;
    border: none;
    overflow-x: hidden;
    overflow-y: hidden;
    resize: none;
  }

  .edit-area > a {
    margin: 0 auto;
    display: inline-block;
    color: #0088f5;
    border: 1px solid #0088f5;
    border-radius: 4px;
    width: 13%;
    height: 1.28em;
    text-align: center;
    line-height: 1.28em;
    text-decoration: none;
    cursor: pointer;
  }

  .edit-area > a:hover {
    background-color: #0088f5;
    color: white;
  }

  /*显示内容的时间树*/
  .time-tree {
    width: 50%;
    height: 90%;
    margin-left: 5%;
    position: relative;
    top: 80px;
  }

  @media screen and (max-width: 1100px) {
    .demo {
      height: 100%;
    }
    .edit-window {
      height: 450px;
    }

    .profile {
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
    }

    .avatar {
      position: relative;
      left: 0;
    }

    .avatar > img {
      width: 100px;
    }

    .my-info {
      top: -5%;
      left: 10%;
    }

    .edit-area > a {
      position: relative;
      top: 20%;
    }
  }

  @media screen and (max-width: 1100px){
    .edit-window {
      height: 450px;
      width: 70%;
    }

    .profile {
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      height: 90%;
    }

    .avatar {
      position: relative;
      left: 0;
    }

    .avatar > img {
      width: 100px;
    }

    .my-info {
      top: -5%;
      left: 10%;
      align-items: center;
    }

    .edit-area > textarea {
      height: 23%;
    }

    .edit-area > a {
      position: relative;
      top: 20%;
    }

    .demo {
      flex-direction: column;
      opacity: 0.7;
      align-items: center;
    }

    .time-tree {
      margin-top: 40px;
      width: 60%;
      height: 1050px;
    }
  }
</style>
