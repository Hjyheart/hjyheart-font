<template>
  <div class="md">
    <loader :loaderClass="loadClass" :loadText="loadText"></loader>
    <input type="text" class="title" placeholder="请输入题目..." v-model="blogTitle">
    <a class="add-tag" @click="openTagInputModal">新建标签</a>
    <bubble ref="bubble" :tags="tags" class="bubble" @select="showTag"></bubble>
    <div class="tags-wall">
      <h2>标签墙</h2>
      <hr>
      <div>
        <h3 v-if="selectTags.length === 0">这里空空如也~</h3>
        <button v-for="(t, index) in selectTags">
          {{t}}
          <i @click="deleteTag(t, index)" class="fa fa-times-circle" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    <div class="upload-pic">
      <a @click="uploadFile">封面上传</a>
      <input type="file" id="cover" style="display: none"/>
      <hr>
      <div>
        <img :src="cover" alt="" v-if="cover !== ''">
      </div>
    </div>
    <div class="upload-pics" style="top: 60%;">
      <a @click="uploadPics">图片上传</a>
      <input type="file" id="pics" style="display: none"/>
      <hr>
      <div style="overflow-y: auto; max-height: 200px">
        <div v-for="(pic,index) in pics">
          <img :src="pic.url" alt="">
          <p style="width: 100px">http://or2n55chj.bkt.clouddn.com/{{pic.key}}</p>
        </div>
      </div>
    </div>
    <markdownEditor ref="markdown"></markdownEditor>
    <div class="buttons">
      <a class="left" @click="openDescModal">确认提交</a>
      <a class="right" @click="openCancelModal">取消</a>
    </div>
    <confirmModal ref="submitModal" @confirm="getValue">
      <h1 slot="modal-header">确认提交</h1>
      <p slot="modal-body">确认提交该日志？</p>
    </confirmModal>
    <confirmModal ref="cancelModal" @confirm="cancel">
      <h1 slot="modal-header">确认退出</h1>
      <p slot="modal-body">确认退出编辑？</p>
    </confirmModal>
    <inputModal ref="inputTagModal" @confirm="addBubble">
      <h1 slot="modal-header">标签创建</h1>
      <input slot="modal-body" type="text" class="input-tag" v-model="newTag"/>
    </inputModal>
    <inputModal ref="inputDescModal" @confirm="openSubmitBlogModal">
      <h1 slot="modal-header">添加日志描述</h1>
      <input slot="modal-body" type="text" class="input-tag" v-model="desc"/>
    </inputModal>
    <defaultModal ref="defaultModal">
      <h1 slot="modal-header">{{messageHeader}}</h1>
      <p slot="modal-body">{{messageBody}}</p>
    </defaultModal>
  </div>
</template>

