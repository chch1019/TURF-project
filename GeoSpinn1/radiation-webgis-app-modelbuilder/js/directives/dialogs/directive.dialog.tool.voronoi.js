define(["controller.dialog.tool.voronoi"], function(controller){
    
    //console.log("require.js: directive.dialog.tool.voronoi.js loaded");
    
    return function(){
	
	return {
	    restrict: "E",
	    templateUrl: "templates/dialogs/dialog.tool.voronoi.html",
	    controller: controller
	};
	
    };
});