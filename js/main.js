$(function() {

  // hiding and showing the two areas of the about-us page
  $('.secondary-nav-1 a').click(function() {
    $('.secondary-nav-1').addClass('current');
    $('.secondary-nav-2').removeClass('current');
    $('.why-choose-craftsman').hide();
    $('.our-story').show();
  });
  $('.secondary-nav-2 a').click(function() {
    $('.secondary-nav-2').addClass('current');
    $('.secondary-nav-1').removeClass('current');
    $('.our-story').hide();
    $('.why-choose-craftsman').show();
  });

  // adding the thanks for looking image to the end of the gallery thumbnails
  var lastThumb = "<li class='gallery-last-thumbnail'><img src='img/gallery-last-thumbnail.jpg' title='Thanks For Taking The Time To Look' alt='Thanks For Taking The Time To Look'></li>";
  $('.gallery-thumbnails').append(lastThumb);

  // hiding and showing (fade) different tabs on home page
  $('.row-2 ul li').click(function() {
    //tab
    $('.row-2 ul li').removeClass('current-tab');
    $(this).addClass('current-tab');
    //tab-content
    $('.tab-content').fadeOut();
    $('.' + $(this).attr('id') + '-content').fadeIn();
  });


  // center the image carousel depending on window width without screwing up scrolling effect
  // probably not really necessary at this point, will probably end up being removed
  var checkWindowWidth = function() {
    var width = $(window).width();
    var windowWidth = 1200 - width;
    
    if(width < 1200 && width > 1048) {
      $('.image-carousel > ul').css({'left': -windowWidth / 2, 'position': 'absolute'});
    } else if(width < 1048) {
      $('.image-carousel > ul').css({'left': '-76px', 'position': 'absolute'});
    } else {
      $('.image-carousel > ul').css({'left': 0, 'position': 'relative'});
    }
  };
  checkWindowWidth();
  $(window).resize(checkWindowWidth);

  // show/hide next and previous buttons for image carousel - fade
  // not need with this project, will most likely end up getting removed
  $('.image-carousel').mouseenter(function() {
    $(this).children('.carousel-button-container').children('.btn-carousel-prev, .btn-carousel-next').stop(true, true).fadeIn(140);
  });
  $('.image-carousel').mouseleave(function() {
    $(this).children('.carousel-button-container').children('.btn-carousel-prev, .btn-carousel-next').stop(true, true).fadeOut(140);
  });

  // auto scroll for the homepage image carousel
  var items = $(".image-carousel ul li").length;
  var ulWidth = items * $(".image-carousel ul li").outerWidth() + 'px';
  $('.image-carousel ul').css('width', ulWidth);

  // only run auto scrolling if there's more than one image
  if(items > 1) {
    // automatically scroll
    var startInterval = function() {
    var items = [];
    var currentItem = 0;

    return setInterval(function() {
      $(".image-carousel ul").next();
      $(".image-carousel ul").stop(true, true);
      var li = $(".image-carousel ul li:first");
      var scrollWidth = li.outerWidth(true);
      $(".image-carousel ul").animate({
        marginLeft: -scrollWidth
      }, 400, 'swing', function() {
          $(".image-carousel ul").append(li);
          $(".image-carousel ul").css("marginLeft", 0);
        });

        currentItem++;
        if(currentItem >= items.length) {
          currentItem = 0;
        }
      }, 8000);

    };
    var intervalHandle = startInterval();

    // stopping auto scroll when image carousel is hovered over / interacted with
    $('.image-carousel').hover(
      function() {
        clearInterval(intervalHandle);
      },
      function() {
        intervalHandle = startInterval();
      }
    );

    // carousel scroll buttons
    $(".btn-carousel-prev").click(function() {
      $(".image-carousel ul").prev();
      $(".image-carousel ul").stop(true,true);
      var li = $(".image-carousel ul li:last");
      var scrollWidth = li.outerWidth(true);
      $(".image-carousel ul").prepend(li);
      $(".image-carousel ul").css("marginLeft", -scrollWidth + "px");
      $(".image-carousel ul").animate({
        marginLeft: 0
      }, 400, 'swing', function() {
      });
    });

    $(".btn-carousel-next").click(function() {
      $(".image-carousel ul").next();
      $(".image-carousel ul").stop(true,true);
      var li = $(".image-carousel ul li:first");
      var scrollWidth = li.outerWidth(true);
      $(".image-carousel ul").animate({
        marginLeft: -scrollWidth
      }, 400, 'swing', function() {
         $(".image-carousel ul").append(li);
         $(".image-carousel ul").css("marginLeft", 0);
      });
    });
  }

});




