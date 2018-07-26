
/**
 * get query 参数 {params}
 * post data 数据 {data}
 * url 拼接参数 {urlParams}
 */

module.exports = {
    getPosts: {url: '/api/posts/{page}'},
    getPostsDetail: {url: '/api/postsDetail/{postId}'},
    createPosts: {url: '/api/posts/create', method: 'POST'}
}

