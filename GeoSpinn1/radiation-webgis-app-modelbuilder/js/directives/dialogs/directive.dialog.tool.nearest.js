define(["controller.dialog.tool.nearest"], function(controller){
    
    //console.log("require.js: directive.dialog.tool.nearest.js loaded");
    
    return function(){
	
	return {
	    restrict: "E",
	    templateUrl: "templates/dialogs/dialog.tool.nearest.html",
	    controller: controller
	};
	
    };
});