<script>
  import inputModal from '../modals/input-modal.vue'
  import confirmModal from '../modals/confirm-modal.vue'
  import defaultModal from '../modals/default-modal.vue'
  import bubble from '../vue-bubble/bubble.vue'
  import loader from '../vue-loader/loader.vue'
  import markdownEditor from '../vue-simplemde/markdown.vue'
  import {submitBlog, uploadCover, allTagFetch, createNewTag} from '../service/fetchs'

  import $ from 'jquery'


  export default {
    data () {
      return {
        title: '日志管理',
        blogTitle: '',
        loadClass: 'loader loader-default',
        loadText: '等待中...',
        tags: [],
        selectTags: [],
        newTag: '',
        cover: '',
        desc: '',
        key: '',
        pics: [],
        messageHeader: '',
        messageBody: ''
      }
    },
    components: {
      markdownEditor,
      loader,
      bubble,
      defaultModal,
      confirmModal,
      inputModal
    },
    methods: {
      /**
       * Open submitBlogModal
       * @param e
       */
      openSubmitBlogModal (e) {
        this.$refs.inputDescModal.hide()
        this.$refs.submitModal.open();
      },
      /**
       * Open descModal
       * @param e
       */
      openDescModal (e) {
        this.$refs.inputDescModal.open()
      },
      /**
       * Open cancelModal
       * @param e
       */
      openCancelModal (e) {
        this.$refs.cancelModal.open();
      },
      /**
       * Cancel submission
       * @param e
       */
      cancel (e) {
        this.$refs.cancelModal.hide();
        this.$router.push('/blogs')
      },
      /**
       * Open TagInputModal
       * @param e
       */
      openTagInputModal (e) {
        this.$refs.inputTagModal.open();
      },
      /**
       * Get blog's value and submit
       * TODO: 缺失报警机制
       * @param e
       */
      getValue (e) {
        if (this.blogTitle === ''){
          this.messageHeader = '标题错误'
          this.messageBody = '小主没写博客标题。。。sad！'
          this.$refs.submitModal.hide()
          this.$refs.defaultModal.open()
          return
        }

        this.$refs.submitModal.hide();
        this.loadText = '等待中...';
        this.loadClass = 'loader loader-default is-active';
//        let val = '';
//        let texts = document.getElementsByClassName('CodeMirror-line');
//
//        for (let i = 0; i < texts.length; i++){
//          let spans = texts[i].getElementsByTagName('span');
//          val += spans[0].textContent + '\n';
//        }
        console.log(this.$refs.markdown.content)

        var formData = new FormData()
        formData.append('title', this.blogTitle)
        formData.append('desc', this.desc)
        formData.append('cover', this.key)
        formData.append('tags', '[' + this.selectTags.toString() + ']')
        formData.append('value', this.$refs.markdown.content)

        submitBlog(formData).then(res => {
          console.log(res)
          setTimeout(() => {
            this.loadText = '成功！';
            setTimeout(() => {
              this.loadClass = 'loader loader-default';
              this.loadText = '等待中...';
              this.$router.push('blogs')
            }, 1000);
          }, 1000);
        }).catch(err => {
          console.log(err)
          setTimeout(() => {
            this.loadText = '文章走丢了。。。sad!';
            setTimeout(() => {
              this.loadClass = 'loader loader-default';
              this.loadText = '等待中...';
            }, 1000);
          }, 1000);
        })

      },
      /**
       * Add new tag
       * @param e
       * TODO: 加载实际tag
       */
      addBubble (e) {
        if (this.newTag === ''){
          return
        }
        createNewTag(this.newTag).then(res => {
          if (res === 1){
            console.log(this.newTag + ' create success')
            this.tags.push(this.newTag)
            this.newTag = ''
          }else if (res === 0){
            console.log(this.newTag + ' is exist')
            this.messageHeader = '失败'
            this.messageBody = '标签已存在'
            this.$refs.defaultModal.open()
          }
        }).catch(err => {
          console.log(err)
          this.messageHeader = '失败'
          this.messageBody = '网络连接不稳定 创建失败'
          this.$refs.defaultModal.open()
        })
        this.$refs.inputTagModal.hide()
      },
      /**
       * Transmit tag to the wall
       * @param tag
       * @param id
       */
      showTag (tag, id) {
        this.selectTags.push(tag)
        this.tags.splice(id, 1)
      },
      /**
       * Remove tag from the wall
       * @param t
       * @param index
       */
      deleteTag (t, index) {
        this.selectTags.splice(index, 1)
        this.tags.push(t)
      },
      /**
       * Upload cover
       * @param e
       */
      uploadFile (e){
        $('#cover').click()
        $('#cover').change(() => {
          let formData = new FormData()
          formData.append('cover', $('#cover')[0].files[0])
          uploadCover(formData).then(res =>{
            console.log(res)
            this.key = res['key']
            this.cover = res['imgUrl']
          }).catch(err => {
            console.log(err)
          })
          $('#cover').after($('#cover').clone().val(""));
          $('#cover').remove();
        })
      },
      /**
       *  Upload pics
       *  @param e
       */
      uploadPics (e) {
        $('#pics').click()
        $('#pics').change(() => {
          let formData = new FormData()
          formData.append('cover', $('#pics')[0].files[0])
          uploadCover(formData).then(res =>{
            console.log(res)
            this.pics.push({
              key: res['key'],
              url: res['imgUrl']
            })
          }).catch(err => {
            console.log(err)
          })
          $('#pics').after($('#pics').clone().val(""));
          $('#pics').remove();
        })
      },
      /**
       * Init data
       * @returns {Promise.<void>}
       */
      async initData () {
        document.title = this.title
        allTagFetch().then(res => {
          console.log(res)
          let tmp = []
          res.forEach(item => {
            tmp.push(item.mName)
          })
          this.tags = tmp
          this.tags.push()
          setTimeout(() => this.$refs.bubble.flush(), 200)
        }).catch(err => {
          console.log(err)
        })
      }

    },
    created () {
      this.initData()
    },
    mounted () {
      console.log('edit')
    }
  }
</script>


