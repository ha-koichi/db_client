$( document ).ready(function() {

    var current_date = moment().format("DD/MM/YYYY");

    $('.form-group > .setDate').datepicker({
      format: "dd/mm/yyyy",
      autoclose: true,
      todayHighlight: true
    });
    $('.form-group > .setDate > .form-control').val(current_date);
});
