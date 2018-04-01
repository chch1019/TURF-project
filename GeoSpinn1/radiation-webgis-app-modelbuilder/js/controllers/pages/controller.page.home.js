define(["openLayersWrapper", "openlayers"], function(openLayersWrapper, ol){

    var olWrapper = new openLayersWrapper();
    
    // Layer 1
    
    var administrative_layer = new ol.layer.Vector({
	name: "administrative_areas",
	title: "Administrative areas",
	selectable:false,
	source: new ol.source.Vector({
	    
	}),
	style: olWrapper.stylist.styleFunction
    });
 
    olWrapper.addFeaturesFromGeoJson("path", "Data/areas1.geojson", administrative_layer);

    // Layer2

    var poi_layer = new ol.layer.Vector({
	name: "radiation_pois",
	title: "Radiation pois",
	source: new ol.source.Vector({
	   
	}),
	selectable:false,
	style: olWrapper.stylist.styleFunction
    });

    olWrapper.addFeaturesFromGeoJson("path", "Data/radiation_pois.geojson", poi_layer);

    var tg_1 = new ol.layer.Group({
	name: "tg_1",
	title: "Workspace group"
    });

    olWrapper.insertLayer(administrative_layer, tg_1);
    olWrapper.insertLayer(poi_layer, tg_1);

    var tg_2 = new ol.layer.Group({
	name: "tg_2",
	title: "Base layers"
	
    });

    olWrapper.insertLayer(tg_1, olWrapper.rootGroup);
    olWrapper.insertLayer(tg_2, olWrapper.rootGroup);

    // Controller function, fires whenever changing back to this page (home)
    return function($rootScope){

	$rootScope.openLayersWrapper = olWrapper;
	
	$(document).ready(function(){
	    // Initmap on the element TODO: MAKE IT MORE MOBILE
	    olWrapper.Map = new ol.Map({
		layers: olWrapper.rootLayerCollection,
		view: olWrapper.MapView,
		interactions: olWrapper.interactions,
		target: "map-window"
	    });

	});

    };
 
});