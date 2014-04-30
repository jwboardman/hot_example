//Initialize
$.example.initialize = function() {
    $('#menu_example').unbind();
    $('#menu_example').click(function(e) {
        $.example.showExampleDialog();
        e.preventDefault();
    });
	// load default units
    $.example.loadExample();
};

//Page Ready
$(document).ready(function() {
	$.example.initialize();
});
