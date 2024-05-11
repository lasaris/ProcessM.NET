using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Models.ConformanceModels;
using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Models.LogModels;
using DeclarativePM.UI.Data;
using DeclarativePM.UI.Enums;
using DeclarativePM.UI.Utils;
using MatBlazor;
using Microsoft.AspNetCore.Components;

namespace DeclarativePM.UI.Pages
{
    public partial class Conformance : ComponentBase
    {
        private ConstraintEvaluation _constraintEvaluation;
        private DeclareModel _declareModel;
        private EventLog _selectedLog;
        private List<TraceDTO> _selectedTraces = new();
        private TemplateEvaluation _templateEvaluation;
        private TraceEvaluation _traceEvaluation;
        public List<string> activities = new();
        public Event CurrentTraceEvent;
        public bool seeActivities;
        private readonly MatChip selectedChip;
        public TraceDTO SelectedTrace;
        private bool showResults;
        public List<TraceDTO> Traces = new();
        public TreeNodeModel TreeNodeModel;
        public ConformancePageView View = ConformancePageView.Conformance;

        public async Task AddCases()
        {
            var result = await MatDialogService.AskAsync("Would you like to:",
                new[] { "Create new trace", "Import traces from log", "Close" });
            if (result == "Close") return;

            if (result == "Create new trace")
            {
                SelectedTrace = new TraceDTO(new List<Event>());
                SelectedTrace.Case = string.Empty;
                CurrentTraceEvent = new Event(activities?.FirstOrDefault(), SelectedTrace.Case);
                seeActivities = true;
                View = ConformancePageView.CreateTrace;
            }
            else if (result == "Import traces from log")
            {
                View = ConformancePageView.SelectLog;
            }

            await InvokeAsync(StateHasChanged);
        }

        public async Task ShowCase()
        {
            if (View == ConformancePageView.SelectedTrace)
            {
                View = ConformancePageView.Conformance;
                await InvokeAsync(StateHasChanged);
                return;
            }

            if (SelectedTrace is null)
            {
                await MatDialogService.AlertAsync("You have not selected any trace!");
                return;
            }

            View = ConformancePageView.SelectedTrace;
            await InvokeAsync(StateHasChanged);
        }

        public async Task ChangeModel()
        {
            showResults = false;
            View = ConformancePageView.SelectModel;
            await InvokeAsync(StateHasChanged);
        }

        public async Task ChooseTrace(TraceDTO trace)
        {
            showResults = false;
            SelectedTrace = trace;
            _traceEvaluation = null;
            _templateEvaluation = null;
            _constraintEvaluation = null;
            await InvokeAsync(StateHasChanged);
        }

        public string GetExpansionBackground(TraceDTO trace)
        {
            return trace is null || !trace.Equals(SelectedTrace) ? "background: #f3f3f3" : "background: #ffd5ff";
        }

        public async Task OnModelSelected()
        {
            View = ConformancePageView.Conformance;
            if (_declareModel is not null)
            {
                activities.AddRange(_declareModel.GetAllActivities());
                activities = activities.Distinct().ToList();
                Utilities.CreateTreeNode(out TreeNodeModel, _declareModel.Constraints);
            }

            await InvokeAsync(StateHasChanged);
        }

        public async Task OnLogSelected()
        {
            View = ConformancePageView.SelectTraces;
            await InvokeAsync(StateHasChanged);
        }

        public async Task OnTracesSelected()
        {
            View = ConformancePageView.Conformance;
            foreach (var trace in _selectedTraces)
                if (!Traces.Contains(trace))
                    Traces.Add(trace);

            _selectedTraces = new List<TraceDTO>();
            await InvokeAsync(StateHasChanged);
        }

        public List<TraceDTO> GetLogTraceDtos()
        {
            return _selectedLog?.GetAllTraces().Select(x => new TraceDTO(x)).ToList();
        }

