namespace API.Models;

public class DiscoverLogDTO
{
    public ImportedEventLogDTO ImportedEventLog { get; set; }
    public List<ParametrizedTemplateDTO> ParametrizedTemplates { get; set; }
}