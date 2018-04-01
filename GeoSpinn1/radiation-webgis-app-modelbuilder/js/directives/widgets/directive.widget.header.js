define(["controller.widget.header"], function(controller){
    
    //console.log("require.js: directive.widget.header.js loaded");
    
    return function(){
	
	return {
	    restrict: "E",
	    templateUrl: "templates/widgets/widget.header.html",
	    controller: controller
	};
	
    };
});