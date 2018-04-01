define(["jqueryui", "turf", "openlayers", "Voronoi", "Point"], function(jqueryui, turf, ol, Voronoi, Point){
    
    //console.log("require.js: controller.dialog.tool.buffer.js loaded");

    return function($rootScope, $element){
	$(document).ready(function(){
	    
	    var dw = $rootScope.dialogWrapper;
	    var ow = $rootScope.openLayersWrapper;
	    var sw = $rootScope.switcherWrapper;
	    
	    dw.initTool("voronoi", $element, function(){

		selected_features = ow.getSelectedFeaturesCollection();

		var fields = { };
		$.each(dw.tools.voronoi.form.serializeArray(), function( key , value) {
		    fields[this.name] = this.value;
		});

		voronoi_style =  new ol.style.Style({
		    stroke: new ol.style.Stroke({
			color: fields.voronoi_layer_style_outline,
			width: parseInt(fields.voronoi_layer_style_outline_width)
		    }),
		    fill: new ol.style.Fill({
			 color: fields.voronoi_layer_style_fill
		    })
		});

		var voronoi_layer = new ol.layer.Vector({
		    name: ow.generateLayerName(),
		    title: fields.voronoi_layer_title,
		    source: new ol.source.Vector({
			
		    }),
		    style: voronoi_style
		});
	
		var extent = ow.Map.getView().calculateExtent(ow.Map.getSize());

		w = extent[2] - extent[0];
		h = extent[3] - extent[1];
		
		points = [];

		v = new Voronoi();

		selected_features.forEach(function(feature, index, array){
		    
		    fc_geojson = ow.FormatGeoJson.writeFeatureObject(feature, ow.defaultFeatureReadOptions);
	
		    points.push(new Point( fc_geojson.geometry.coordinates[0] ,fc_geojson.geometry.coordinates[1] ));
	
		});

		//compute voronoi
		v.Compute(points, w, h);

		edges = v.GetEdges();
		cells = v.GetCells();

		polygons = [];
		poly = [];
		var linecollection = [];
		var nodes = [];
		for(i = 0; i < edges.length; i++){

		    linecollection.push(turf.lineString([
			[edges[i].start.x, edges[i].start.y],
			[edges[i].end.x, edges[i].end.y]
		    ]));

		}

		var donorlines = turf.featureCollection(linecollection);
		//HACK 1.0 buffering the lines (0.000001)
		var polygons_fc = turf.buffer(donorlines,  0.000001, "kilometers");

		function touching(p1, p2){
		    if(typeof p1 !== "undefined" && typeof p2 !== "undefined"){
			var donor = turf.union(p1, p2);
			if(donor.geometry.type === "Polygon") return true;
		    }
		    return false;
		}

		var envelope = turf.envelope(polygons_fc);
		var emergency_extent = turf.buffer(envelope, -100, "kilometers");

		var current_diff = emergency_extent;
		// window extent
		w = extent[2] - extent[0];
		h = extent[3] - extent[1];
		// polygon for window extent
		current_diff = turf.polygon([[ [extent[0], extent[3]], [extent[2], extent[3]], [extent[2], extent[1]], [extent[0], extent[1]], [extent[0], extent[3]] ]]);


		// Intersect / Difference
		for(var i = 0; i < polygons_fc.features.length; i++){
		    current_diff = turf.difference(current_diff, polygons_fc.features[i]);
		}
		// result of all differences
		var multipoly = current_diff;

		var polygons = [];
		// HACK 2.0 add back missing area
		for(var i = 0; i < multipoly.geometry.coordinates.length; i++){
		    //0.0000021
		    var final_poly = turf.buffer(turf.polygon(multipoly.geometry.coordinates[i]), 0.0000021, "kilometers");
		    final_poly.properties.id = i;
		    polygons.push(final_poly);
		}

		polygons_fc = turf.featureCollection(polygons);

		ow.addGeoJsonToSource(polygons_fc, voronoi_layer);

		ow.rootGroup.getLayers().push(voronoi_layer);
		sw.init($("#layer_tree"), ow);

	    }, ow, {
		accept_only: ["Point"],
		min: 3
	    });

	}); // document.ready()
	
	$("#voronoi_layer_style_fill").spectrum({
	    color: "rgba(28, 89, 0, 0.8)",
	    showAlpha: true,
	    change: function(color) {
		$("#voronoi_layer_style_fill").val(color.toRgbString());
	    }
	}).val("rgba(28, 89, 0, 0.8)");

	$("#voronoi_layer_style_outline").spectrum({
	    color: "rgba(0, 0, 0, 1)",
	    showAlpha: true,
	    change: function(color) {
		$("#voronoi_layer_style_outline").val(color.toRgbString());
	    }
	}).val("rgba(0, 0, 0, 1)");
	
    }; // return function

}); 