(function(module) {
  var repoView = {};

  var ui = function() {
    var $about = $('#about'); // Best practice: Cache the DOM query if it's used more than once.

    $about.find('ul').empty();
    $about.show().siblings().hide();
  };

  var render = Handlebars.compile($('#repo-template').html());

  repoView.index = function() {
    ui();

    // The jQuery `append` method lets us append an entire array of HTML elements at once, So we can use a little FP to transform our data-set into DOM nodes:
    $('#about ul').append(
      repos.owned('goodwid').map(render)
    );
  };

  module.repoView = repoView;
})(window);
