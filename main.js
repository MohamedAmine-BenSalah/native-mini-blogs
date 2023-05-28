import { displayBlogs } from './utils/BlogService.js';
import { showAuthorBlogs } from './utils/authorService.js';
import {hideLoader,showLoader} from "./utils/Loader.js"
import env from './utils/env.js';


$(document).ready(function() {
    var currentPage = 1; 
    showLoader();

    fetchBlogs(currentPage)
        .then(function(articles) {
            displayBlogs(articles, currentPage);
            addPagination(articles, currentPage);
        })
        .catch(function(error) {
            console.log('Error:', error);
        })
        .finally(function() {
            hideLoader();
        });
});

function fetchBlogs() {
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
    // setting total pages to render all pagination
    var totalPages = Math.ceil(articles.length / blogsPerPage);
    // creating pagination element
    var paginationContainer = $('#pagination');
    // if there was un update to the pagination it will be reseted
    paginationContainer.empty();

    for (var i = 1; i <= totalPages; i++) {
        // get the number of current page from HTML directly 
        var pageLink = $('<a>').text(i);
        pageLink.click(function() {
            var page = parseInt($(this).text());
            displayBlogs(articles, page);
            addPagination(articles, page);
        });

        if (i === currentPage) {
            // if i is the current page we change the style =>
            pageLink.addClass('active');
        }

        paginationContainer.append(pageLink);
    }
}

$(document).on('click', 'li', function() {
    // getting the id of the other with an onclick that retrives the id from the html text 
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

