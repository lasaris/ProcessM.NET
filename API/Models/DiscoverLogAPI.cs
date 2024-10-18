namespace API.Models;

public class DiscoverLogAPI
{
    public ImportedEventLogAPI ImportedEventLog { get; set; }
    public List<ParametrizedTemplateAPI> ParametrizedTemplates { get; set; }
}