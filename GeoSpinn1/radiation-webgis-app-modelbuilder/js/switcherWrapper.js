define(["jquery","jqueryui", "bootstrap", "openlayers"], function(jquery, jqueryui, bs, ol){
    
    var switcherWrapper = function() {

	var self = this;
	
	self.container;
	self.treeData;

	self.init = function(container, olWrapper, dialogWrapper){
	    
	    self.container = container;
	    self.dialogWrapper = dialogWrapper;
	    self.olWrapper = olWrapper;
	    self.treeData = self.olWrapper.getDataStructureTree();
	    self.container.html("");
	    self.buildTree(self.treeData, 0, container);
	   
	};
	
	self.appendFragment = function (element, url){
		return $.get(url);
	},
	
	self.deleteLayer = function(layer, group){
	    var txt;
	    var r = confirm("Are you sure want to delete " +layer.title+ "?");
	    if (r == true) {
		group.self.getLayers().remove(layer.self);
		$(self.container).html("");
		self.init(self.container, self.olWrapper);
	    } else {
		//console.log("cancelled");
	    }
	},
	
	self.setLayerVisibility = function(layer, c, visibility_icon){
	    
	    if(layer.getVisible() === true){
		layer.setVisible(false);
		c.fadeTo( "fast" , 0.5);
		$(visibility_icon).removeClass("fa fa-eye").addClass("fa fa-eye-slash");
	    } else {
		layer.setVisible(true);
		c.fadeTo( "fast" , 1);
		$(visibility_icon).removeClass("fa fa-eye-slash").addClass("fa fa-eye");
	    }
	    
	},
		
	self.setLayerSelectable = function(layer, c, selectable_icon){
	    var props = layer.getProperties();
	    
	    if(props.hasOwnProperty("selectable") && props.selectable === true){
		$(selectable_icon).removeClass("fa fa-check-square").addClass("fa fa-check-square-o");
		layer.set("selectable", false);
	    } else {
		layer.set("selectable", true);
		$(selectable_icon).removeClass("fa fa-check-square-o").addClass("fa fa-check-square");
	    }
	    
	},
	
	self.downloadLayer = function(layer){
	    var layer_obj = layer.self;
	  
	    var layer_in_gj = self.olWrapper.FormatGeoJson.writeFeaturesObject(layer_obj.getSource().getFeatures(), self.olWrapper.defaultFeatureReadOptions);

	    var blob = new Blob([JSON.stringify(layer_in_gj)], {type: 'text/json'});
		var e    = document.createEvent('MouseEvents');
		var a    = document.createElement('a');

	    a.download = layer.name + ".geojson";
	    a.href = window.URL.createObjectURL(blob);
	    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':');
	    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	    a.dispatchEvent(e);
 
	},
	
	self.setLayerSettings = function(item){

	    $("#layer_settings #layer_style_fill").spectrum({
		color: "rgba(255, 141, 71, 0.8)",
		showAlpha: true,
		change: function(color) {
		    $("#layer_settings #layer_style_fill").val(color.toRgbString());
		}
	    }).val("rgba(255, 141, 71, 0.8)");
	    
	    $("#layer_settings #layer_style_outline").spectrum({
		color: "rgba(0, 0, 0, 1)",
		showAlpha: true,
		change: function(color) {
		    $("#layer_settings #layer_style_outline").val(color.toRgbString());
		}
	    }).val("rgba(0, 0, 0, 1)"); 

	    dialog = $( "#layer_settings" ).dialog({
	    autoOpen: false,
	    height: 300,
	    width: 600,
	    title: "Layer style",
	    modal: true,
	     buttons: {
		"Restyle" : function(){

		    item.self.getSource().getFeatures().forEach(function(feature, index, array) {
			if(feature.getGeometry().getType() === "Point") {
			    feature.setStyle(new ol.style.Style({
				image: new ol.style.Circle({
				    radius: 5,
				    stroke: new ol.style.Stroke({
					color: $("#layer_settings #layer_style_outline").val(),
					width: 1
				    }),
				    fill: new ol.style.Fill({
					 color: $("#layer_settings #layer_style_fill").val()
				    })
				})
			    }));
			} else {
			    feature.setStyle(new ol.style.Style({
				stroke: new ol.style.Stroke({
				    color: $("#layer_settings #layer_style_outline").val(),
				    width: 1
				}),
				fill: new ol.style.Fill({
				     color: $("#layer_settings #layer_style_fill").val()
				})
			    }));
			}
		    });
		    dialog.dialog( "close" );
		},
		Cancel: function() {
		  dialog.dialog( "close" );
		}
	     },
		close: function() {

		}
	    });
	     
	    dialog.dialog( "open" );
		
	},	
	
	self.buildTree = function(content = [], current_depth, container){
		$.each(content, function( key , item ){

		    newListItemContainer = document.createElement('li');
		    $(newListItemContainer).data("layer_data", item);
		    
		    var curr = $(newListItemContainer);
		    
		    var delete_icon = document.createElement('i');
		    
		    $(delete_icon).addClass("fa fa-trash");
		    
		    var visibility_icon = document.createElement('i');

		    $(visibility_icon).on("click", function(){
			self.setLayerVisibility(item.self, curr, visibility_icon);
		    });
		    
		    if(item.self.getVisible() === true){
			$(visibility_icon).addClass("fa fa-eye");
			curr.fadeTo( "fast" , 1);
		    } else {
			$(visibility_icon).addClass("fa fa-eye-slash");
			curr.fadeTo( "fast" , 0.5);
		    }
		    
		    var selectable_icon = document.createElement('i');

		    var props = item.self.getProperties();
		    
		    if(props.hasOwnProperty("selectable") && props.selectable === true){
			$(selectable_icon).addClass("fa fa-check-square");
		    } else {
			$(selectable_icon).addClass("fa fa-check-square-o");
		    }
		    
		    var settings_icon = document.createElement('i');
		    
		    $(settings_icon).addClass("fa fa-cog");
		    
		    $(settings_icon).on("click", function(){
			self.setLayerSettings(item);
		    });
		    
		    var download_icon = document.createElement('i');
		    
		    $(download_icon).addClass("fa fa-download");
		    
		    $(selectable_icon).on("click", function(){
			self.setLayerSelectable(item.self, curr, selectable_icon);
		    });
		    
		    if(item.type === "group"){
			
			group_icon = '<i class="fa fa-object-group" aria-hidden="true"></i>';
			group_header = '<div class="group-header"><div class="title">' + group_icon + " " + item.title + '</div><div class="controls"></div></div>';
			child_nest = document.createElement('ol');

			$(newListItemContainer).addClass("group").append(group_header).append(child_nest);
			$(newListItemContainer).find(".controls").append(visibility_icon);
			$(newListItemContainer).find(".controls").append(delete_icon);
			
			$(delete_icon).on("click", function(){
			    self.deleteLayer(item, $(this).closest(".group").parent().closest(".group").data().layer_data);
			});
			
			$(container).append(newListItemContainer);

			self.buildTree(item.children, current_depth + 1, child_nest);

		    } else if(item.type === "layer"){

			layer_header = '<div class="layer-header"><div class="title">' + item.title + '</div><div class="controls"></div></div>';
			$(newListItemContainer).addClass("layer").append(layer_header);
			
			if(item.self instanceof ol.layer.Vector) $(newListItemContainer).find(".controls").append(settings_icon);
			
			$(newListItemContainer).find(".controls").append(selectable_icon);
			$(newListItemContainer).find(".controls").append(visibility_icon);
			$(newListItemContainer).find(".controls").append(delete_icon);
			if(item.self instanceof ol.layer.Vector){
			    $(newListItemContainer).find(".controls").append(download_icon);
			    
			    $(download_icon).on("click", function(){
				self.downloadLayer(item);
			    });
			    
			}

			$(delete_icon).on("click", function(){
			    self.deleteLayer(item, $(this).closest(".group").data().layer_data);
			});
			
			$(container).append(newListItemContainer);

		    }

		});
	};

    };
   
    return switcherWrapper;
    
});