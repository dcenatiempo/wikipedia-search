$(document).ready(function(){
  
    let regularSearch = function(){
      // grab search terms from input box
      let searchTerms = document.getElementById('search-input').value;
      if (searchTerms === "")
        return;
      // get json from widipedia API and insert into page
      $.ajax({
        dataType: 'jsonp',
        url: "https://en.wikipedia.org/w/api.php?"+
             "action=query&" +
             "format=json&" +
             "prop=info%7Cextracts%7Cpageimages&" +
             "list=&" +
             "meta=&" +
             "iwurl=1&" +
             "generator=search&" +
             "inprop=url&" +
             "exchars=100&" +
             "exlimit=20&" +
             "exintro=1&" +
             "explaintext=1&" +
             "exsectionformat=plain&" +
             "excontinue=1&" +
             "piprop=name%7Coriginal&" +
             "gsrsearch="+searchTerms.split(' ').join('+'),
        success: function(data) {
          // save needed json data to results
          var results = data.query.pages;
          // grab wikipedia result items and store keys
          var keys = Object.keys(results);
          
          //erase previous results
          $("#search-results").html("");
          
          //loop through each result
          for (var i=0; i<keys.length; i++){
            // create individual result card r0, r1, r2, ri, etc
            $("#search-results").append(
              '<div class="card flex-row" id="r'+i+'"></div>'
            );
            // create figure inside of ri
            if (results[keys[i]].hasOwnProperty('original'))
              $("#r"+i).append(
                '<figure class="img-container">' +
                  '<img src="'+results[keys[i]].original.source+'">' +
                '</figure>'
              );
            // create article inside of ri
            $("#r"+i).append(
              '<article class="card-text flex-cloumn"></article>'
            );
            // create content inside of article inside of ri
            $("#r"+i+" > article").append(
              '<a class="title" href="'+results[keys[i]].fullurl+'" target="_blank">' +
                results[keys[i]].title +
              '</a>'
            );
            if (results[keys[i]].hasOwnProperty('extract'))
              $("#r"+i+" > article").append(
                '<p class="extract">'+results[keys[i]].extract+'</p>'
              );
            //$("#r"+i+" > article").append("<h4>"+results[keys[i]].fullurl+"</h4>");
          }
        }
      });
    };
    
    // what happens when you press "I'm feeling random" button
    let randomSearch = function() {
    window.open('https://en.wikipedia.org/wiki/Special:Random','_blank');
    };
  
    //create button event handlers
    $("#reg-search").click(function(){
      regularSearch();
    });
      
    $("#random-search").click(function(){
      randomSearch();
    });
    
    $('#search-input').on('keyup', function(e) {
      if (e.keyCode === 13) {
          $('#reg-search').click();
      }
    });
});