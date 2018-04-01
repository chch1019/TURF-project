define(["controller.dialog.tool.within"], function(controller){
    
    //console.log("require.js: directive.dialog.tool.within.js loaded");
    
    return function(){
	
	return {
	    restrict: "E",
	    templateUrl: "templates/dialogs/dialog.tool.within.html",
	    controller: controller
	};
	
    };
});