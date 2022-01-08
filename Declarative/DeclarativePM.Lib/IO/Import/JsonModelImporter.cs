using System.IO;
using System.Threading.Tasks;
using DeclarativePM.Lib.IO.IOInterfaces;
using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Utils;
using Newtonsoft.Json;

namespace DeclarativePM.Lib.IO.Import
{
    public class JsonModelImporter : IModelImporter
    {
        /// <summary>
        ///     Imports a Declare model from json file specified by path
        /// </summary>
        /// <param name="path">Path to the file</param>
        /// <returns>Declare model</returns>
        public DeclareModel LoadModel(string path)
        {
            if (!File.Exists(path))
                return null;

            var stream = File.OpenRead(path);
            using var jsonReader = new StreamReader(stream);
            var json = jsonReader.ReadToEnd();

            var result = LoadModelFromString(json);

            stream.Dispose();
            return result;
        }

        /// <summary>
        ///     Imports a Declare model from json file stream
        /// </summary>
        /// <param name="stream">Json file stream</param>
        /// <returns>Declare model</returns>
        public async Task<DeclareModel> LoadModelAsync(Stream stream)
        {
            using var jsonReader = new StreamReader(stream);

            var json = await jsonReader.ReadToEndAsync();

            return await LoadModelFromStringAsync(json);
        }

        /// <summary>
        ///     Imports a Declare model from json file stream
        /// </summary>
        /// <param name="stream">Json file stream</param>
        /// <returns>Declare model</returns>
        public DeclareModel LoadModel(Stream stream)
        {
            using var jsonReader = new StreamReader(stream);

            var json = jsonReader.ReadToEnd();

            return LoadModelFromString(json);
        }

        /// <summary>
        ///     Imports a Declare model from json file specified by path
        /// </summary>
        /// <param name="path">Path to the file</param>
        /// <returns>Declare model</returns>
        public async Task<DeclareModel> LoadModelAsync(string path)
        {
            if (!File.Exists(path))
                return null;

            var stream = File.OpenRead(path);
            using var jsonReader = new StreamReader(stream);
            var json = await jsonReader.ReadToEndAsync();

            var result = await LoadModelFromStringAsync(json);

            await stream.DisposeAsync();
            return result;
        }

        /// <summary>
        ///     Imports a Declare model from json string
        /// </summary>
        /// <param name="json">string containing json</param>
        /// <returns>Declare model</returns>
        public DeclareModel LoadModelFromString(string json)
        {
            var result = JsonConvert.DeserializeObject<DeclareModel>(json,
                new ParametrizedTemplateConverter());

            //simple checks whether model is ok
            if (result is null)
                return null;
            foreach (var pt in result.Constraints)
            foreach (var t in pt.TemplateInstances)
                //corrupted template, wrong type in the list
                if (t.GetType().GetPossibleTemplateType() != pt.TemplateDescription.TemplateType)
                    pt.TemplateInstances.Remove(t);
            return result;
        }

        /// <summary>
        ///     Imports a Declare model from json string
        /// </summary>
        /// <param name="json">string containing json</param>
        /// <returns>Declare model</returns>
        public async Task<DeclareModel> LoadModelFromStringAsync(string json)
        {
            return await Task.Run(() => LoadModelFromString(json));
        }
    }
}