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
    }).error(function () {
      console.log('An error occured fetching data from ' + url + '.  Check the number and try your call again.');
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

  // We preferred to show only those repos that I was the owner of so we added in a filter for repos by owner.
  repos.owned = function(owner) {
    return repos.all.filter(function(repo) {
      return repo.owner.login === owner;
    });
  };

  module.repos = repos;
})(window);
