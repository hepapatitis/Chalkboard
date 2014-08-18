$(window).load(function () {
	// Initiate Unveil
	$("img").unveil();
	
	// Initiate Carousels
	$('.m-carousel').carousel();
	
	$("#loading").fadeOut("slow");
	setTimeout(function() {
		$("#loading").remove;
	}, 1500);
	
	// Initiate WOW
	new WOW().init();
});

$(document).ready(function() {
	// Initiate FastClick
	FastClick.attach(document.body);
	
	// Instantiate MixItUp:
	$('#portfolios').mixItUp();
	
	// Easing for #hashtags
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
			|| location.hostname == this.hostname) {

			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			
			if (target.length) {
				$('html,body').animate({scrollTop: target.offset().top}, 1500, 'easeInOutQuint');
				return false;
			}
		}
	});
	
	$('[data-toggle="modal"]').click(function() {
		$("img").trigger("unveil");
	});

    $('#contact-form').validate({
        rules: {
          name: {
            minlength: 2,
            required: true
          },
          email: {
            required: true,
            email: true
          },
          message: {
            minlength: 2,
            required: true
          }
        },
        highlight: function(element) {
          $(element)
          .closest('.control-group').removeClass('success').addClass('error');
        },
        success: function(element) {
          element
          .text('OK').addClass('valid')
          .closest('.form-group').removeClass('error').addClass('success');
        }
    });
	
	$('#contact-form').submit(function () {
		var action = $(this).attr('action');
		
		$("#contact-message").slideUp(750);
		
		$.post(action, {
				name: $('#name').val(),
				email: $('#email').val(),
				message: $('#message').val()
			},
			function (data) {
				$('#contact-message').html(data);
				$('#contact-message').slideDown('slow');
				
				if (data.match('success') != null)
				{
					$('#name').val("");
					$('#email').val("");
					$('#message').val("");
				}

			}
		);


		return false;

	});
});