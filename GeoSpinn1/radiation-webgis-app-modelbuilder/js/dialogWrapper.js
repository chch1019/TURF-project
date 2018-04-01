define(["jqueryui", "bootstrap"], function(ui, bs){

    var dialogWrapper = function() {

	var self = this;
	self.dialogs = {};
	self.tools = {};
	self.options = {};

	self.validateForm = function(tool){
	    form = tool.form;
	    tool.errors = {};
	    form.children().find(':input').each(function(key, element){
		field = $(element);
		tool.errors[field.attr('id')] = [];
		if(field.data().required){
		    self.validateFormFieldLegth(field, tool.errors);
		};
	    });
	    var clean = true;
	    $.each(tool.errors, function(key, val){
		if(val.length > 0) clean = false;
		return false;
	    });
	    return clean;
	},

	self.setLayerList = function(tool, field_id){
	    select_field = self.tools[tool].form.find("#"+field_id);
	    layers = self.ow.getLayersFromDataStructure(self.ow.rootLayerCollection, [], 0);
	    $.each(layers, function( k, v) {
		select_field.append(new Option(v.title, v.name));
	    });
	},

	self.validateFormField = function(field, tool){
	    tool.errors[field.attr('id')] = [];
	    if(field.data().required){
		self.validateFormFieldLegth(field, tool.errors);
	    };
	    return (tool.errors[field.attr('id')].length === 0) ? true : false;
	},

	self.printErrorMessages = function(tool){
	    form = tool.form;
	    errors = tool.errors;
	    form.children().find(':input').each(function(key, element){
		field = $(element);
		if(typeof field.attr("id") !== "undefined" && errors.hasOwnProperty(field.attr("id"))){
		    
		    field.closest(".form-group").addClass("has-error");
		    
		}
	    });
	},

	self.validateFormFieldLegth = function(field, error_holder){
	    if(field.val().length === 0){
		error_holder[field.attr('id')].push("This field is reqired (" + field.closest(".form-field").find("label").html().toLowerCase() + ") ");
	    } else if(typeof field.data().min_length !== "undefined" && field.data().min_length > field.val().length){
		error_holder[field.attr('id')].push("The given value for (" + field.closest(".form-field").find("label").html().toLowerCase() + ") is too short. Limit: " + field.data().min_length + " ");
	    } else if (typeof field.data().max_length !== "undefined" && field.data().max_length < field.val().length){
		error_holder[field.attr('id')].push("The given value for (" + field.closest(".form-field").find("label").html().toLowerCase() + ") is too long. Limit: " + field.data().max_length + " ");
	    }
	    return true;
	},

	self.initTool = function(name, element, operation, ow, geom_settings = {}){
	    
	    self.tools[name] = element;
	    self.tools[name].toogle = $(self.tools[name].find("button")[0]);
	    self.tools[name].form = self.tools[name].find("form");
	    self.tools[name].errors = {};
	    self.ow = ow;

	    setInterval(function(){
		
		selected = ow.selectedFeaturesCollection;
		
		if(selected.getLength() < geom_settings.min || (selected.getLength() > geom_settings.max && geom_settings.max !== null)){
		    
		    element.find(".tool").prop('disabled', true);
		} else {
		
		    if(geom_settings.accept_only.length > 0){
			selected.forEach(function(feature, index, array) {
			    type = feature.getGeometry().getType();
			    if($.inArray(type, geom_settings.accept_only) === -1){
				//$("#" + name + "_button_create").button('disable');
				element.find(".tool").prop('disabled', true);
				 
			    } else {
				//$("#" + name + "_button_create").button('enable');
				element.find(".tool").prop('disabled', false);
				
			    }
			});
		    }
		    
		}
		
	    }, 1000);
	    /*
	    		setInterval(function(){
			    console.log(self.validateForm(self.tools[name]));
			    if(self.validateForm(self.tools[name])){
				$("#" + name + "_button_create").prop('disabled', false);
			    } else {
				$("#" + name + "_button_create").prop('disabled', true);
			    };
			}, 3000);
	    */
	    self.tools[name].form.dialog({
		autoOpen: false,
		//height: 400,
		width: 600,
		modal: true,
		create: function () {
		    $(".ui-widget-header").hide();
		    self.tools[name].form.children().find(':input').each(function(key, element){
			var field = $(element);
			
			field.on("focus", function(){
			    var fieldTracker = setInterval(function(){
				if(self.validateFormField(field, self.tools[name])){
				    field.closest(".form-group").removeClass("has-error").addClass("has-success");
				    field.closest(".form-field").find(".alert").fadeOut(200);
				} else {
				    field.closest(".form-group").removeClass("has-success").addClass("has-error");
				    field.closest(".form-field").find(".alert").fadeIn(200).html(self.tools[name].errors[field.attr('id')]);
				};
			    }, 2000);
			    field.on("focusout", function(){
				clearInterval(fieldTracker);
			    });
			});
		    });

		},
		
		open: function() {
		    
		   	setInterval(function(){
			    //console.log(self.validateForm(self.tools[name]));
			    if(self.validateForm(self.tools[name])){
				//$("#" + name + "_button_create").button('enable');
				$("#" + name + "_button_create").prop( "disabled", false );
				//console.log("enable");
			    } else {
				$("#" + name + "_button_create").prop( "disabled", true );
				//$("#" + name + "_button_create").button('disable');
			    };
			}, 3000);
		},
		buttons: [{
		    text: "Create",
		    id: name + "_button_create",
		    //disabled: true,
		    create: function(event, ui){
			setInterval(function(){
			    if(self.validateForm(self.tools[name])){
				//$("#" + name + "_button_create").button('enable');
				$("#" + name + "_button_create").prop( "disabled", false );
			    } else {
				//$("#" + name + "_button_create").button('disable');
				$("#" + name + "_button_create").prop( "disabled", true );
			    };
			}, 3000);
		    },
		    click: function() {

			if(self.validateForm(self.tools[name])){
				
			    try{
				operation();
			    } catch (e){
				console.log("Geometry error");
			    }
			    $( this ).dialog( "close" );
			} else {
			    self.printErrorMessages(self.tools[name]);
			};
		    }
		},
		{
		    text: "Close",
		    click: function() {
		      $( this ).dialog( "close" );
		    }
		}]
	
	    });
	    
	   
	    self.tools[name].toogle.on( "click", function(){
		//check if the data type is good for this operation
		self.tools[name].form.dialog("open");
	    });
	    
	}
	
	
	
	/************For Model dw.initTool *************/
	
	
	self.initModel = function(name, element, operation, ow, geom_settings = {}){
	    
	    self.tools[name] = element;
	    self.tools[name].toogle = $(self.tools[name].find("button")[0]);
	    self.tools[name].form = self.tools[name].find("form");
	    self.tools[name].errors = {};
	    self.ow = ow;


	    self.tools[name].form.dialog({
		autoOpen: false,
		height: 450,
		width: 600,
		modal: true,
		create: function () {
		    $(".ui-widget-header").hide();
		    self.tools[name].form.children().find(':input').each(function(key, element){
			var field = $(element);
			
			field.on("focus", function(){
			    var fieldTracker = setInterval(function(){
				if(self.validateFormField(field, self.tools[name])){
				    field.closest(".form-group").removeClass("has-error").addClass("has-success");
				    field.closest(".form-field").find(".alert").fadeOut(200);
				} else {
				    field.closest(".form-group").removeClass("has-success").addClass("has-error");
				    field.closest(".form-field").find(".alert").fadeIn(200).html(self.tools[name].errors[field.attr('id')]);
				};
			    }, 2000);
			    field.on("focusout", function(){
				clearInterval(fieldTracker);
			    });
			});
		    });

		},
		
		open: function() {
		    
		   	setInterval(function(){
			    //console.log(self.validateForm(self.tools[name]));
			    if(self.validateForm(self.tools[name])){
				//$("#" + name + "_button_create").button('enable');
				$("#" + name + "_button_create").prop( "disabled", false );
				//console.log("enable");
			    } else {
				$("#" + name + "_button_create").prop( "disabled", true );
				//$("#" + name + "_button_create").button('disable');
			    };
			}, 3000);
		},
		buttons: [{
		    text: "Run",
		    id: name + "_button_create",
		    //disabled: true,
		    create: function(event, ui){
			setInterval(function(){
			    if(self.validateForm(self.tools[name])){
				//$("#" + name + "_button_create").button('enable');
				$("#" + name + "_button_create").prop( "disabled", false );
			    } else {
				//$("#" + name + "_button_create").button('disable');
				$("#" + name + "_button_create").prop( "disabled", true );
			    };
			}, 3000);
		    },
		    click: function() {
				//operation();
				console.log(self.tools[name]);
			if(self.validateForm(self.tools[name])){
			    try{
				operation();
			    } catch (e){
				console.log("Geometry error");
			    }
			    $( this ).dialog( "close" );
			} else {
			    self.printErrorMessages(self.tools[name]);
			};
		    }
		},
		{
		    text: "Close",
		    click: function() {
		      $( this ).dialog( "close" );
		    }
		}]
	
	    });
	    
	   
	    self.tools[name].toogle.on( "click", function(){
		//check if the data type is good for this operation
		self.tools[name].form.dialog("open");
	    });
	    
	}
	
    };
    
    return new dialogWrapper();
    
});