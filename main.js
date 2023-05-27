import { displayArticles } from './utils/articleService.js';
import { showAuthorBlogs } from './utils/authorService.js';
import env from './utils/env.js';


$(document).ready(function() {
    var currentPage = 1; 

    fetchArticles(currentPage)
        .then(function(articles) {
            displayArticles(articles, currentPage);
            addPagination(articles, currentPage);
        })
        .catch(function(error) {
            console.log('Error:', error);
        });
});

function fetchArticles() {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: `${env.API_HOST_GLOBAL}/posts`,
            method: 'GET',
            success: (response) => {
                resolve(response);
            },
            error:  (error) => {
                reject(error);
            }
        });
    });
}

function addPagination(articles, currentPage) {
    var blogsPerPage = 5; 
    var totalPages = Math.ceil(articles.length / blogsPerPage);

    var paginationContainer = $('#pagination');
    paginationContainer.empty();

    for (var i = 1; i <= totalPages; i++) {
        var pageLink = $('<a>').text(i);
        pageLink.click(function() {
            var page = parseInt($(this).text());
            displayArticles(articles, page);
            addPagination(articles, page);
        });

        if (i === currentPage) {
            pageLink.addClass('active');
        }

        paginationContainer.append(pageLink);
    }
}

$(document).on('click', 'li', function() {
    console.log($(this).text().split(' : ')[1])
    var authorId = $(this).text().split(' : ')[1];

    
    //  request to fetch author details
    $.ajax({
        url: `${env.API_HOST_GLOBAL}/users/` + authorId,
        method: 'GET',
        success: function(author) {
            var authorDetails = $('#author-details');
            authorDetails.empty();

            var authorInfo = $('<h3>').text(author.name);
            var authorEmail = $('<p>').text('Email: ' + author.email);
            var authorWebsite = $('<p>').text('Website: ' + author.website);

            authorDetails.append(authorInfo, authorEmail, authorWebsite);
            showAuthorBlogs(authorId);
        }
    });
});