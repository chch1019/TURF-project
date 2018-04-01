define(["controller.dialog.tool.model"], function(controller){
    
    //console.log("require.js: directive.dialog.tool.within.js loaded");
    
    return function(){
	
	return {
	    restrict: "E",
	    templateUrl: "templates/dialogs/dialog.tool.model.html",
	    controller: controller
	};
	
    };
});