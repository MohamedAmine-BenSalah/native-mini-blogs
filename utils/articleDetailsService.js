import env from "./env.js";

export function showBlogsDetails(article) {
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