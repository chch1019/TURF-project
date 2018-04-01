define(["openlayers"], function(ol){
    
    var olStyles = function(){
	
	var self = this;
	
	self.image = new ol.style.Circle({
	    radius: 5,
	    stroke: new ol.style.Stroke({
		color: 'rgba(188, 93, 0, 1)', 
		width: 2
	    }),
	    fill: new ol.style.Fill({
		 color: 'rgba(255, 125, 0, 1)'
	    })
	});
	
	self.styles = {
		
	    'Point': [new ol.style.Style({
		image: self.image
	    })],

	    'LineString': [new ol.style.Style({
		stroke: new ol.style.Stroke({
		    color: 'green',
		    width: 5
		})
	    })],

	    'MultiLineString': [new ol.style.Style({
		stroke: new ol.style.Stroke({
		    color: 'green',
		    width: 1
		})
	    })],

	    'MultiPoint': [new ol.style.Style({
		image: self.image
	    })],

	    'MultiPolygon': [new ol.style.Style({
		stroke: new ol.style.Stroke({
		    color: 'yellow',
		    width: 1
		}),
		fill: new ol.style.Fill({
		    color: 'rgba(255, 255, 0, 0.4)'
		})
	    })],

	    'Polygon': [new ol.style.Style({
		stroke: new ol.style.Stroke({
		    color: 'rgba(93, 93, 93, 1)',
		    width: 1
		}),
		fill: new ol.style.Fill({
		    color: 'rgba(0, 0, 255, 0)'
		})
	    })],

	    'GeometryCollection': [new ol.style.Style({
		stroke: new ol.style.Stroke({
		    color: 'magenta',
		    width: 2
		}),
		fill: new ol.style.Fill({
		    color: 'magenta'
		}),
		image: new ol.style.Circle({
		    radius: 10,
		    fill: null,
		    stroke: new ol.style.Stroke({
		      color: 'magenta'
		    })
		})
	    })],

	    'Circle': [new ol.style.Style({
		stroke: new ol.style.Stroke({
		    color: 'red',
		    width: 2
		}),
		fill: new ol.style.Fill({
		    color: 'rgba(255,0,0,0.2)'
		})
	    })]

	}; 

	self.styleFunction = function(feature, resolution) {
	    return self.styles[feature.getGeometry().getType()];
	};

    };
    
    return olStyles;
    
});