requirejs.config({
    
    baseUrl: "js",
    waitSeconds: 200,
    paths: {
	
	// Core libs

	"angular": [
	    "libs/angular/angular"
	],
	
	"angular-route": [
	    "libs/angular/route"
	],
	
	"jquery": [
	    "libs/jquery/jquery"
	],
	
	"jqueryui": [
	    "libs/jquery/jquery-ui"
	],
	
	"sortable_nested": [
	    "libs/jquery/sortable_nested"
	],
	
	"bootstrap": [
	    "libs/bootstrap/bootstrap"
	],

	"spectrum": [
	    "libs/spectrum/spectrum"
	],
	
	"openlayers": [
	    "libs/openlayers/ol-debug"
	],
	
	"turf_model": [
	    "libs/turf/turf_FriNov242017"
	
	],
	"turf": [
	    "libs/turf/turf_377"
	
	],
	
	// voro
	
	"Voronoi": [
	    "libs/voronoi/Voronoi"
	],
	
	"VQueue": [
	    "libs/voronoi/VQueue"
	],
	
	"VPolygon": [
	    "libs/voronoi/VPolygon"
	],
	
	"VParabola": [
	    "libs/voronoi/VParabola"
	],
	
	"VEvent": [
	    "libs/voronoi/VEvent"
	],
	
	"VEdge": [
	    "libs/voronoi/VEdge"
	],
	
	"Point": [
	    "libs/voronoi/Point"
	],
	
	// voro end
	
	"olstyles": [
	    "olStyles"
	],
	
	// App
	
	"App": [
	    "app"
	],
	
	"openLayersWrapper": [
	    "openLayersWrapper"
	],
	
	"dialogWrapper": [
	    "dialogWrapper"
	],
	
	"switcherWrapper": [
	    "switcherWrapper"
	],
	
	// Page controllers
	
	"controller.page.home": [
	    "controllers/pages/controller.page.home"
	],
	
	"controller.page.about": [
	    "controllers/pages/controller.page.about"
	],
	
	"controller.page.contact": [
	    "controllers/pages/controller.page.contact"
	],
	
	// Widget directive controllers
	
	"controller.widget.header": [
	    "controllers/widgets/controller.widget.header"
	],
	
	"controller.widget.layerswitcher": [
	    "controllers/widgets/controller.widget.layerswitcher"
	],
	
	"controller.widget.toolbox": [
	    "controllers/widgets/controller.widget.toolbox"
	],
	
	// Dialog directive controllers
	
	"controller.dialog.tool.buffer": [
	    "controllers/dialogs/controller.dialog.tool.buffer"
	],
	
	"controller.dialog.tool.nearest": [
	    "controllers/dialogs/controller.dialog.tool.nearest"
	],
	
	"controller.dialog.tool.union": [
	    "controllers/dialogs/controller.dialog.tool.union"
	],
	
	"controller.dialog.tool.within": [
	    "controllers/dialogs/controller.dialog.tool.within"
	],
	
	"controller.dialog.tool.voronoi": [
	    "controllers/dialogs/controller.dialog.tool.voronoi"
	],
	
	"controller.dialog.tool.model": [
	    "controllers/dialogs/controller.dialog.tool.model"
	],

	// Widget directives
	
	"directive.widget.header": [
	    "directives/widgets/directive.widget.header"
	],
	
	"directive.widget.toolbox": [
	    "directives/widgets/directive.widget.toolbox"
	],
	
	"directive.widget.layerswitcher": [
	    "directives/widgets/directive.widget.layerswitcher"
	],
	
	// Dialog directives
	
	"directive.dialog.tool.buffer": [
	    "directives/dialogs/directive.dialog.tool.buffer"
	],
	
	"directive.dialog.tool.nearest": [
	    "directives/dialogs/directive.dialog.tool.nearest"
	],
	
	"directive.dialog.tool.union": [
	    "directives/dialogs/directive.dialog.tool.union"
	],
	
	"directive.dialog.tool.voronoi": [
	    "directives/dialogs/directive.dialog.tool.voronoi"
	],
	
	"directive.dialog.tool.within": [
	    "directives/dialogs/directive.dialog.tool.within"
	],
	
	"directive.dialog.tool.model": [
	    "directives/dialogs/directive.dialog.tool.model"
	]
	
    },
    
    shim: {
	
	// Core deps.
	
	"jqueryui": {
	    deps: ["jquery"]
	},
	
	"sortable_nested": {
	    deps: ["jquery", "jqueryui"]
	},
	
	"angular": {
	    deps: ["jquery"]
	},
	
	"bootstrap": {
	    deps: ["jquery"]
	},
	
	"openlayers": {
	    deps: ["jquery"]
	},
	
	"angular-route": {
	    deps: ["angular"]
	},
	
	// voro
	
	"Voronoi": {
	    deps: ["Point", "VEdge", "VEvent", "VParabola", "VPolygon", "VQueue"]
	},
	
	"VEdge": {
	    deps: ["Point"]
	},

	// voro end

	// App deps.
	
	"App": {
	    deps: ["angular", "angular-route", "bootstrap"]
	},
	
	"openLayersWrapper": {
	    deps: ["jquery", "openlayers"]
	},
	
	"dialogWrapper": {
	    deps: ["jqueryui"]
	},
	
	"controller.page.home": {
	    deps: ["angular", "angular-route", "openLayersWrapper"]
	},
	
	"widget.gisToolboxController": {
	    deps: ["jqueryui"]
	}
	
    }

});