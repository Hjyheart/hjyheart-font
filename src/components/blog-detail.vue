<template>
  <transition name="slide-fade">
    <div class="main-container" v-if="show">
      <div class="left markdown-body">
        <vue-markdown v-for="(item, index) in blog.mValue" :key="index" class="markdown">{{item}}</vue-markdown>
      </div>
      <div class="right">
        <div class="relative">
          <router-link :to="{name: 'blogs'}">返回</router-link>
          <hr>
          <p>本文于{{blog.mTime}}发表</p>
          <p>作者：Hjyheart</p>
          <p>相关标签：<span v-for="tag in blog.mTags">{{tag.mName}}</span></p>
          <p>版权声明：自由转载-署名-非商业性使用</p>
        </div>
        <div class="articles">
          <div class="art-title"><img src="../assets/list.svg" alt=""><p>相关文章</p></div>
          <hr>
          <div class="art-link">
            <a v-for="(item,index) in sameTagBlogs" v-if="item.mTitle !== blog.mTitle" :key="index" @click="changeBlog(item.mId)">{{item.mTitle}}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import VueMarkdown from 'vue-markdown'
  import {blogDetailFetch, searchByTags} from '../service/fetchs'
  require('../../node_modules/github-markdown-css/github-markdown.css')

  export default {
    data () {
      return {
        title: '博客详情',
        id: this.$route.params.id,
        blog: '',
        sameTagBlogs: [],
        show: true
      }
    },
    components: {
      VueMarkdown
    },
    methods: {
      async initData (val) {
        this.show = false
        await blogDetailFetch(val).then(res => {
          console.log(res)
          this.blog = res
        }).catch(err => {
          console.log(err)
        })

        await searchByTags(this.blog.mTags[0].mName, 0, 0).then(res => {
          console.log(res)
          this.sameTagBlogs = res
        }).catch(err => {
          console.log(err)
        })
        this.show = true
      },
      async changeBlog (id) {
        console.log(id)
        await this.$router.push({name: 'blog', params:{id: id}})
        await this.initData(id)
      }
    },
    mounted () {

    },
    created () {
      document.title = this.title
      this.initData(this.id)
    }
  }
</script>

<style scoped>
  /* animation */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-active {
    transform: translateX(10px);
    opacity: 0;
  }

  .main-container {
    position: relative;
    top: 60px;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: flex-start;
    width: 70%;
    margin: 0 auto;
    margin-bottom: 100px;
  }

  a {
    text-align: center;
    text-decoration: none;
    cursor: pointer;
  }

  /* left */
  .left {
    background-color: white;
    padding: 10px;
    width: 60%;
    margin-top: 10px;
  }

  /* right */
  .right {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    padding: 10px;
    width: 25%;
  }

  .relative {
    background-color: white;
    padding: 10px;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
  }

  .relative a {
    border: 1px solid red;
    opacity: 0.7;
    text-align: center;
    padding: 8px 30px;
    color: red;
    cursor: pointer;
    transition: 0.5s;
    border-radius: 4px;
  }

  .relative a:hover {
    color: white;
    background: red;
  }

  .relative hr {
    margin: 10px;
    width: 90%;
  }

  .relative p {
    align-self: flex-start;
    margin-left: 10px;
    margin-bottom: 10px;
  }

  .articles {
    background-color: white;
    margin-top: 20px;
    padding:5px;
    padding-bottom: 20px;
  }

  .art-title {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-self: flex-start;
    margin-bottom: 20px;
  }

  .art-title img {
    margin-top: 10px;
    width: 20px;
    height: 20px;
  }

  .art-title p {
    margin-left: 10px;
    margin-top: 13px;
  }

  .art-link {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .articles > div >   a {
    margin-top: 5px;
    margin-left: 10px;
  }

  .articles hr {
    margin:10px;
    width: 90%;
  }

</style>
