  // DONE: Wrap the entire contents of this file in an IIFE.
  // Pass in to the IIFE a module, upon which objects can be attached for later access.
(function(module) {
  function Article (opts) {
    this.author = opts.author;
    this.authorUrl = opts.authorUrl;
    this.title = opts.title;
    this.category = opts.category;
    this.body = opts.body;
    this.publishedOn = opts.publishedOn;
  }

  Article.all = [];

  Article.prototype.toHtml = function() {
    var template = Handlebars.compile($('#article-template').text());

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    this.body = marked(this.body);

    return template(this);
  };

  Article.loadAll = function(rawData) {
    rawData.sort(function(a,b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    });

    // DONE: Refactor this forEach code, by using a `.map` call instead, since what we are
    // trying to accomplish is the transformation of one colleciton into another.

    // rawData.forEach(function(ele) {
    //   Article.all.push(new Article(ele));
    // })
    Article.all = rawData.map(function(ele) {
      return new Article(ele);
    });
  };

  // This function will retrieve the data from either a local or remote source,
  // and process it, then hand off control to the View.

  // done: Refactor this function, and provide it with a parameter of a callback function
  //(for now just a placeholder, but to be referenced at call time as a view function)
  // to execute once the loading of articles is done. We do this because we might want
  // to call other view functions, and not just the initIndexPage() that we are replacing.
  // Now, instead of calling articleView.initIndexPage(), we can simply run our callback.
  Article.fetchAll = function(next) {
    if (localStorage.rawData) {
      Article.loadAll(JSON.parse(localStorage.rawData));
      next();
    } else {
      $.getJSON('data/hackerIpsum.json', function(rawData) {
        Article.loadAll(rawData);
        localStorage.rawData = JSON.stringify(rawData); // Cache the json, so we don't need to request it next time.
        next();
      });
    }
  };

  // COMPLETED: Chain together a `map` and a `reduce` call to get a rough count of all words in all articles.
  Article.numWordsAll = function() {
    return Article.all.map(function(article) {
      return article.body.split(/\b\S+\b/g).length; // Grab the words from the `article` `body`.
    })
    .reduce(function(a, b) {
      return a + b;// Sum up all the values!
    });
  };

  // DONE: Chain together a `map` and a `reduce` call to produce an array of unique author names.
  Article.allAuthors = function() {
    return Article.all.map(function(article) { return article.author;})
    .reduce(function (prev, cur) {
      if (prev.indexOf(cur) < 0) {
        prev.push(cur);
      }
      return prev;
    }, []);
  };

  Article.numWordsByAuthor = function() {
    // COMPLETED: Transform each author string into an object with 2 properties: One for
    // the author's name, and one for the total number of words across the matching articles
    // written by the specified author.
    return Article.allAuthors().map(function(auth) {
      return {
        name: auth,
        numWords: Article.all.map(function (obj) {
          if (obj.author === auth) {
            return obj.body.split(/\b\S+\b/g).length;
          } else {
            return 0;
          }
        }).reduce(function(a, b) {
          return a + b;
        })
      };
    });
  };

  Article.mostUsedWords = function() {
    //
    // this function takes the word count object and returns an object with the top 'count' words by usage.
    //
    function topWords (obj, count) {
      var winner;
      var rank = [];
      for (i=0;i<count;i++) {
        winner = Object.keys(obj)
        .reduce(function(prev, curr) {
          return obj[prev] > obj[curr] ? prev : curr;
        });
        rank[i] = [winner,obj[winner]];
        delete obj[winner];
      }
      return rank.reduce(function (prev, curr) {
        prev[curr[0]] = curr[1];
        return prev;
      }, {});
    }
    wordFreq = {};
    //
    //  This chain creates a single object that has each word used in all articles and the number of times each word appears.
    //  This object is then passed to topWords.
    //
    Article.all.map(function (obj) {
      return obj.body;    // get all text from all articles
    })
    .reduce(function (a,b) { // make one string containing all text of all articles
      return a+ ' ' + b;
    })
    .split(' ')
    .forEach(function(a) {  // using forEach since .map doesn't work
      // console.log(a);
      if (!wordFreq[a]) {
        wordFreq[a] = 1;
      } else {
        wordFreq[a]++;
      }
    });
    return topWords(wordFreq,10);
  };

  module.Article = Article;
}(window));
