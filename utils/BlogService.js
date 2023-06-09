import env from './env.js';

export function displayBlogs(articles, page) {
    var articlesList = $('#articles-list');
    // empty the older articleList Conext 
    articlesList.empty();
    // blogs shown in a single page default 5
    var blogsPerPage = 5;
    var startIndex = (page - 1) * blogsPerPage;
    var endIndex = startIndex + blogsPerPage;
    var paginatedArticles = articles.slice(startIndex, endIndex);

    paginatedArticles.forEach(function(article) {

        var listItem = $('<li>');
        var articleLink = $('<a>').text(article.title);
        articleLink.click(function() {
            showBlogDetails(article);
        });
        listItem.append(articleLink);
        listItem.append(' Author id : ' + article.userId);
        articlesList.append(listItem);
    });
}

export function showBlogDetails(article) {
    var articleDetails = $('#article-details');
    articleDetails.empty();

    //  request to fetch article details
    $.ajax({
        url: `${env.API_HOST_GLOBAL}/posts/` + article.id,
        method: 'GET',
        success: function(response) {
            var articleBody = $('<p>').text(response.body);
            articleDetails.append(articleBody);
            showComments(article.id);
        }
    });
}
// get comments 
export function showComments(articleId) {
    //  request to fetch comments for the article
    $.ajax({
        url: `${env.API_HOST_GLOBAL}/comments`,
        method: 'GET',
        data: { postId: articleId },
        success: function(response) {
            var comments = response;
            var commentsList = $('<ul>');
            comments.forEach(function(comment) {
                var listItem = $('<li>').text(comment.body);
                commentsList.append(listItem);
            });
            $('#article-details').append(commentsList);
        }
    });
}