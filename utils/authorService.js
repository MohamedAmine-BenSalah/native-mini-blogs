import env from "./env.js";

export function showAuthorBlogs(authorId) {
    // request to fetch articles by the author
    $.ajax({
        url: `${env.API_HOST_GLOBAL}/posts`,
        method: 'GET',
        data: { userId: authorId },
        success: function(response) {
            var authorArticles = response;
            var authorArticlesList = $('<ul>');
            authorArticles.forEach(function(article) {
                var listItem = $('<li>');
                var articleLink = $('<a>').text(article.title);
                listItem.append(articleLink);
                authorArticlesList.append(listItem);
            });
            $('#author-details').append(authorArticlesList);
        }
    });
}