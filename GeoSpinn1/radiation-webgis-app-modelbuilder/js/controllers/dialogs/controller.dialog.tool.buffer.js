define(["jqueryui", "turf", "openlayers", "spectrum"], function(jqueryui, turf, ol, spectrum){
    
    //console.log("require.js: controller.dialog.tool.buffer.js loaded");

    return function($rootScope, $element){
	
	$(document).ready(function(){

	    var dw = $rootScope.dialogWrapper;
	    var ow = $rootScope.openLayersWrapper;
	    var sw = $rootScope.switcherWrapper;

	    dw.initTool("buffer", $element, function(){

		selected_features = ow.getSelectedFeaturesCollection();
		//console.log(selected_features);
		var fields = { };
		$.each(dw.tools.buffer.form.serializeArray(), function( key , value) {
		    fields[this.name] = this.value;
		});

		buffer_style =  new ol.style.Style({
		    stroke: new ol.style.Stroke({
			color: fields.buffer_layer_style_outline,
			width: parseInt(fields.buffer_layer_style_outline_width)
		    }),
		    fill: new ol.style.Fill({
			 color: fields.buffer_layer_style_fill
		    })
		});

		var buffer_layer = new ol.layer.Vector({
		    name: ow.generateLayerName(),
		    title: fields.buffer_layer_title,
		    source: new ol.source.Vector({
			
		    }),
		    style: buffer_style
		});

		selected_features.forEach(function(feature, index, array){
		    
		    var buffered = turf.buffer(ow.getFeatureInGeoJsonObject(feature), fields.buffer_layer_distance, fields.buffer_layer_units);
			
			console.log(ow.getFeatureInGeoJsonObject(feature));
			
		    bufferfc = ow.FormatGeoJson.readFeature(buffered);
		   
		    buffer_layer.getSource().addFeature(bufferfc);
		    ow.addGeoJsonToSource(buffered , buffer_layer);
	
		});
		
		ow.rootGroup.getLayers().push(buffer_layer);
		sw.init($("#layer_tree"), ow);
		
	    }, ow, {
		accept_only: ["Polygon", "Point", "LineString"],
		min: 1
	    });
	    

	    
	    

	}); // document.ready()
	
	    $("#buffer_layer_style_fill").spectrum({
		color: "rgba(255, 141, 71, 0.8)",
		showAlpha: true,
		change: function(color) {
		    $("#buffer_layer_style_fill").val(color.toRgbString());
		}
	    }).val("rgba(255, 141, 71, 0.8)");
	    
	    $("#buffer_layer_style_outline").spectrum({
		color: "rgba(0, 0, 0, 1)",
		showAlpha: true,
		change: function(color) {
		    $("#buffer_layer_style_outline").val(color.toRgbString());
		}
	    }).val("rgba(0, 0, 0, 1)");
	
    }; // return function

}); 