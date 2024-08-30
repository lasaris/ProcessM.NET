var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
          {
              options.AddPolicy("CorsPolicy",
                  b => b
                      .AllowAnyMethod()
                      .AllowCredentials()
                      .SetIsOriginAllowed((host) => true)
                      .AllowAnyHeader());
          });

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();