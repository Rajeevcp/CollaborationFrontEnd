$( document ).ready(function() {
	  $(function(){
    console.log( "ready!" );
	$("#addClass").click(function () {
	          $('#qnimate').addClass('popup-box-on');
	            });
	          
	            $("#removeClass").click(function () {
	          $('#qnimate').removeClass('popup-box-on');
	            });
	  })

});