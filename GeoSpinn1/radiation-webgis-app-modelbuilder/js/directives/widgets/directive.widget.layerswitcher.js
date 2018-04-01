define(["controller.widget.layerswitcher"], function(controller){
    
    //console.log("require.js: directive.widget.layerswitcher.js loaded");
    
    return function(){
	return {
	    restrict: "E",
	    templateUrl: "templates/widgets/widget.layerswitcher.html",
	    controller: controller
	};
    };
});