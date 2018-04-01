define(["jqueryui", "turf", "openlayers"], function(jqueryui, turf, ol){
    
    return function($rootScope, $element){
	$(document).ready(function(){
	    
	    var dw = $rootScope.dialogWrapper;
	    var ow = $rootScope.openLayersWrapper;
	    var sw = $rootScope.switcherWrapper;
	    

	    dw.initTool("nearest", $element, function(){

		selected_features = ow.getSelectedFeaturesCollection();

		var fields = { };
		
		$.each(dw.tools.nearest.form.serializeArray(), function( key , value) {
		    fields[this.name] = this.value;
		});

		nearest_style =  new ol.style.Circle({
		    radius: 6,
		    stroke: new ol.style.Stroke({
			color: fields.nearest_layer_style_outline,
			width: parseInt(fields.nearest_layer_style_outline_width)
		    }),
		    fill: new ol.style.Fill({
			 color: fields.nearest_layer_style_fill
		    })
		});
		
		var nearest_layer = new ol.layer.Vector({
		    name: ow.generateLayerName(),
		    title: fields.nearest_layer_title,
		    source: new ol.source.Vector({
			
		    }),
		    style:  new ol.style.Style({
			image: nearest_style
		    })
		});

		layers = ow.getLayersFromDataStructure(ow.rootLayerCollection, [], 0);
		layer_surveyed = {};
		
		layers.forEach(function(layer, index, array) {
		    if(layer.name === fields.nearest_layer_surveyed) {
			layer_surveyed = layer.self;
		    }
		});

		var point;
		var point_fc;
		
		selected_features.forEach(function(fc, index, array) {
		    point_fc = fc;
		});
		
		point_geojson = ow.FormatGeoJson.writeFeatureObject(point_fc, ow.defaultFeatureReadOptions);
		var remember = false;
		layer_surveyed.getSource().getFeatures().forEach(function(fc, index, array) {
		    
		    sv_geojson = ow.FormatGeoJson.writeFeatureObject(fc, ow.defaultFeatureReadOptions);
	
		    if(sv_geojson.geometry.coordinates[0] === point_geojson.geometry.coordinates[0] && sv_geojson.geometry.coordinates[1] === point_geojson.geometry.coordinates[1]){
			
			console.log("point exists in dataset");
			try {
			layer_surveyed.getSource().removeFeature(point_fc);
			remember = true;
			} catch (e) {
			    
			}
		    }
 
		});
		
		var nearest = turf.nearest(point_geojson, ow.FormatGeoJson.writeFeaturesObject(layer_surveyed.getSource().getFeatures(),ow.defaultFeatureReadOptions));
		if(remember === true){
		    try {
		    layer_surveyed.getSource().addFeature(point_fc);
		    } catch(e){
			
		    }
		}

		ow.addGeoJsonToSource(nearest , nearest_layer);
		
		ow.rootGroup.getLayers().push(nearest_layer);
		sw.init($("#layer_tree"), ow);
		
	    }, ow, {
		accept_only: ["Point"],
		min: 1,
		max: 1
	    });
	    
	    dw.setLayerList("nearest", "nearest_layer_surveyed");


	}); // document.ready()
	
	     $("#nearest_layer_style_fill").spectrum({
		color: "rgba(210, 0, 210, 0.8)",
		showAlpha: true,
		change: function(color) {
		    $("#nearest_layer_style_fill").val(color.toRgbString());
		}
	    }).val("rgba(210, 0, 210, 0.8)");
	    
	    $("#nearest_layer_style_outline").spectrum({
		color: "rgba(0, 0, 0, 1)",
		showAlpha: true,
		change: function(color) {
		    $("#nearest_layer_style_outline").val(color.toRgbString());
		}
	    }).val("rgba(0, 0, 0, 1)");
	
    }; // return function

}); 