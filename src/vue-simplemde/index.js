/**
 * Created by hongjiayong on 2017/5/20.
 */
var markdownEditor = require('./markdown-editor.vue');

var VueSimplemde = {
  markdownEditor: markdownEditor,
  install: function(Vue) {
    Vue.component('markdown-editor', markdownEditor);
  },
};

module.exports = VueSimplemde;
