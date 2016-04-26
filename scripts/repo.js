(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    // DONE: How would you like to fetch your repos? Don't forget to call the callback. Hint: What did you learn on Day 6? Use the method that lets you send a HEAD

    var url = 'https://api.github.com/user/repos';
    var authString = 'token '+ githubToken;
    var jqXHR = $.ajax({
      url : url,
      type : 'GET',
      dataType : 'JSON',
      headers : {
        "Authorization" : authString
      },
    }).done( function (data) {
      data.map( function(obj) {
        repos.all.push(obj);
      });
    });
    if (callback) {
      callback();
    }
  };

  // DONE: Model method that filters the full collection for repos with a particular attribute. You could use this to filter all repos that have a non-zero `forks_count`, `stargazers_count`, or `watchers_count`.
  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
