articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {


    if ($(this).val()) {
      // TODO: If the select box was changed to an option that has a value, we need to hide all the articles, and then show just the ones that match for the author that was selected. Use an "attribute selector" to find those articles, and fade them in for the reader.

      $('#articles article').each(function() {
          $(this).hide();
      });

      $('#articles article').filter(function() {
          return $(this).find('.byline a').text() == $('#author-filter').val();
      }).show();

    //   if ($('#author-filter').val() == $("article .byline a")) {
    //       console.log("test");
    //   }


    //   $('#articles article:contains()').show();



    //   var $selection = $("#author-filter").text();
    //   console.log($selection);



    //   $(this).show();
    //   $(this:not).hide();

    } else {
      // TODO: If the select box was changed to an option that is blank, we should
      //       show all the articles, except the one article we are using as a template.

    }
    $('#category-filter').val('');
  });
};
