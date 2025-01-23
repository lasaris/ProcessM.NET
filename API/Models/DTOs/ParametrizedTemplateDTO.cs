using DeclarativePM.Lib.Enums;

namespace API.Models;

public class ParametrizedTemplateDTO
{
    public string Template { get; set; }
    public decimal Poe { get; set; }
    public decimal Poi { get; set; }
    public bool CheckVacuously { get; set; }
}