<style scoped>
  .md {
    position: relative;
    top: 60px;
    text-align: left;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }

  .title {
    top: 30px;
    margin-bottom: 40px;
    position: absolute;
    border-bottom: 1px solid #0088f5;
    border-top: none;
    border-left: none;
    border-right: none;
    background: transparent;
    font-size: 2em;
    text-align: center;
    z-index: 1;
  }

  .buttons {
    position: relative;
    top: -40px;
    height: 100px;
    margin-top: 60px;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
  }

  .buttons > a {
    border: 1px solid;
    padding: 8px;
    text-decoration: none;
    transition: 0.5s;
    border-radius: 3px;
  }

  .buttons > a:hover {
    color: white;
  }

  .left {
    margin-right: 20px;
    border-color: #0088f5 !important;
    color: #0088f5;
    cursor: pointer;
  }

  .left:hover {
    background-color: #0088f5;
  }

  .right {
    margin-left: 20px;
    border-color: red !important;
    color: red;
    cursor: pointer;
  }

  .right:hover {
    background-color: red;
  }

  /* bubbles tags */
  .bubble {
    position: absolute;
    width: 25%;
    height: 500px;
    left: 2%;
    top: 20%;
    z-index: 6;
  }

  .add-tag {
    position: absolute;
    left: 12%;
    top: 10%;
    border: 1px solid;
    padding: 8px;
    text-align: center;
    text-decoration: none;
    transition: 0.5s;
    border-radius: 3px;
    border-color: #0088f5 !important;
    color: #0088f5;
    cursor: pointer;
  }

  .add-tag:hover {
    background-color: #0088f5;
    color: white;
  }

  /* selected tags */
  .tags-wall {
    position: absolute;
    background-color: white;
    min-height: 100px;
    width: 25%;
    right: 2%;
    top: 12%;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
  }

  .tags-wall > h2 {
    color: #0088f5;
    padding: 10px;
    margin: 0 auto;

  }

  .tags-wall > div {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    width: 100%;
    flex-wrap: wrap;
  }

  .tags-wall > div > button {
    margin: 10px;
    height: 3em;
    border: none;
    background-color: #E4E4E4;
    cursor: pointer;
  }

  .tags-wall > div > div > a {
    width: 100px;
    margin: 10px;
    border: 1px solid;
    padding: 8px;
    text-decoration: none;
    transition: 0.5s;
    border-radius: 3px;
  }

  .blue {
    border-color: #0088f5;
    color: #0088f5;
  }

  .red {
    border-color: red;
    color: red;
  }

  .green {
    border-color: green;
    color: green;
  }

  .purple {
    border-color: purple;
    color: purple;
  }

  .tags-wall i {
    position: relative;
    left: 3%;
    cursor: pointer;
  }

  hr {
    min-width: 80%;
  }

  .tags-wall h3 {
    margin: 10px auto;
  }

  /* input tag */
  .input-tag {
    padding-top: 30px;
    font-size: 1.5em;
    text-align: center;
    border: none;
    border-bottom: 2px solid #0088f5;
  }

  /* upload photos */
  .upload-pic {
    position: absolute;
    background-color: white;
    min-height: 100px;
    width: 25%;
    right: 2%;
    top: 30%;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
  }

  .upload-pic a {
    margin: 10px;
    border: 1px solid;
    padding: 8px;
    text-decoration: none;
    transition: 0.5s;
    border-radius: 3px;
    border-color: #0088f5 !important;
    color: #0088f5;
    cursor: pointer;
  }

  .upload-pic div {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
  }

  .upload-pic img {
    max-height: 150px;
    cursor: pointer;
    margin: 10px;
  }

  .upload-pic a:hover {
    background-color: #0088f5;
    color: white;
  }

  .upload-pics {
    position: absolute;
    background-color: white;
    min-height: 100px;
    width: 25%;
    right: 2%;
    top: 30%;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
  }

  .upload-pics a {
    margin: 10px;
    border: 1px solid;
    padding: 8px;
    text-decoration: none;
    transition: 0.5s;
    border-radius: 3px;
    border-color: #0088f5 !important;
    color: #0088f5;
    cursor: pointer;
  }

  .upload-pics div {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
  }

  .upload-pics a:hover {
    background-color: #0088f5;
    color: white;
  }

  .upload-pics > div {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
  }

  .upload-pics > div > div {
    display: block;
    transition: 0.5s;
    margin: 10px auto;
  }

  .upload-pics img {
    width: 80%;
    max-height: 150px;
    cursor: pointer;
    padding: 0;
    margin: 0 auto;
  }
</style>
