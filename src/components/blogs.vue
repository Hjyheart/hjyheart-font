<template>
  <div class="main-container">
    <div class="left">
      <router-link to="/blog-editor">写博客</router-link>
    </div>
    <div class="center">
      <AutoSwiper :imgs="imgs" height="300px" class="swiper"></AutoSwiper>
      <div class="message">
        <p v-if="chooseTags.length === 0">{{message}}</p>
        <button v-for="(tag, index) in chooseTags">
          {{tag}}
          <i @click="deleteTag(tag, index)" class="fa fa-times-circle" aria-hidden="true"></i>
        </button>
      </div>
      <div class="blog-list">
        <transition name="slide-fade" v-for="(blog,index) in blogs" :key="blog.mId">
          <div :class="['list-item', activeItem === index ? 'active':'']" @mouseover="itemActive(index)" @mouseout="activeItem=-1" v-if="blog.show">
            <div class="item-img">
              <img :src="blog.mCover" alt="pic" :class="[activeItem === index ? 'active':'']">
            </div>
            <div class="item-body">
              <div class="item-body-desc">
                <router-link :to="{name: 'blog', params: {id: blog.mId}}">{{blog.mTitle}}</router-link>
                <div>
                  <p>{{blog.mDesc}}</p>
                </div>
              </div>
              <div class="item-body-bottom">
                <p><i class="fa fa-calendar" aria-hidden="true"></i> {{blog.mTime}}</p>
                <p><i class="fa fa-eye" aria-hidden="true"></i> {{blog.mHot}}</p>
                <p><i class="fa fa-heart" aria-hidden="true"></i> {{blog.mLike}}</p>
                <p><i class="fa fa-commenting" aria-hidden="true"></i> 0</p>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div :class="['add-more', isDisabled ? 'disabled': '']" @click="loadBlogs"><p :class="[isLoad ? 'animated infinite bounce':'']">{{loadText}}</p></div>
    </div>
    <div class="right">
      <div class="search">
        <input type="text" v-model="keyword">
        <button>
          <i class="fa fa-search"></i>
        </button>
      </div>
      <div class="labels">
        <div v-if="tags.length === 0" style="text-align: center">
          <p>这里空空如也~</p>
        </div>
        <div>
          <div v-for="(tag,index) in tags" class="label">
            <button @click="searchByTag(tag.mName)">{{tag.mName}}( {{tag.mNum}} )</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AutoSwiper from '../vue-swiper/AutoSwiper.vue'
  import {blogFetch, allTagFetch, searchByTags, searchByKeyWords, hottestBlogsFetch} from '../service/fetchs'
  import _ from 'lodash'

  export default {
    data () {
      return {
        title: '日志列表',
        imgs: [
          {
            url: 'http://www.athens.edu/images/coas/programs/computer-science.jpg?x75869',
            title: 'Javascript中的数据结构与算法',
            desc: '本文主要讲述Javascript中实现栈、队列、链表、集合、字典、散列表、树、图等数据结构，以及各种排序.'
          },
          {
            url: 'http://www.jsums.edu/compscience/files/2014/06/compsc.png?x24088',
            title: 'Javascript中的数据结构与算法',
            desc: '本文主要讲述Javascript中实现栈、队列、链表、集合、字典、散列表、树、图等数据结构，以及各种排序.'
          },
          {
            url: 'http://ambassadors.engr.uconn.edu/wordpress/wp-content/uploads/2016/08/MAJORS_online-degrees-computer-science-1600x600.jpg',
            title: 'Javascript中的数据结构与算法',
            desc: '本文主要讲述Javascript中实现栈、队列、链表、集合、字典、散列表、树、图等数据结构，以及各种排序.'
          }
        ],
        blogs: '',
        tags: '',
        activeItem: -1,
        isLoad: false,
        isDisabled: false,
        loadText: '加载更多',
        message: '全部',
        chooseTags: [],
        keyword: ''
      }
    },
    components: {
      AutoSwiper
    },
    created () {
      this.initData()
    },
    methods: {
      /**
       * Active blog items
       * @param index
       */
      itemActive (index) {
        this.activeItem = index
      },
      /**
       * Init data
       * @returns {Promise.<void>}
       */
      async initData (){
        document.title = this.title
        // init swiper
        hottestBlogsFetch().then(res => {
          console.log(res)
          this.imgs = res
        }).catch(err => {
          console.log(res)
        })

        // init blogs
        searchByTags(this.chooseTags, 0, 0).then(res => {
          console.log(res)
          res.map(item => item['show'] = false)
          console.log(res)
          this.blogs = res
          setTimeout(() => this.blogs.forEach(item => item.show = true), 500)
        }).catch(err => {
          console.log(err)
        })
        // init tags
        allTagFetch().then(res => {
          console.log(res)
          this.tags = res
        })
      },
      /**
       * Load blogs async
       * @param e
       * @returns {Promise.<void>}
       */
      async loadBlogs (e) {
        if (this.isDisabled){
          return
        }
        if (this.isLoad){
          return
        }
        this.isLoad = true
        this.loadText = '加载中'
        if (this.keyword !== ''){
          this.search()
        }else{
          searchByTags(this.chooseTags, parseInt(this.blogs.length / 10), this.blogs.length).then(res => {
            console.log(res)
            if (res.length === 0 || res === -1){
              this.isDisabled = true
              this.loadText = '已经加载全部啦'
              this.isLoad = false
              console.log(false)
              return
            }
            res.map(item => item['show'] = false)
            this.blogs = this.blogs.concat(res)
            setTimeout(() => {
              this.blogs.forEach(item => item.show = true)
              this.isLoad = false
              console.log(false)
              this.loadText = '加载更多'
            }, 1000)
          }).catch( err => {
            console.log(err)
            this.isLoad = false
            console.log(false)
            this.loadText = '已经加载全部啦'
          })
        }
      },
      /**
       * Search blogs by tag's name
       * @param name
       */
      searchByTag (name) {
        this.chooseTags.forEach(tag => {
          if (tag === name){
            return
          }
        })
        this.chooseTags = this.chooseTags.concat(name)
      },
      /**
       * Delete tag
       * @param t
       * @param index
       */
      deleteTag (t, index) {
        console.log(index)
        this.chooseTags.splice(index, 1)
        this.isDisabled = false
      },
      /**
       * Search blogs by keyword
       * @param e
       */
      search: _.debounce(
        function () {
          this.isLoad = true
          console.log('ture')
          this.loadText = '加载中'
          if (this.message !== this.keyword){
            this.message = this.keyword
            this.blogs = []
          }
          if (this.keyword === ''){
            this.message = '全部'
          }
          searchByKeyWords(this.keyword, parseInt(this.blogs.length / 10), this.blogs.length).then(res => {
            console.log(res)
            if (res.length === 0 || res === -1){
              this.isDisabled = true
              this.loadText = '已经加载全部啦'
              this.isLoad = false
              console.log(false)
              return
            }
            res.map(item => item['show'] = false)
            this.blogs = this.blogs.concat(res)
            setTimeout(() => {
              this.blogs.forEach(item => item.show = true)
              this.isLoad = false
              console.log(false)
              this.loadText = '加载更多'
          }, 100)
        }).catch(err => {
            console.log(err)
            this.isLoad = false
            console.log(false)
            this.isDisabled = true
            this.loadText = '已经加载全部啦'
        })
      } ,500)
    },
    mounted () {

    },
    watch: {
      chooseTags: function () {
        this.isDisabled = false
        if (this.chooseTags.length === 0 && this.keyword !== ''){
          this.blogs = []
          this.search()
          return
        }
        if (this.isLoad){
          return
        }
        this.isLoad = true
        console.log('ture')
        this.loadText = '加载中'
        this.blogs = []
        searchByTags(this.chooseTags, parseInt(this.blogs.length / 10), this.blogs.length).then(res => {
          console.log('jiong')
          if (res.length === 0 || res === -1){
            this.isDisabled = true
            this.loadText = '已经加载全部啦'
            this.isLoad = false
            console.log('false')
            return
          }
          res.map(item => item['show'] = false)
          this.blogs = this.blogs.concat(res)
          setTimeout(() => {
            this.blogs.forEach(item => item.show = true)
            this.isLoad = false
            console.log(false)
            this.loadText = '加载更多'
          }, 200)
          }).catch( err => {
            console.log(err)
            this.isLoad = false
          console.log(false)
            this.loadText = '已经加载全部啦'
        })
      },
      keyword: function () {
        if (this.keyword === ''){
          this.message = '全部'
        }
        this.isDisabled = false
        this.loadText = '加载更多'
        this.search()
      }
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

  /* main */
  a {
    text-align: center;
  }

  .main-container {
    position: relative;
    top: 60px;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: flex-start;
    width: 80%;
    margin: 0 auto;
  }

  /* left */
  .left {
    width: 20%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
  }

  .left a {
    position: relative;
    top: 20px;
    width: 100px;
    border: 1px solid #0088f5;
    padding: 8px;
    text-decoration: none;
    transition: 0.5s;
    border-radius: 3px;
    color: #0088f5;
  }

  .left a:hover {
    color: white;
    background-color: #0088f5;
  }

  /* center */
  .center {
    width: 50%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .swiper {
    position: relative;
    top: 20px;
  }

  .message {
    background-color: white;
    width: 100%;
    margin-top: 40px;
    text-align: center;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: flex-start;
  }

  .message p {
    margin: 7px auto;
    font-size: 1.2em;
  }

  .message button {
    margin: 7px;
    height: 20px;
    border: none;
    background-color: #E4E4E4;
    cursor: pointer;
  }

  .blog-list {
    margin-top: 10px;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }

  .list-item {
    margin-top: 10px;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: flex-start;
    background: white;
    height: 140px;
    width: 100%;
    transition: 0.5s;
  }

  .item-img {
    margin: 5px;
    width: 200px;
    height: 150px;
  }

  .list-item img {
    width: 200px;
    height: 130px;
    max-width: calc(200px + .5em);
    transition: 1s;
  }

  .active img {
    transform: scale(1.05, 1.05);
  }

  .list-item.active {
    background: #E4E4E4;
  }

  .item-body {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 5px;
    opacity: 0.6;
  }

  .item-body-desc {
    text-align: left;
  }

  .item-body-desc a {
    position: relative;
    font-weight: 700;
    font-size: 1.2em;
    top: 5px;
    color: black;
    text-decoration: none;
    transition: 0.5s;
  }

  .item-body-desc a:hover {
    padding-left: 40px;
    font-weight: 800;
  }

  .item-body-desc > div {
    margin-top: 10px;
    height: 85px;
    overflow-y: auto;
  }

  .item-body-desc > div > p {
    padding-top: 4px;
    font-size: 0.8em;
  }

  .item-body-bottom {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
  }

  .item-body-bottom > p {
    margin-right: 20px;
  }

  .add-more {
    margin-bottom: 100px;
    border: 1px solid #0088f5;
    opacity: 0.7;
    text-align: center;
    padding: 10px;
    color: #0088f5;
    cursor: pointer;
    transition: 0.5s;
  }

  .add-more:hover {
    color: white;
    background: #0088f5;
  }

  .disabled {
    color: gray;
    cursor: not-allowed;
    border: 1px solid gray;
  }

  .disabled.add-more:hover {
    color: gray;
    background: none;
  }

  /* right */
  .right {
    width: 30%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
  }

  .search {
    position: relative;
    top: 20px;
    width: 80%;
    height: 40px;
    background-color: white;
  }

  .search input {
    position: relative;
    width: 80%;
    height: 2.3em;
    margin: 6px 0 6px 5px;
    background-color: #E4E4E4;
    border: none;
    transition: 0.5s;
    float: left;
  }

  .search input:hover {
    background-color: #CFCFCF;
  }

  .search button {
    margin-top: 6px;
    width: 2.3em;
    height: 2.3em;
    background-color: #CFCFCF;
    border: none;
    float: left;
    cursor: pointer;
  }
  .search > i {
    background-color: #CFCFCF;
  }

  .labels {
    margin-top: 40px;
    width: 80%;
    height: 400px;
    background-color: white;
  }

  .labels > div {
    overflow-y: auto;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 10px;
  }

  .label {
    margin:5px 10px;
  }

  .label > button {
    height: 30px;
    border: none;
    background-color: #E4E4E4;
    cursor: pointer;
  }
</style>
