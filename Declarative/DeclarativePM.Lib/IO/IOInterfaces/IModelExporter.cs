using DeclarativePM.Lib.Models.DeclareModels;

namespace DeclarativePM.Lib.IO.IOInterfaces
{
    /// <summary>
    ///     Default interface for DECLARE model exporters
    /// </summary>
    public interface IModelExporter
    {
        /// <summary>
        ///     Exports Declare model into string
        /// </summary>
        /// <param name="model"></param>
        /// <returns>Serialized string</returns>
        string ExportModel(DeclareModel model);
    }
}