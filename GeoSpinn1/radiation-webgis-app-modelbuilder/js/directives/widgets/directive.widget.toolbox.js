define(["controller.widget.toolbox"], function(controller){
    
    //console.log("require.js: directive.widget.toolbox.js loaded");
    
    return function(){
	return {
	    restrict: "E",
	    templateUrl: "templates/widgets/widget.toolbox.html",
	    controller: controller
	};
    };
});