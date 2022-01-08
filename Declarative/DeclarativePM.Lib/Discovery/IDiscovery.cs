using System.Collections.Generic;
using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Models.LogModels;

namespace DeclarativePM.Lib.Discovery
{
    public interface IDiscovery
    {
        DeclareModel DiscoverModel(EventLog log, List<ParametrizedTemplate> templates);

        DeclareModel DiscoverModel(EventLog log);
    }
}