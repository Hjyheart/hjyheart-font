/**
 * Created by hongjiayong on 2017/5/29.
 */
import fetch from './getData'
import upload from './upLoad'

// blogs.vue
var blogFetch = (id, num) => fetch('GET', 'blog/get-blogs', {pageId: id, number: num});

var allTagFetch = () => fetch('GET', 'tag/get-all-tags', {});

var searchByTags = (tags, id, num) => fetch('POST', 'blog/get-blogs-tags', {pageId: id, number: num, tags: '[' + tags + ']'});

var searchByKeyWords = (keyword, id, num) => fetch('GET', 'blog/get-blogs-search', {pageId: id, number: num, keyword: keyword});

var hottestBlogsFetch = () => fetch('GET', 'blog/get-hottest-blogs', {});

// blog-editor.vue
var submitBlog = (data) => upload('POST', 'blog/add-blog', data);

var uploadCover = (data) => upload('POST', 'blog/add-blog-cover', data);

var createNewTag = (tagName) => fetch('POST', 'tag/add-tag', {name: tagName});

// blog-detail.vue
var blogDetailFetch = (id) => fetch('GET', 'blog/get-blog-id', {ID: id});

export {blogFetch, allTagFetch, searchByTags, searchByKeyWords, hottestBlogsFetch, submitBlog, uploadCover, createNewTag, blogDetailFetch}
