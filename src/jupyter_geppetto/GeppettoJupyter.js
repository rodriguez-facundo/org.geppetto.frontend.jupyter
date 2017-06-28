define('jupyter_geppetto', function () {

    var jupyter_geppettoModelSync = window.parent.GEPPETTO.GeppettoJupyterModelSync;
    var jupyter_geppettoGUISync = window.parent.GEPPETTO.GeppettoJupyterGUISync;
    var jupyter_geppettoWidgetSync = window.parent.GEPPETTO.GeppettoJupyterWidgetSync;
    var jupyter_geppettoWidgetManager = window.parent.GEPPETTO.GeppettoWidgetManager;

    return {
        PanelSync: jupyter_geppettoGUISync.PanelSync,
        TextFieldSync: jupyter_geppettoGUISync.TextFieldSync,
        CheckboxSync: jupyter_geppettoGUISync.CheckboxSync,
        ButtonSync: jupyter_geppettoGUISync.ButtonSync,
        LabelSync: jupyter_geppettoGUISync.LabelSync,
        DropDownSync: jupyter_geppettoGUISync.DropDownSync,

        StateVariableSync: jupyter_geppettoModelSync.StateVariableSync,
        DerivedStateVariableSync: jupyter_geppettoModelSync.DerivedStateVariableSync,
        ModelSync: jupyter_geppettoModelSync.ModelSync,
        ExperimentSync: jupyter_geppettoModelSync.ExperimentSync,
        ProjectSync: jupyter_geppettoModelSync.ProjectSync,
        EventsSync: jupyter_geppettoModelSync.EventsSync,

        WidgetSync: jupyter_geppettoWidgetSync.WidgetSync,
        PlotWidgetSync: jupyter_geppettoWidgetSync.PlotWidgetSync,
        PopupWidgetSync: jupyter_geppettoWidgetSync.PopupWidgetSync,

        WidgetManagerSync: jupyter_geppettoWidgetManager
    };
});