define(["controller.dialog.tool.buffer"], function(controller){
    
    //console.log("require.js: directive.dialog.tool.buffer.js loaded");
    
    return function(){
	
	return {
	    restrict: "E",
	    templateUrl: "templates/dialogs/dialog.tool.buffer.html",
	    controller: controller
	};
	
    };
});