<template>
  <div class="markdown-editor">
    <textarea></textarea>
  </div>
</template>

<script>
  import SimpleMDE from 'simplemde';

  export default {
    name: 'markdown-editor',
    props: {
      value: String,
      previewClass: String,
      customTheme: {
        type: Boolean,
        default() {
          return false;
        },
      },
      configs: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    ready() {
      this.initialize();
      this.syncValue();
    },
    mounted() {
      this.initialize();
    },
    methods: {
      initialize() {
        let configs = {};
        Object.assign(configs, this.configs);
        configs.element = configs.element || this.$el.firstElementChild;
        configs.initialValue = configs.initialValue || this.value;

        // 实例化编辑器
        this.simplemde = new SimpleMDE(configs);

        // 判断是否开启代码高亮
        if (configs.renderingConfig && configs.renderingConfig.codeSyntaxHighlighting) {
          require.ensure([], () => {
            const theme = configs.renderingConfig.highlightingTheme || 'default';
            window.hljs = require('highlight.js');
            require(`highlight.js/styles/${theme}.css`);
          }, 'highlight');
        }

        // 判断是否引入样式文件
        if (!this.customTheme) {
          require('simplemde/dist/simplemde.min.css');
        }

        // 添加自定义 previewClass
        const className = this.previewClass || '';
        this.addPreviewClass(className);

        // 绑定事件
        this.bindingEvents();
      },
      bindingEvents() {
        this.simplemde.codemirror.on('change', () => {
          this.$emit('input', this.simplemde.value());
        });
      },
      addPreviewClass(className) {
        const wrapper = this.simplemde.codemirror.getWrapperElement();
        const preview = document.createElement('div');
        wrapper.nextSibling.className += ` ${className}`;
        preview.className = `editor-preview ${className}`;
        wrapper.appendChild(preview);
      },
      syncValue() {
        this.simplemde.codemirror.on('change', () => {
          this.value = this.simplemde.value();
        });
      },
    },
    destroyed() {
      this.simplemde = null;
    },
    watch: {
      value(val) {
        if (val === this.simplemde.value()) return;
        this.simplemde.value(val);
      },
    },
  };
</script>

<style>
  .markdown-editor {
    margin-top: 100px;
    width: 40%;
  }

  .markdown-editor .markdown-body {
    padding: 0.5em;
  }

  .markdown-editor .editor-preview-active, .markdown-editor .editor-preview-active-side {
    display: block;
  }

  .editor-toolbar.fullscreen {
    z-index: 10000 !important;
  }

  .CodeMirror {
    height: 550px !important;
  }

  .editor-preview-side, .editor-preview-active-side {
    position: fixed;
    bottom: 0;
    width: 50%;
    top: 50px;
    right: 0;
    z-index: 9;
    border: 1px solid #ddd;
    background-color: #fafafa !important;
  }

  /* # */
  .editor-preview-side, .editor-preview-active-side > h1, h2, h3, h4, h5, h6 {
    display: block;
    font-weight: bold;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
  }

  .editor-preview, .editor-preview-active > h1, h2, h3, h4, h5, h6 {
    display: block;
    font-weight: bold;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
  }

  .editor-preview-side, .editor-preview-active-side > h1, h2 {
    padding-bottom: .3em;
    border-bottom: 1px solid #eee;
  }

  .editor-preview, .editor-preview-active > h1, h2 {
    padding-bottom: .3em;
    border-bottom: 1px solid #eee;
  }

  .editor-preview-side, .editor-preview-active-side > h1 {
    font-size: 2em !important;
    -webkit-margin-after: 0.67em;
  }

  .editor-preview, .editor-preview-active > h1 {
    font-size: 2em !important;
    -webkit-margin-after: 0.67em;
  }

  .editor-preview-side, .editor-preview-active-side > h2 {
    font-size: 1.5em;
    -webkit-margin-after: 0.83em;
  }

  .editor-preview, .editor-preview-active > h2 {
    font-size: 1.5em;
    -webkit-margin-after: 0.83em;
  }

  .editor-preview-side, .editor-preview-active-side > h3 {
    font-size: 1.17em;
    -webkit-margin-after: 1em;
  }

  .editor-preview, .editor-preview-active > h3 {
    font-size: 1.17em;
    -webkit-margin-after: 1em;
  }

  .editor-preview-side, .editor-preview-active-side > h4 {
    -webkit-margin-after: 1.33em;
  }

  .editor-preview, .editor-preview-active > h4 {
    -webkit-margin-after: 1.33em;
  }

  .editor-preview-side, .editor-preview-active-side > h5 {
    font-size: 0.83em;
    -webkit-margin-after: 1.67em;
  }

  .editor-preview, .editor-preview-active > h5 {
    font-size: 0.83em;
    -webkit-margin-after: 1.67em;
  }

  .editor-preview-side, .editor-preview-active-side > h6 {
    font-size: 0.67em;
    -webkit-margin-after: 2.33em;
  }

  .editor-preview, .editor-preview-active > h6 {
    font-size: 0.67em;
    -webkit-margin-after: 2.33em;
  }

  /* - && 1 */
  .editor-preview-side, .editor-preview-active-side > ul, menu, dir {
    display: block;
    list-style-type: disc;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 40px;
  }

  .editor-preview, .editor-preview-active > ul, menu, dir {
    display: block;
    list-style-type: disc;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 40px;
  }

  .editor-preview-side, .editor-preview-active-side > ol {
    display: block;
    list-style-type: decimal;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 40px;
  }

  .editor-preview, .editor-preview-active> ol {
    display: block;
    list-style-type: decimal;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 40px;
  }

  /* > */
  blockquote {
    display: block;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 5px;
    -webkit-margin-end: 40px;
    font-size: 0.6em !important;
  }

  .editor-preview-side, .editor-preview-active-side >  blockquote {
    padding: 0 1em;
    color: #777;
    border-left: .25em solid #ddd;
  }

  .editor-preview, .editor-preview-active >  blockquote {
    padding: 0 1em;
    color: #777;
    border-left: .25em solid #ddd;
  }

  /* ** */
  .editor-preview-side, .editor-preview-active-side strong {
    font-weight: 600;
  }

  .editor-preview, .editor-preview-active strong {
    font-weight: 600;
  }

  /* table */
  .editor-preview-side, .editor-preview-active-side table {
    padding-top: 20px;
    background-color: #fafafa !important;
    display: block;
    width: 100%;
    overflow: auto;
    border-spacing: 0;
    border-collapse: collapse;
    border-color: grey;
  }

  .editor-preview, .editor-preview-active table {
    padding-top: 20px;
    background-color: #fafafa !important;
    display: block;
    width: 100%;
    overflow: auto;
    border-spacing: 0;
    border-collapse: collapse;
    border-color: grey;
  }

  .editor-preview-side, .editor-preview-active-side thead {
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
  }

  .editor-preview, .editor-preview-active thead {
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
  }

  .editor-preview-side, .editor-preview-active-side tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
  }

  .editor-preview, .editor-preview-active tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
  }

  .editor-preview-side, .editor-preview-active-side table > tbody > tr {
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: table-row;
    vertical-align: inherit;
  }

  .editor-preview, .editor-preview-active table > tbody > tr {
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: table-row;
    vertical-align: inherit;
  }

  .editor-preview-side, .editor-preview-active-side thead > tr > th {
    background-color: white;
    padding: 6px 13px;
    border: 1px solid #ddd;
  }

  .editor-preview, .editor-preview-active thead > tr > th {
    background-color: white;
    padding: 6px 13px;
    border: 1px solid #ddd;
  }

  .editor-preview-side, .editor-preview-active-side tbody tr:nth-child(2n) {
    background-color: #f8f8f8;
  }

  .editor-preview, .editor-preview-active tbody tr:nth-child(2n) {
    background-color: #f8f8f8;
  }

  .editor-preview-side, .editor-preview-active-side table th {
    display: table-cell;
    padding: 6px 13px;
    border: 1px solid #ddd;
    font-weight: 700;
  }

  .editor-preview, .editor-preview-active table th {
    display: table-cell;
    padding: 6px 13px;
    border: 1px solid #ddd;
    font-weight: 700;
  }

  .editor-preview-side, .editor-preview-active-side table td {
    padding: 6px 13px;
    border: 1px solid #ddd !important;
  }

  .editor-preview, .editor-preview-active table td {
    padding: 6px 13px;
    border: 1px solid #ddd !important;
  }

</style>
