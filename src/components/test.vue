<template>
  <div class="markdown">
    <vue-markdown :source="source"></vue-markdown>
  </div>
</template>

<script>
  import VueMarkdown from 'vue-markdown'

  export default {
    data () {
      return {
        title: 'test',
        source: '``` javascript\n' +
          'var foo = function (bar) {\n' +
          '    return bar++;\n' +
          '};\n' + '```'
      }
    },
    components: {
      VueMarkdown
    },
    mounted () {
      document.title = this.title
    }
  }

</script>

<style scoped>
  .markdown {
    position: relative;
    top: 60px;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: flex-start;
    width: 80%;
    margin: 0 auto;
  }

</style>
