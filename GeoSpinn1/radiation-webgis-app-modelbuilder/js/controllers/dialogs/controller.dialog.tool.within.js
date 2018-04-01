define(["jqueryui", "turf", "openlayers"], function(jqueryui, turf, ol){
    
    //console.log("require.js: controller.dialog.tool.buffer.js loaded");

    return function($rootScope, $element){
	$(document).ready(function(){
	    
	    var dw = $rootScope.dialogWrapper;
	    var ow = $rootScope.openLayersWrapper;
	    var sw = $rootScope.switcherWrapper;
	    
	    dw.initTool("within", $element, function(){

		selected_features = ow.getSelectedFeaturesCollection();

		var fields = { };
		$.each(dw.tools.within.form.serializeArray(), function( key , value) {
		    fields[this.name] = this.value;
		});

		layers = ow.getLayersFromDataStructure(ow.rootLayerCollection, [], 0);
		layer_surveyed = {};
		
		layers.forEach(function(layer, index, array) {
		    if(layer.name === fields.within_layer_surveyed) {
			layer_surveyed = layer.self;
		    }
		});
		
		within_style =  new ol.style.Circle({
		    radius: 6,
		    stroke: new ol.style.Stroke({
			color: fields.within_layer_style_outline,
			width: parseInt(fields.within_layer_style_outline_width)
		    }),
		    fill: new ol.style.Fill({
			 color: fields.within_layer_style_fill
		    })
		});
		
		var within_layer = new ol.layer.Vector({
		    name: ow.generateLayerName(),
		    title: fields.within_layer_title,
		    source: new ol.source.Vector({
			
		    }),
		    style:  new ol.style.Style({
			image: within_style
		    })
		});
		
		
		var poly_fc = [];
		
		selected_features.forEach(function(fc, index, array) {
		    poly_fc.push(ow.FormatGeoJson.writeFeatureObject(fc, ow.defaultFeatureReadOptions));
		});
		
		var poly_fc = turf.featureCollection(poly_fc);
	
		var within = turf.within(
			ow.FormatGeoJson.writeFeaturesObject(layer_surveyed.getSource().getFeatures(), ow.defaultFeatureReadOptions),
			ow.FormatGeoJson.writeFeaturesObject(selected_features.getArray(), ow.defaultFeatureReadOptions)
		    );
		
		ow.addGeoJsonToSource(within , within_layer);
		
		ow.rootGroup.getLayers().push(within_layer);
		sw.init($("#layer_tree"), ow);
		
		
		
		
	    }, ow, {
		accept_only: ["Polygon"],
		min: 1
		//max: 1
	    });
	    
	    dw.setLayerList("within", "within_layer_surveyed");

	}); // document.ready()
	
	$("#within_layer_style_fill").spectrum({
	   color: "rgba(210, 0, 210, 0.8)",
	   showAlpha: true,
	   change: function(color) {
	       $("#within_layer_style_fill").val(color.toRgbString());
	   }
       }).val("rgba(210, 0, 210, 0.8)");

       $("#within_layer_style_outline").spectrum({
	   color: "rgba(0, 0, 0, 1)",
	   showAlpha: true,
	   change: function(color) {
	       $("#within_layer_style_outline").val(color.toRgbString());
	   }
       }).val("rgba(0, 0, 0, 1)");
	
	
    }; // return function

}); 