        public async Task RemoveTrace(TraceDTO trace)
        {
            if (Traces.Contains(trace))
                Traces.Remove(trace);
            await InvokeAsync(StateHasChanged);
        }

        public void RemoveEventFromSelectedTrace(Event e)
        {
            if (e is not null && SelectedTrace.Events.Contains(e))
                SelectedTrace.Events.Remove(e);

            StateHasChanged();
        }

        public void SelectionChangedEvent(object e)
        {
            if (e is null)
                CurrentTraceEvent = new Event(activities?.FirstOrDefault() ?? "", SelectedTrace.Case);
            else
                CurrentTraceEvent = (Event)e;
            StateHasChanged();
        }

        public async Task AddEvent()
        {
            CurrentTraceEvent.CaseId = SelectedTrace.Case;
            SelectedTrace.Events.Add(CurrentTraceEvent);

            CurrentTraceEvent = new Event(activities?.FirstOrDefault() ?? "", SelectedTrace.Case);

            await InvokeAsync(StateHasChanged);
        }

        public void CaseChanged(string s)
        {
            SelectedTrace.Case = s;

            //change this case in each event
            foreach (var e in SelectedTrace.Events) e.CaseId = s;

            StateHasChanged();
        }

        public async Task SaveTrace()
        {
            View = ConformancePageView.Conformance;
            if (!Traces.Contains(SelectedTrace))
                Traces.Add(SelectedTrace);

            await InvokeAsync(StateHasChanged);
        }

        public void SeeActivities()
        {
            seeActivities = !seeActivities;
            StateHasChanged();
        }

        public async Task AddActivity()
        {
            var result = (await MatDialogService.PromptAsync("Name of activity: "))?.Trim();
            if (result is null || result == string.Empty)
                return;
            if (activities.Contains(result))
            {
                await MatDialogService.AlertAsync("Activity is already in the list");
                return;
            }

            activities.Add(result);
            await InvokeAsync(StateHasChanged);
        }

        public async Task RemoveActivity(string activity)
        {
            if (activities.Contains(activity))
                activities.Remove(activity);
            await InvokeAsync(StateHasChanged);
        }

        public async Task EvaluateWhole()
        {
            _traceEvaluation = Evaluator.EvaluateTrace(_declareModel, SelectedTrace.Events);
            //show only not empty evaluations
            var temp = _traceEvaluation.TemplateEvaluations.Where(t => t.ConstraintEvaluations.Count > 0).ToList();
            _traceEvaluation.TemplateEvaluations.Clear();
            _traceEvaluation.TemplateEvaluations.AddRange(temp);
            showResults = true;
            _templateEvaluation = _traceEvaluation.TemplateEvaluations.FirstOrDefault();
            if (_templateEvaluation is null)
                await MatDialogService.AlertAsync("DECLARE model is empty");
            await InvokeAsync(StateHasChanged);
        }

        public string GetConformanceChipBackground(Event e)
        {
            var type = _constraintEvaluation.Activations.Find(w => w.Event == e);

            return type?.Activation switch
            {
                EventActivationType.None => "background: #d9d9d9",
                EventActivationType.Fulfilment => "background: #ff66ff",
                EventActivationType.Conflict => "background: #ffff00",
                EventActivationType.Violation => "background: #ff0000",
                _ => "background: #d9d9d9"
            };
        }

        public void ConstraintEvaluationChanged(ConstraintEvaluation o)
        {
            _constraintEvaluation = o;
            StateHasChanged();
        }

        public void TemplateEvaluationChanged(TemplateEvaluation o)
        {
            _templateEvaluation = o;
            StateHasChanged();

            if (_templateEvaluation.ConstraintEvaluations.Count == 1)
                //unfortunately bug in matblazor, have to insert none until fixed: https://github.com/SamProf/MatBlazor/issues/651
                _templateEvaluation.ConstraintEvaluations.Add(null);
            //_constraintEvaluation = _templateEvaluation.ConstraintEvaluations.First();

            StateHasChanged();
        }
    }
}