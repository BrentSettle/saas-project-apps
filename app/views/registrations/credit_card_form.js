function GetURLParameter(sParam) {

};

$(document).ready(function () {


    var show_error, stripeResponseHanlder, submitHandler;

    submitHanlder = function (event) {
      var $form = $(event.target);
      $form.find("input[type=sumbit").prop("disabled", true);
      if(Stripe){
          Stripe.card.createToken($form, stripeResponseHanlder);
      }
      else {
          show_error("Failed to load credit card processing functionality. Please reload the page")
      }
      return false;
    };


    $(".cc_form").on('submit', submitHandler);

    var handlePlanChange = function(plan_type, form) {
        var $form = $(form);

        if(plan_type == undefined) {
            plan_type = $('#tenant_plan :selected').val();
        }

        if(plan_type == 'premium') {
            $('[data-stripe]').prop('required', true);
            $form.off('submit');
            $form.on('submit', submitHandler);
            $('[data-stripe]').show();
        } else {
            $('[data-stripe]').hide();
            $form.off('submit');
            $('[data-stripe]').removeProp('required');
        }
    }

    $("#tenant_plan").on('change', function(event) {
       handlePlanChange($('#tenant_plan :selected').val(), ".cc_form");
    });


    handlePlanChange(GetURLParameter('plan'), ".cc_form");

    stripeResponseHandler = function (status, response) {
      var token, $form;

      $form = $('.cc_form');

      if (response.error) {
          console.log(response.error.message);
          show_error(response.error.message);
          $form.find("input[type=submit]").prop("disabled", false);
      } else {
          token = response.id;
          $form.append($("<input type=\"hidden\" name=\"payment[token]\" />").val(token));
          $("[data-stripe=number]").remove();
          $("[data-stripe=cvv]").remove();
          $("[data-stripe=exp-year]").remove();
          $("[data-stripe=exp-month]").remove();
          $("[data-stripe=label]").remove();
          $form.get(0).submit;
      }
      return false;
    };



});