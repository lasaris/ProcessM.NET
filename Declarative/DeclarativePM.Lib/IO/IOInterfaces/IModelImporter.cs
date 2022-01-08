using System.IO;
using System.Threading.Tasks;
using DeclarativePM.Lib.Models.DeclareModels;

namespace DeclarativePM.Lib.IO.IOInterfaces
{
    public interface IModelImporter
    {
        /// <summary>
        ///     Imports a Declare model from file specified by path
        /// </summary>
        /// <param name="path">Path to the file</param>
        /// <returns>Declare model</returns>
        DeclareModel LoadModel(string path);

        /// <summary>
        ///     Imports a Declare model from file stream
        /// </summary>
        /// <param name="stream">Json file stream</param>
        /// <returns>Declare model</returns>
        DeclareModel LoadModel(Stream stream);

        /// <summary>
        ///     Imports a Declare model from file stream
        /// </summary>
        /// <param name="stream">Json file stream</param>
        /// <returns>Declare model</returns>
        Task<DeclareModel> LoadModelAsync(Stream stream);
    }
}