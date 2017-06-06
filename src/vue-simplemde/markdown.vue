<template>
  <markdown-editor :custom-theme="true" v-model="content" ref="markdownEditor" :configs="configs"></markdown-editor>
</template>

<script>
  import markdownEditor from './markdown-editor.vue'
  import 'simplemde-theme-base/dist/simplemde-theme-base.min.css'

  export default {
    components: {
      markdownEditor
    },
    data () {
      return {
        content: '',
        configs: {
          status: false, // 禁用底部状态栏
          initialValue: '#', // 设置初始值
          renderingConfig: {
            codeSyntaxHighlighting: true, // 开启代码高亮
            highlightingTheme: 'atom-one-light' // 自定义代码高亮主题，可选列表(https://github.com/isagalaev/highlight.js/tree/master/src/styles)
          }
        }
      }
    }
  }

</script>

<style scoped>

</style>
