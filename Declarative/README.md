# DeclarativePM

## How to run
To run this application, you need .NET 5
.Net runtime of version 5 or higher and SDK of version 5 or higher

In IDE, you need to choose how to run the application. The application can be run in multiple regimes. It can run either as a web application or a desktop application using Electron.

For successful running of *Desktop* application on Electron, you need to have installed Node.js, ElectronCLI tools and have locally configured electron manifest.
Tools can be added using `dotnet new tool-manifest` command. After this, you can generate an electron manifest using `dotnet run electronize init` command.
After successfully generating manifest, you should be able to run the electron app using `dotnet run electronize start`. For a more detailed manual you can refer to https://blog.jetbrains.com/dotnet/2020/11/05/run-blazor-apps-within-electron-shell/

For running an application in the browser, you only need to open the solution in Rider or Visual studio, and in run configurations, choose DeclarativePM.UI, or alternatively, IIS express on win.
![image](https://user-images.githubusercontent.com/61428443/146265076-c651d0c0-5013-46a1-9aa9-16256a8df24e.png)

Both versions, Electron and web, are the same. Electron only wraps the application and allows it to run as a desktop application. For more information about Electron, you can visit https://www.electronjs.org/





## User Interface

### Examples
Example log can be found in sampleData directory under name `webstore.csv`
Example fitting declare model can be found in sampleData directory under name `webstore.json`
Example non-fitting declare model can be found in sampleData directory under name `webstore_bad.json`

### Import / Export
You can import or export models on `Import/Export` tab. To save imported Log do not forget to click Save

### Discovery
You can discover declare models from the Log on `Discover` tab. In order to discover, you have to have at least one Log imported. 
Later it is necessary to choose templates that you want to discover. In the next step you can configure templates further.
The last step is discovery, you can check discovered model and save it, or go back and edit settings for discovery.

### Create / edit
On the tab `Create model`, you can either create a completely new declare model from scratch by choosing `Create declare model`, a new declare model using activities from some log choosing `create declare model from log`, or edit already existing model by choosing `edit existing model`

### Conformance
On tab `Conformance`, you can check the conformance of a trace with respect to some declare model. You need to have at least one declare model already imported or created.

On the right side of screen, you can see the currently chosen declare model. In the right upper corner, choose `Add/change model` to add a model for conformance or change chosen for a new one. 

On the left, you can observe and choose traces for conformance checking or remove them. You can click `Add trace` in the left upper corner to add a new trace, which you need for conformance. You can choose from 2 options. You can use a trace from an already existing log, or you can create a completely new trace. If you choose to create a new trace, you can click `See activities` in the left upper corner to add new activities, which you can use to create new traces. Click again on `See traces` to see traces again.

The middle part of the screen server for interaction. You can click `See trace` to see the currently chosen trace and to remove events from it.

Once you chosen trace on the left by clicking on it, and you have already chosen declare model, you can click `Evaluate` to evaluate the trace.
You will see different statistics, or you can choose from different templates and their instances and see where they have been activated, violated or conflicted in the trace.

Purple - activation

Yellow - conflict

Red - violation

## Library

You can check project DiscoveryPM/DiscoveryPM.DEMO for simple usage examples
================================


`Discovery.cs` is used for the discovery of DeclareModels.

`ActivationBinaryTree.cs` for conformance checking
`ActivationTreeBuilder.cs` to build ActivationBinaryTree from the trace and constraint

`ConformanceEvaluator.cs` is a class for evaluating and doing conformance checking on traces. This class heavily uses class `ActivationBinaryTree`.
`ConstraintEvaluator.cs` is class for evaluating constraints and LTL checking.

`UtilMethods.cs` are helper methods.

### Conformance models
`Healthiness.cs` is storing health indicators described in thesis
`TraceEvaluation.cs`, `TemplateEvaluation.cs`, and `ConstraintEvaluation.cs` store evaluated data for after conformance checking

`WrapedEventActivation.cs` maps Event to its activation type, usually used to map activation with respect to a constraint after conformance checking.


#Declare Templates

`ITemplate.cs` main interface for each template
`IVacuityDetection.cs` for templates could be checked with vacuity condition

`ExistenceTemplate.cs`, UniTemplate.cs and BiTemplate are abstract classes for different categories of templates

`BiTemplateFactory.cs`, `UniTemplateFactory.cs` and `ExistenceFactory.cs` are factories for creation of template instances. Mainly generation of candidates.

The rest are classes for specific templates implementing abstract classes and interfaces defined above.

### LtlExpression

`LtlExpression.cs` is a recursive class representing expressions from linear temporal logic. For now they can be either:
  - atomic, consisting of None operator and Atom as an atomic expression 
  - unary, consisting of the unary operator and one subexpression on the left
  - binary, consisting of the binary operator and two subexpressions on the left and right

### Parametrized template

The parametrized template is wrapping template, its parameters, Template description, types and list of template instances - constraints.

### Template Description

`TemplateDescription.cs` holds information about templates, such as their readable name, the description which can be printed, types, categories, etc.

### IO

For import, you can use the class `CsvLogImporter.cs` to load csv logs from the stream or local file path.

For import of DECLARE models, you can use class `JsonModeImporter.cs` which can load and deserialize Declare models from strings or files.

For export, you can use class `JsonModelExporter.cs` which can serialize and export declare models either into string, or save directly into a provided directory.


