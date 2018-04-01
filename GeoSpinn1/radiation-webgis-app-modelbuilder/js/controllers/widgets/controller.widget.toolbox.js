// Dependency for directive.widget.toolbox
define(["jqueryui"], function(jqueryui){
    
    //console.log("require.js: controller.widget.toolbox.js loaded");

    return function($element){

	$element.draggable();
	
	$element.find(".tool-grab .minimizer").on("click", function(){
	    $(this).parent().next().slideToggle( "fast", function() {
		
	    });
	});
	
    };

}); 