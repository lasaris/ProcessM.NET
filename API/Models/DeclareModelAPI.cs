using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Models.LogModels;

namespace API.Models;

public class DeclareModelAPI
{
    public string Name { get; set; }
    public List<ConstraintAPI> Constraints { get; set; }
    public EventLog Log { get; set; }

    public DeclareModel ConvertToDeclareModel()
    {
        var parametrizedTemplates = Constraints.Select(c => c.ConvertToParametrizedTemplate()).ToList();

        return new DeclareModel(Name, parametrizedTemplates, Log);
    }
}