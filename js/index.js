$( document ).ready(function() {

  API = "https://www.threat9.com/api"

  function validateFields(fields) {
    var invalidField = true
    $.each(fields, function( index, field ) {
      if (!$(field).val()) {
        invalidField = false
        $(field).css('border', '1px solid red')
        $(field).focus(function(){$(field).css('border', '1px solid #CCC')})
      }
    })
    return invalidField
  }

  // NEWSLETTER SIGN UP
  $("#newsletter-button").click(function(event) {
    var fields = ['#newsletter-email']

    if (validateFields(fields)) {
      $.ajax({
        url: API + "/newsletter_subscribers",
        type: "post",
        dataType: "json",
        data: {
          newsletter_subscriber: {
            email: $('#newsletter-email').val()
          }
        },
        success: function(data){
          $('#newsletter-wrapper').remove()
          $('.form-subscribe').append("<div class='wrap'>" +
            "<div style='font-size:16px; line-height:40px; padding-left:30px;'>Successfully Subscribed. Thank You!</div>")
        },
        error: function(response) {
          $("#newsletter-wrapper").prepend("<div class='registration-error' style='background-color: #b9090b; color: #FFF;" +
            "margin-bottom:10px; font-size: 13px; padding: 5px; font-weight:900; line-height:24px;'>" +
            response.responseJSON.error +
            ", please confirm your information is correct or email us at info@threat9.com. </div>")
            setTimeout(function() {
              $('#newsletter-wrapper .registration-error').remove();
            }, 6000);
        }
      })
    } else {

    }
  })

  // CONTACT US FORM
  $("#contact-us-button").click(function(event) {
    var fields = ['#contact-us-name', '#contact-us-email', '#contact-us-message']
    if (validateFields(fields)) {
      $.ajax({
        url: API + "/contact_submissions",
        type: "post",
        dataType: "json",
        data: {
          contact_submission: {
            name: $('#contact-us-name').val(),
            email: $('#contact-us-email').val(),
            message: $('#contact-us-message').val(),
          }
        },
        success: function(data){
          $('#contact').remove()
          $('.contact-container').append("<div class='wrap'>" +
            "<div style='font-size:22px; height:600px; padding-top:40px; line-height:50px;'>" +
            "Successfully Submitted. We will get back to you soon. Thank You!</div>")
          $("html, body").animate({ scrollTop: 0 }, "slow");
        },
        error: function(response) {
          $("html, body").animate({ scrollTop: 0 }, "slow");
          $("#contact").prepend("<div class='registration-error' style='background-color: #b9090b; color: #FFF;" +
            "margin-bottom:10px; font-size: 14px; padding: 5px; font-weight:900;'>" +
            response.responseJSON.error +
            ", please confirm your information is correct or email us at info@threat9.com.</div>")
          setTimeout(function() {
            $('#contact .registration-error').remove();
          }, 6000);
        }
      })
    } else {
    }
  })

  // BETA SIGN UP FORM
  $("#register-button").click(function(event) {
    var fields = ['#register-name', '#register-email', '#register-message']
    if (validateFields(fields)) {
      $.ajax({
        url: API + "/beta_signups",
        type: "post",
        dataType: "json",
        data: {
          user: {
            name: $('#register-name').val(),
            email: $('#register-email').val(),
            message: $('#register-message').val(),
            recaptcha: $("#g-recaptcha-response").val(),
          }
        },
        success: function(data){
          $('#contact').remove()
          $('.contact-container').append("<div class='wrap'>" +
            "<div style='font-size:22px; height:600px; padding-top:40px; line-height:40px;'>" +
            "Thank you for signing up, you have been added to our beta list. We will be be reaching out soon.<br><br>" +
            "<a href='/'>Back to Threat9 Home Page</a></div>")
          $("html, body").animate({ scrollTop: 0 }, "slow");
        },
        error: function(response) {
          $("html, body").animate({ scrollTop: 0 }, "slow");
          $("#contact").prepend("<div class='registration-error' style='background-color: #b9090b; color: #FFF;" +
            "margin-bottom:10px; font-size: 14px; padding: 5px; font-weight:900;'>" +
            response.responseJSON.error +
            ", please confirm your information is correct or email us at info@threat9.com.</div>")
          setTimeout(function() {
            $('#contact .registration-error').remove();
          }, 6000);
        }
      })
    } else {
    }
  });
});
