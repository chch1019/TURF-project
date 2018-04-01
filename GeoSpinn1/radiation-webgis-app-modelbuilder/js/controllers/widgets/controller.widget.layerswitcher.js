define(["switcherWrapper", "sortable_nested", "bootstrap"], function(switcherWrapper, sortable_nested, bootstrap){

    return function($rootScope, $element, $scope){

	$element.draggable();
	
	$element.draggable();
	
	$element.find(".tool-grab .minimizer").on("click", function(){
	    $(this).parent().next().slideToggle( "fast", function() {
		
	    });
	});

	var sW = new switcherWrapper();
	$rootScope.switcherWrapper = sW;
	var olWrapper = $rootScope.openLayersWrapper;
	
	sW.init($element.find("#layer_tree"), olWrapper);


	olWrapper.rootLayerCollection.on("change", function(){
	    sW.init($("#layer_tree"), olWrapper);
	});

	$('#layer_tree').nestedSortable({
	    handle: 'div',
	    items: 'li',
	    toleranceElement: '> div',
	    helper:	'clone',
	    placeholder: 'placeholder',
	    tolerance: 'pointer',
	    disableNestingClass: 'layer',
	    protectRoot: true,
	    startCollapsed: false,
	    opacity: .6,

	    receive: function( event, ui ) {

	    },
	    start: function (event, ui) {
		try {
		    rootGroup = $(ui.item).parent().closest(".group").data().layer_data;
		    var grouplength = rootGroup.self.getLayers().getLength()-1;
		    start_pos = grouplength - ui.item.index();
		} catch(e){

		}
	    },
	    beforeStop: function(event, ui) {

	    },
	    stop: function( event, ui ) {
		try {
		    newGroup = $(ui.item).parent().closest(".group").data().layer_data;
		    layer = ui.item.data().layer_data.self;
		    if(newGroup.name === rootGroup.name){
			var grouplength = rootGroup.self.getLayers().getLength()-1;
			grouplength = grouplength < 0 ? 0 : grouplength;
			var insertindex = grouplength - ui.item.index();
			olWrapper.removeLayer(layer, rootGroup.self);
			olWrapper.insertLayerAt(layer, rootGroup.self, insertindex);
		    } else {
			var grouplength = newGroup.self.getLayers().getLength();
			grouplength = grouplength < 0 ? 0 : grouplength;
			var insertindex = grouplength - ui.item.index();
			olWrapper.removeLayer(layer, rootGroup.self);
			olWrapper.insertLayerAt(layer, newGroup.self, insertindex);
		    }
		} catch(e){

		}

	    }
	});
	

    };

}); 