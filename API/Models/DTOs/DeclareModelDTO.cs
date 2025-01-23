using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Models.LogModels;

namespace API.Models;

public class DeclareModelDTO
{
    public string Name { get; set; }
    public List<ConstraintDTO> Constraints { get; set; }
    public EventLog Log { get; set; }

    public DeclareModel ConvertToDeclareModel()
    {
        var parametrizedTemplates = Constraints.Select(c => c.ConvertToParametrizedTemplate()).ToList();

        return new DeclareModel(Name, parametrizedTemplates, Log);
    }
}