define(["controller.dialog.tool.union"], function(controller){
    
    //console.log("require.js: directive.dialog.tool.union.js loaded");
    
    return function(){
	
	return {
	    restrict: "E",
	    templateUrl: "templates/dialogs/dialog.tool.union.html",
	    controller: controller
	};
	
    };
});