define(['base/js/namespace', './GeppettoJupyter', 'base/js/events'], function (Jupyter, GeppettoJupyter, events) {

// Create a widget manager instance. 
// var uuid = Jupyter_js_widgets.uuid;
// require('phosphor/styles/base.css');
// require('jupyter-js-widgets/css/widgets.built.css');

	var manager = new window.parent.GEPPETTO.GeppettoWidgetManager(window.parent.document.body);

	/**
	 * Helper function for creating and displaying widgets.
	 * @return {Promise<WidgetView>}
	 */
	function createWidget(widgetType, value, description) {
		// Create the widget model.
		return manager.new_widget({
			model_module: 'jupyter-js-widgets',
			model_name: widgetType + 'Model',
			widget_class: 'jupyter.' + widgetType,
			model_id: 0
		// Create a view for the model.
		}).then(function(model) {
			console.log(widgetType + ' model created');

			model.set({
				description: description || '',
				value: value,
			});
			return  manager.create_view(model);
		}, console.error.bind(console))
		.then(function(view) {
			console.log(widgetType + ' view created');
			manager.display_view(null, view);
			return view;
		}, console.error.bind(console));
	};

	var defaultHTML = 'test <b>text</b>';
	var textArea = createWidget('Textarea', defaultHTML, 'HTML:');
	var html = createWidget('HTML', defaultHTML);

	// Create a link model.
	manager.new_widget({
		model_module: 'jupyter-js-widgets',
		model_name: 'LinkModel',
		widget_class: 'jupyter.JSLink',
		model_id: 1

	// Set the link model state.
	}).then(function(link) {
		console.log('link created');

		return Promise.all([textArea, html]).then(
			function(models) {
				console.log('setting link');
				var textArea = models[0];
				var html = models[1];
				link.set({
					'source': [textArea.model, 'value'],
					'target': [html.model, 'value']
				});
				link.save_changes();
				console.log('link set');
			}
		);
	}).then(function() {
		var event = new Event('widgetsRendered');
		document.dispatchEvent(event);
	});


	function run_cell() {
		console.log("POBA");
	}

	function load_extension() {
		// Load css first
		var $stylesheet = $('<link/>')
			.attr({
				id: 'jupyter_geppetto',
				rel: 'stylesheet',
				type: 'text/css',
				href: require.toUrl('/nbextensions/jupyter_geppetto/geppettoJupyter.css')
			})
			.appendTo('head');

		// Hide the header
		$('#header').hide();

		// Add shortcut to hide/show header
		IPython.keyboard_manager.command_shortcuts.add_shortcut('ctrl-`', function (event) {
			if (IPython.notebook.mode == 'command') {
				$('#header').toggle();
				return false;
			}
			return true;
		});



		// Read attributes from url
		function getParameterByName(name) {
			name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
			var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(window.parent.location.search);
			return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		}
		module = getParameterByName('load_module');
		model = getParameterByName('load_model');

		window.parent.IPython = IPython;

		// If a Geppetto extension is defining a custom behavior to load the kernel we call it
		if(window.parent.customJupyterModelLoad!=undefined){
			window.parent.customJupyterModelLoad(module,model);
		}



	}

	 var load_ipython_extension = function () {
        if (IPython.notebook) {
            load_extension();
        }
        $([IPython.events]).on("notebook_loaded.Notebook", load_extension);
		$([IPython.events]).on('execute.CodeCell', run_cell);
    };

	// $([IPython.events]).on("notebook_loaded.Notebook", function () {
	// 	IPython.notebook.set_autosave_interval(0);
	// });

	// Export the required load_ipython_extention
	return {
		load_ipython_extension: load_ipython_extension
	};
});