define(["openlayers", "olstyles", "jquery"], function(ol, styles, jquery){
    
    var OpenLayersWrapper = function() {
	
	// PARAMS

	var self = this;

	self.stylist = new styles();

	//self.defaultFeatureProjection = 'EPSG:3857';
	self.defaultFeatureProjection = "EPSG:4326";
	self.defaultDataProjection = "EPSG:4326";
	
	self.formatRightHanded = true;

	self.defaultFeatureReadOptions = { 
	    dataProjection: self.defaultDataProjection, 
	    featureProjection: self.defaultFeatureProjection,
	    rightHanded: self.formatRightHanded 
	};

	self.rootLayerCollection = new ol.Collection();

	self.rootGroup = new ol.layer.Group({
	    name: "root",
	    title: "Root group"
	});

	self.rootLayerCollection.push(self.rootGroup);

	self.selectedFeaturesCollection = new ol.Collection();

	self.interactions = new ol.Collection();

	self.MapView = new ol.View({
	    //center: ol.proj.transform([8.6, 49], self.defaultDataProjection, "EPSG:3857"),
	    center: [8.4, 48.8],
	    zoom: 10,
	    minZoom: 9,
	    projection: self.defaultFeatureProjection
	});

	self.FormatGeoJson = new ol.format.GeoJSON({
	    defaultDataProjection: self.defaultDataProjection,
	    featureProjection: self.defaultFeatureProjection
	});

	// Interaction.select
	self.interactionSelect = new ol.interaction.Select({
	    features: self.selectedFeaturesCollection,
	    layers: function(layer) {
		//return layer;
		//TODO: Add it back later
		return layer.get('selectable') === true;
	    }
	    //TODO: style
	});

	self.interactionSelect.on('select', function(){
	     self.interactionSelect.changed();
	});

	self.interactionSelect.on('change', function(){
	     self.selectedFeaturesCollection.changed();
	});

	self.selectedFeaturesCollection.on("add", function(){
	    self.selectedFeaturesCollection.forEach(function(feature, index, array) {
		
	    });
	});

	self.selectedFeaturesCollection.on("remove", function(){
	    self.selectedFeaturesCollection.forEach(function(feature, index, array) {
		
	    });
	});

	self.interactions.push(self.interactionSelect);

	self.dragpan = new ol.interaction.DragPan();

	self.interactions.push(self.dragpan);

	self.interactionDragbox = new ol.interaction.DragBox({
	    layers: function(layer) {
		//TODO: Add it back later
		return layer.get('selectable') === true;
	    },
	    condition: ol.events.condition.platformModifierKeyOnly
	});

	self.selectLayersOnExtent = function(collection, extent, current_depth){
	    collection.forEach(function(layer, index, array) {
		if(layer instanceof ol.layer.Group && layer.getLayers().getArray().length) {
		    // recursion
		    self.selectLayersOnExtent(layer.getLayers(), extent, current_depth + 1);
		} else if(typeof layer.getSource === "function") {
		    if(typeof layer.getSource().forEachFeatureIntersectingExtent === "function"){
			layer.getSource().forEachFeatureIntersectingExtent(extent, function(feature) {
			    if(layer.get('selectable') === true){
				self.selectedFeaturesCollection.push(feature); 
			    } 
			});
		    }
		}
	    });
	    
	},

	self.interactionDragbox.on('boxend', function() {
	    var extent = self.interactionDragbox.getGeometry().getExtent();
	    self.selectLayersOnExtent(self.rootLayerCollection, extent, 0);
	    self.selectedFeaturesCollection.changed();
	});

	self.interactions.push(self.interactionDragbox);

	self.interactionZoom = new ol.interaction.MouseWheelZoom();
	
	self.interactions.push(self.interactionZoom);
	
	self.dragAndDropInteraction = new ol.interaction.DragAndDrop({
	    formatConstructors: [
		ol.format.GeoJSON
	    ]
	});

	self.dragAndDropInteraction.on('addfeatures', function(event) {
	    var vectorSource = new ol.source.Vector({
		features: event.features
	    });
	    self.rootGroup.getLayers().push(new ol.layer.Vector({
		source: vectorSource,
		selectable: false,
		name: self.generateLayerName(),
		title: self.generateLayerName()
	    }));
	    self.rootLayerCollection.changed();
	});

	self.interactions.push(self.dragAndDropInteraction);

	self.Map = new ol.Map({
	    layers: self.rootLayerCollection,
	    view: self.MapView,
	    interactions: self.interactions
	    //target: "map-window"
	});

	self.baseLayer = new ol.layer.Tile({
	    name: 'osm',
	    title: "OpenStreetMap",
	    selectable:false,
	    source: new ol.source.OSM({})
	});

	self.rootGroup.getLayers().push(self.baseLayer);
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	// MOVE THEM TO THE RIGHT PLACE START

	self.getSelectedFeaturesCollection = function(){
	    return self.selectedFeaturesCollection;
	},

	self.getGeometryTypesInFeatureCollection = function(collection){
	    geom_type_counter = {};
	    collection.forEach(function(feature, index, array) {
		geometry_type = feature.getGeometry().getType();
		if(!geom_type_counter.hasOwnProperty(geometry_type)) geom_type_counter[geometry_type] = 0;
		geom_type_counter[geometry_type] += 1;
	    });
	    return geom_type_counter;
	},
		
	self.getFeatureInGeoJsonString = function(feature, options = {}){
	    $.each(self.defaultFeatureReadOptions, function(key, value){
		if(!options.hasOwnProperty(key)) options[key] = value;
	    });
	    return self.FormatGeoJson.writeFeature(feature, options);
	},
		
	self.getFeatureInGeoJsonObject = function(feature, options = {}){
	    return JSON.parse(self.getFeatureInGeoJsonString(feature, options));
	},
		
	// MOVE THEM TO THE RIGHT PLACE START END
	
	// LAYER STRUCTURE MONITORING //

	self.getDataStructureTree = function(){
	    return self.walkDataStructureRecursiveTree(self.rootLayerCollection.getArray(), [], 1);
	},
		
	self.walkDataStructureRecursiveTree = function(collection, map = [], current_depth){
	    collection.forEach(function(layer, index, array) {
		var type = (layer instanceof ol.layer.Group ? "group" : "layer");
		map[index] = {
		    type: type, 
		    name: layer.getProperties()["name"],
		    title: layer.getProperties()["title"],
		    self: layer,
		    depth: current_depth
		};
		// This child is a group, we need to go deeper (recursion will be executed)
		if(type === "group" && layer.getLayers().getArray().length) {
		    self.walkDataStructureRecursiveTree(layer.getLayers(), map[index].children = [], current_depth + 1);
		};
	    });

	    return map.reverse();
	    // Necessary to revert because openlayers displays the layers in render order (first rendered on the bottom)
	},

	self.getGroupsFromDataStructureRecursive = function(collection, groups = [], current_depth){
	    collection.forEach(function(layer, index, array) {
		if(layer instanceof ol.layer.Group){
		    groups.push({
		       name: layer.getProperties()["name"],
		       title: layer.getProperties()["title"],
		       self: layer,
		       depth: current_depth
		    });
		    if(layer.getLayers().getArray().length) {
			self.getGroupsFromDataStructureRecursive(layer.getLayers(), groups, current_depth + 1);
		    };
		};
	    });
	    return groups;
	},
		
	self.getLayersFromDataStructure = function(collection, map = [], current_depth){
	    collection.forEach(function(layer, index, array) {
		var type = (layer instanceof ol.layer.Group ? "group" : "layer");
		if(type === "layer" && layer instanceof ol.layer.Vector){
		    map.push({
			type: type, 
			name: layer.getProperties()["name"],
			title: layer.getProperties()["title"],
			self: layer,
			depth: current_depth
		    }); 
		}
		// This child is a group, we need to go deeper (recursion will be executed)
		if(type === "group" && layer.getLayers().getArray().length) {
		    self.getLayersFromDataStructure(layer.getLayers(), map, current_depth + 1);
		};
	    });

	    return map;
	},

	// LAYER MANAGEMENT //
	
	// LAYER MOVEMENT ( insert, replace, remove )

	/**
	 *  Inserts a layer at the given index
	 * @param {layer} ol.layer
	 * @param {collection} group / collection
	 * @param {index} The index where we want to insert
	 */
	self.insertLayerAt = function(layer, collection, index){
	    if(collection instanceof ol.layer.Group) collection = collection.getLayers();
	    collection.insertAt(index, layer);
	},
		
	self.setLayerAt = function(layer, collection, index){
	    if(collection instanceof ol.layer.Group) collection = collection.getLayers();
	    collection.setAt(index, layer);
	},	
		
	/**
	 *  Inserts a layer at the end of the collection
	 * @param {layer} ol.layer
	 * @param {collection} group / collection
	 */
	self.insertLayerAtEnd = function(layer, collection){
	    if(collection instanceof ol.layer.Group) collection = collection.getLayers();
	    collection.push(layer);
	},
	// Lazyness	
	self.insertLayer = function(layer, collection){
	    self.insertLayerAtEnd(layer, collection);
	},	

	/**
	 *  Repaces a layer to an another on a given index
	 * @param {layer} ol.layer
	 * @param {collection} group / collection
	 * @param {index} The index where we want the replacement
	 */
	self.replaceLayerAt = function(layer, collection, index){
	    if(collection instanceof ol.layer.Group) collection = collection.getLayers();
	    collection.setAt(index, layer);
	},
		
	/**
	 *  Removes the layer from the collection. 
	 *  The collection parameter can be an instance of ol.layer.Group() or ol.Collection
	 * @param {layer} ol.layer
	 * @param {collection} group / collection
	 */
	self.removeLayer = function(layer, collection){
	    if(collection instanceof ol.layer.Group) collection = collection.getLayers();
	    collection.remove(layer);
	},
		
	self.removeLayerAt = function(collection, index){
	    if(collection instanceof ol.layer.Group) collection = collection.getLayers();
	    collection.removeAt(index);
	},

	// LAYER INVESTIGATION ( search in collection )
	
	/**
	 * Iterates over ol.Collection() elements to figure out that the layer exists in the group or not.
	 * The collection parameter can be a ol.layer.Group() or ol.Collection()
	 * @param {type} layer_searched
	 * @param {type} collection
	 * @returns {Boolean}
	 */
	self.hasLayer = function(layer_searched, collection){
	    if(collection instanceof ol.layer.Group) collection = collection.getLayers();
	    collection.forEach(function(layer_inside, index, array){
		if(layer_inside.getProperties().name === layer_searched.getProperties().name) return true;
	    });
	    return false;
	},
	
	self.validJson = function(json){
	    if(typeof json === "object") json = JSON.stringify(json);
	    try {
		JSON.parse(json);
	    } catch (e) {
		return false;
	    }
	    return true;
	},
		
	self.generateLayerName = function(){
	    return Math.random().toString(36).substring(7);
	},	
		
	self.fetchGeoJsonData = function(path){
	    // Returning an Ajax promise
	    return $.getJSON(path).then(function(geojson_data){
		// Returning the data when the promise gets resolved
		return geojson_data;
	    });
	},
		
	self.addGeoJsonToSource = function(geojson, layer, options = {}){
	    $.each(self.defaultFeatureReadOptions, function(key, value){
		if(!options.hasOwnProperty(key)) options[key] = value;
	    });
	    switch(geojson.type){
		case "FeatureCollection":
		    layer.getSource().addFeatures(self.FormatGeoJson.readFeatures(geojson, options));
		break;

		case "Feature":
		    layer.getSource().addFeature(self.FormatGeoJson.readFeature(geojson, options));
		break;
	    }
	},

	self.addFeaturesFromGeoJson = function(type, source, layer){
	    switch(type){
		case "path":
		    self.fetchGeoJsonData(source).done(function(geojson_data){
				//console.log(geojson_data)
			self.addGeoJsonToSource(geojson_data, layer);
			
		    });
		    break;
		case "geojson":
		    self.addGeoJsonToSource(source, layer);
		    break;
	    }
	};
	
	self.getGeoJsonFeatures = function(source,store){

		    self.fetchGeoJsonData(source).done(function(geojson_data){
			
				store = geojson_data
				return store;
				//self.addGeoJsonToSource(geojson_data, layer);
			
		    });


    };
	};
    // return the class itself
    return OpenLayersWrapper;
});