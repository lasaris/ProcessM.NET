using System;
using System.IO;
using System.Threading.Tasks;
using DeclarativePM.Lib.IO.IOInterfaces;
using DeclarativePM.Lib.Models.DeclareModels;
using Newtonsoft.Json;

namespace DeclarativePM.Lib.IO.Export
{
    /// <summary>
    ///     Class responsible for export of models
    /// </summary>
    public class JsonModelExporter : IModelExporter
    {
        /// <summary>
        ///     Exports Declare model into json string
        /// </summary>
        /// <param name="model">Declare model</param>
        /// <returns>json string</returns>
        public string ExportModel(DeclareModel model)
        {
            return JsonConvert.SerializeObject(model, new ParametrizedTemplateConverter());
        }

        /// <summary>
        ///     Exports Declare model into json string
        /// </summary>
        /// <param name="model">Declare model</param>
        /// <returns>json string</returns>
        public async Task<string> ExportModelAsync(DeclareModel model)
        {
            return await Task.Run(() =>
                JsonConvert.SerializeObject(model, new ParametrizedTemplateConverter()));
        }

        /// <summary>
        ///     Exports and saves declare model into file as json
        /// </summary>
        /// <param name="model">Declare model</param>
        /// <param name="path">Path to the folder where to export</param>
        /// <param name="fileName">Name of the saved file</param>
        /// <returns></returns>
        /// <exception cref="Exception">File already exists in the folder</exception>
        public async Task ExportSaveModelAsync(DeclareModel model, string path, string fileName)
        {
            fileName ??= model.Name;
            if (File.Exists(Path.Combine(path + ".json", fileName)) || !Directory.Exists(path))
                throw new Exception("Path does not exist or file with given name already exists");

            var json = JsonConvert.SerializeObject(model, new ParametrizedTemplateConverter());
            await File.WriteAllTextAsync(Path.Combine(path, fileName + ".json"), json);
        }
    }
}