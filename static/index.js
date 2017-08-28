var thedata;
$(function() {

$('#login').submit(function() { 
    // submit the form 
    $(this).ajaxSubmit({
		url: "/thedata",
		method: "POST",
		success: function (data) {
			if (typeof data === "string") {$("#output").text(data); return ;}
			thedata = data;
			$("#output").pivotUI(data);
			}
	}); 
    // return false to prevent normal browser submit and page navigation 
    return false; 
}); // submit
});
