define(function(){

    // Main page ng-app

    var App = angular.module("App", ["ngRoute"]);
    
    // Page components -------------------------------------------------------------------
    
    // Widgets
    
    require(["directive.widget.header"], function(directive){
	App.directive("widgetHeader", directive);
    });
    
    require(["directive.widget.layerswitcher"], function(directive){
	App.directive("widgetLayerSwitcher", directive);
    });
    
    require(["directive.widget.toolbox", "dialogWrapper"], function(directive, wrapper){
	App.directive("widgetGisToolbox", directive).run(function($rootScope) {
	    $rootScope.dialogWrapper = wrapper;
	});
    });
    
    // Tools
    
    require(["directive.dialog.tool.buffer"], function(directive){
	App.directive("toolBuffer", directive);
    });
    
    require(["directive.dialog.tool.union"], function(directive){
	App.directive("toolUnion", directive);
    });
    
    require(["directive.dialog.tool.within"], function(directive){
	App.directive("toolWithin", directive);
    });
    
    require(["directive.dialog.tool.nearest"], function(directive){
	App.directive("toolNearest", directive);
    });
    
    require(["directive.dialog.tool.voronoi"], function(directive){
	App.directive("toolVoronoi", directive);
    });
	
	require(["directive.dialog.tool.model"], function(directive){
	App.directive("toolModel", directive);
    });

    // Routing ---------------------------------------------------------------------------

    // Router configuration

    App.config(function($locationProvider, $routeProvider) {

	$locationProvider.html5Mode(true);

	$routeProvider.when("/", {
	    templateUrl : "templates/pages/home.html",
	    controller: "homeController"
	    //reloadOnSearch: false
	}).when("/home", {
	    templateUrl : "templates/pages/home.html",
	    controller: "homeController"
	    //reloadOnSearch: false
	}).when("/about", {
	    templateUrl : "templates/pages/about.html",
	    controller: "aboutController"
	    //reloadOnSearch: false
	}).when("/contact", {
	    templateUrl : "templates/pages/contact.html",
	    controller: "contactController"
	    //reloadOnSearch: false
	}).otherwise({redirectTo:'/'});

    });

    // Setting up controllers for specific routes
    
    require(["controller.page.home", "controller.page.about", "controller.page.contact"], function(home, about, contact){
	
	App.controller("homeController", home);
	App.controller("aboutController", about);
	App.controller("contactController", contact);
	
	angular.bootstrap(document, ["App"]);
	
    });

    // bs noconf
    $.fn.button.noConflict();
    $.fn.bstooltip = $.fn.tooltip; 
    
});