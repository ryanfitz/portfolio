/*------------------------------
 * Copyright 2016 Pixelized
 * http://www.pixelized.cz
 *
 * Roxie theme v1.3
 * Pixelized studio - Front-end developers from Czech Republic
 * info@pixelized.cz
 * We do not support theme customizations beyond it's original functionality & appearance.
------------------------------*/

$(window).scroll(function(){
	
	/*------------------------------
		FIXED NAVBAR
	------------------------------*/	
	if($(window).width() > 767) {
		
		if($(window).scrollTop() > 50) {
			if($('header.navbar-default').hasClass("navbar-static-top")) {
				$('header.navbar-default').removeClass('navbar-static-top');
				$('header.navbar-default').addClass('navbar-fixed-top navbar-offset');
				$('body').css("padding-top","70px");
			}
		}
				
		else {
			$('header.navbar-default').removeClass('navbar-fixed-top navbar-offset');
			$('header.navbar-default').addClass('navbar-static-top');
			$('body').css("padding-top","0px");
		}
	}
	
	else {
		if($(window).scrollTop()) {
			if($('header.navbar-default').hasClass("navbar-static-top")) {
				$('header.navbar-default').addClass('navbar-fixed-top navbar-offset');
				$('header.navbar-default').removeClass('navbar-static-top');
				$('body').css("padding-top","40px");
			}
		}
	}
	
	/*------------------------------
		TRANSPARENT NAVBAR
	------------------------------*/
	if($(window).width() > 1199) {
		if($(window).scrollTop() > 300) {
			$('header.navbar-transparent').addClass('navbar-offset');
		}
		else {
			$('header.navbar-transparent').removeClass('navbar-offset');
		}
	}
	else if($(window).width() > 991) {
		if($(window).scrollTop() > 200) {
			$('header.navbar-transparent').addClass('navbar-offset');
		}
		else {
			$('header.navbar-transparent').removeClass('navbar-offset');
		}
	}
	else if($(window).width() > 767) {
		if($(window).scrollTop() > 100) {
			$('header.navbar-transparent').addClass('navbar-offset');
		}
		else {
			$('header.navbar-transparent').removeClass('navbar-offset');
		}
	}
	else {
		if($(window).scrollTop()) {
			$('header.navbar-transparent').addClass('navbar-offset');
		}
	}
	
	/*------------------------------
		SCROLL TOP
	------------------------------*/
	if($(window).scrollTop() > 300) {
		$("#scrolltop").addClass("in");
	}
	else {
		$("#scrolltop").removeClass("in");
	}
	
});

$(document).ready(function() {	

  /*------------------------------
		SCROLL FUNCTION
	------------------------------*/
	function scrollToObj(target, offset, time) {
		$('html, body').animate({scrollTop: $( target ).offset().top - offset}, time);
	}
	
  $("a.scroll[href^='#']").click(function(){
    var offset = $.attr(this, 'data-offset');
    if (offset === undefined) {
      offset = 50;
    }

    scrollToObj($.attr(this, 'href'), offset, 1000);
		return false;
	});
	
	$("#scrolltop").click(function() {
		scrollToObj('body',0, 1000);
    });

	/*------------------------------
		MAGNIFIC POPUP
	------------------------------*/
  // $('.show-image').magnificPopup({type:'image'});

  $('#section-portfolio').magnificPopup({
    delegate: '.hover-overlay',
    type: 'image',
    gallery: {
      enabled: true
    }
  });

  $('#latest-work-footer').magnificPopup({
    delegate: '.overlay',
    type: 'image',
    gallery: {
      enabled: true
    }
  });

  setTimeout(function() {
    $("#slide-1 .animated").addClass("fadeInDown");
  }, 500);
});
