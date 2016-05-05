var contentSections = $('.cd-section'),
	navigationItems = $('.cd-nav a');

$(document).ready(function($){

	updateNavigation();
	$(window).on('scroll', function(){
		updateNavigation();
	});

	//smooth scroll to the section
	navigationItems.on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });
    //smooth scroll to second section
    $('.cd-scroll-down').on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });

    //open-close navigation on touch devices
    $('.touch .cd-nav-trigger').on('click', function(){
    	$('.touch .cd-nav').toggleClass('open');
  
    });
    //close navigation on touch devices when selectin an elemnt from the list
    $('.touch .cd-nav a').on('click', function(){
    	$('.touch .cd-nav').removeClass('open');
    });
    
    // Animation listeners
    $(window).scroll(function(){
    checkAnimation();
	});
    
    updateTutoringHours();
    
    updateTemperature();
    
	showCheckButton();
	
	contactOverlay();
	
    signInOverlay();
});

// Update navigation dots and labels
function updateNavigation() {
	contentSections.each(function(){
		$this = $(this);
		var activeSection = $('.cd-nav a[href="#'+$this.attr('id')+'"]').data('number') - 1;
		if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
			navigationItems.eq(activeSection).addClass('is-selected');
		}else {
			navigationItems.eq(activeSection).removeClass('is-selected');
		}
	});
}

// Smooth scroll actions
function smoothScroll(target) {
    $('body,html').animate(
    	{'scrollTop':target.offset().top},
    	600
    );
}

// Contact overlay, background blur + hover highlight
function contactOverlay() {
	$('#contact').on('click', function() {
		$('#overlay-contact, .social').fadeIn(300);
        $('#section1').css('filter', 'blur(5px)');
	});
	
	$(document).on('mouseenter','#overlay-contact',function() {
	    $('#overlay-contact').css('background', 'transparent');
    });
    
    $(document).on('mouseleave','#overlay-contact',function() {
	    $('#overlay-contact').css('background', 'rgba(0, 0, 0, .5)');
    });
    
	$(document).on('click','#overlay-contact',function() {
        $('#overlay-contact, .social').fadeOut(200);
        $('#section1').css('filter', 'blur(0)');
    });
}

// Sign-in overlay, background blur + hover highlight
function signInOverlay() {
	$('#sign-in').on('click', function() {
		$('#overlay-sign-in, .sign-in-container').fadeIn(200);
        $('#section1').css('filter', 'blur(5px)');
	});
    
    $(document).on('mouseenter','#overlay-sign-in',function() {
	    $('#overlay-sign-in').css('background', 'transparent');
    });
    
    $(document).on('mouseleave','#overlay-sign-in',function() {
	    $('#overlay-sign-in').css('background', 'rgba(0, 0, 0, .5)');
    });
    
	$(document).on('click','#overlay-sign-in',function() {
        $('#overlay-sign-in, .sign-in-container').fadeOut(200);
        $('#section1').css('filter', 'blur(0)');
    });
}

// Show check buttons next to corporate liaisons
function showCheckButton() {
	$('#liaison-contatc').on('click', function() {
        $('.liaison-check').fadeIn(200).delay(10000).fadeOut(300);
	});
}

// Los Angeles weather temperature updates
function updateTemperature() {
	$.simpleWeather({
    location: 'Los Angeles',
    unit: 'f',
    success: function(weather) {
        var temp = weather.temp + ' F&deg;';
        $("#degrees").html(temp);
    }
    });
}

// Tutoring hours updates
function updateTutoringHours() {
	var currentTime = new Date();
	var day = currentTime.getDay();
	var hours = currentTime.getHours();
	var open_color = '#77d58d';
	var close_color = '#e74c3c';
	
	
	if (hours >= 10 && hours <= 16) {
		if (day >= 1 && day <= 5) {
			document.getElementById('tutoring-hours').style.color = open_color;
			document.getElementById('tutoring-hours').innerText = '10:00AM - 5:00PM';
		}		
	}
	else {
		document.getElementById('tutoring-hours').style.color = close_color;
		document.getElementById('tutoring-hours').innerText = 'CLOSED';
	}
}

// Check if element is in the viewport
function isElementInViewport(elem) {
    var $elem = $(elem);

    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    // Get the position of the element on the page.
    var elemTop = Math.round( $elem.offset().top );
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}

// Check if it's time to start the radial progress animation.
function checkAnimation() {
	
    var $elem1 = $('.one');
    var $elem2 = $('.two');

    // If the animation has already been started
    //if ($elem1.hasClass('fill-one')) return;
    //if ($elem2.hasClass('fill-two')) return;

    if (isElementInViewport($elem1)) {
        // Start the animation
        //$elem1.addClass('fill-one');
        $elem1.attr('class', 'one fill-one');

    }
    
    if (isElementInViewport($elem2)) {
        // Start the animation
        $elem2.attr('class', 'two fill-two');
    }
}
