using System;
using System.Diagnostics.CodeAnalysis;
using System.Net.Http;
using System.Reflection;
using System.Threading.Tasks;
using BakaMining.Services.Storage;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using MudBlazor.Services;
using TG.Blazor.IndexedDB;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.JSInterop;
using ProcessM.NET.Model;
using ProcessM.NET.Model.BasicPetriNet;

namespace BakaMining
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("#app");

            builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
            builder.Services.AddMudServices();
            builder.Services.AddBlazorDownloadFile();
            builder.Services.AddIndexedDB(dbStore =>
            {
                dbStore.DbName = "BakaMiningStorage";
                dbStore.Version = 1;

                dbStore.Stores.Add(new StoreSchema
                {
                    Name = Enums.Storename.EventLogFile,
                    PrimaryKey = new IndexSpec { Name = "key", KeyPath = "key", Auto = false },

                });
                dbStore.Stores.Add(new StoreSchema
                {
                    Name = Enums.Storename.PetriNetFile,
                    PrimaryKey = new IndexSpec { Name = "filename", KeyPath = "metadata.name", Auto = false },
                });
            });
            builder.Services.AddScoped<EventLogStore>();
            builder.Services.AddScoped<PetriNetStore>();

            var host = builder.Build();
            ConfigureProviders(host.Services);
            await host.RunAsync();
        }

        // Messy {workaround}
        // To deserialize JSON object from Interfaces in JSInterop globally.
        // https://github.com/dotnet/aspnetcore/issues/12685
        public static void ConfigureProviders(IServiceProvider services)
        {
            var jsRuntime = services.GetService<IJSRuntime>();
            var prop = typeof(JSRuntime).GetProperty("JsonSerializerOptions",
                BindingFlags.NonPublic | BindingFlags.Instance);
            JsonSerializerOptions options = (JsonSerializerOptions)Convert.ChangeType(
                prop.GetValue(jsRuntime, null), typeof(JsonSerializerOptions));
            options.Converters.Add(new AbstractConverter<IPlace, Place>());
            options.Converters.Add(new AbstractConverter<ITransition, Transition>());
        }
    }

    public class AbstractConverter<TInterface, TImplementation>
        : JsonConverter<TInterface> where TImplementation : TInterface
    {
        [return: MaybeNull]
        public override TInterface Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
            => JsonSerializer.Deserialize<TImplementation>(ref reader, options);
        public override void Write(Utf8JsonWriter writer, TInterface value, JsonSerializerOptions options)
            => JsonSerializer.Serialize(writer, (TImplementation)value!, options);
    }
}
