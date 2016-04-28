(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  /*
  articlesController.loadById is called on the routes.js file when a URL of artle/anything is called .
  This method creates a function articleData and calls Article.findWhere then passing the string to search for,
  the value, and the function articleData.
  articleData then is passed to the webdb .execute method where it is then invoked on the search results.
  articleData when finished then calls next() received from the routes.js file, articlesController.index
  */
  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  /*
  articlesController.loadByAuthor is a function that takes the param obj ctx and the next function. It then calls the function articlesController.loadByAuthor to specifiy data and then looks to Article.findWhere() to then send to SQL to get the search results by author that goes into articleData going back to articlesController.index.
  */
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  /*
  This does the same as author and ID but searches by category.
  */
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  /*
  articlesController.loadAll seeks to gather all articles by first going to routes.js articles.loadAll function witch builds a function (articlesController.Index) and checks for articles in memory. IF there are articles in memory, it calls next() which is articlesController.index. IF NO articles in memory it calls article.fetchAll to create articleData which is above function that gets all articles. 
  */
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
