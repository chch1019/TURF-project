define(["jqueryui", "turf", "openlayers"], function(jqueryui, turf, ol){

    return function($rootScope, $element){
	$(document).ready(function(){

	    var dw = $rootScope.dialogWrapper;
	    var ow = $rootScope.openLayersWrapper;
	    var sw = $rootScope.switcherWrapper;
	    
	    dw.initTool("union", $element, function(){

		selected_features = ow.getSelectedFeaturesCollection();

		var fields = { };
		$.each(dw.tools.union.form.serializeArray(), function( key , value) {
		    fields[this.name] = this.value;
		});

		union_style =  new ol.style.Style({
		    stroke: new ol.style.Stroke({
			color: fields.union_layer_style_outline,
			width: parseInt(fields.union_layer_style_outline_width)
		    }),
		    fill: new ol.style.Fill({
			 color: fields.union_layer_style_fill
		    })
		});

		var union_layer = new ol.layer.Vector({
		    name: ow.generateLayerName(),
		    title: fields.union_layer_title,
		    source: new ol.source.Vector({
			
		    }),
		    style: union_style
		});
		
		var union;
		
		selected_features.forEach(function(feature, index, array) {
		    if (index === 0) {
			union = turf.union(
				ow.FormatGeoJson.writeFeatureObject(selected_features.item(index+1), ow.defaultFeatureReadOptions), 
				ow.FormatGeoJson.writeFeatureObject(selected_features.item(index), ow.defaultFeatureReadOptions)
			);
			index++;
		    } else {
			union = turf.union(union, ow.FormatGeoJson.writeFeatureObject(selected_features.item(index), ow.defaultFeatureReadOptions));
		    }
		});

	
		ow.addGeoJsonToSource(union , union_layer);

		ow.rootGroup.getLayers().push(union_layer);
		sw.init($("#layer_tree"), ow);
		
	    }, ow,{
		accept_only: ["Polygon"],
		min: 2
	    });


	}); // document.ready()
	
	 $("#union_layer_style_fill").spectrum({
	    color: "rgba(210, 0, 210, 0.8)",
	    showAlpha: true,
	    change: function(color) {
		$("#union_layer_style_fill").val(color.toRgbString());
	    }
	}).val("rgba(210, 0, 210, 0.8)");

	$("#union_layer_style_outline").spectrum({
	    color: "rgba(0, 0, 0, 1)",
	    showAlpha: true,
	    change: function(color) {
		$("#union_layer_style_outline").val(color.toRgbString());
	    }
	}).val("rgba(0, 0, 0, 1)");
	
    }; // return function

}); 