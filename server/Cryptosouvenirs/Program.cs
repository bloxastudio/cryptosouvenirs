using Cryptosouvenirs.Constants;
using Cryptosouvenirs.Models;
using Cryptosouvenirs.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
        });

});

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ITableStorageService, TableStorageService>();

builder.Services.Configure<GeoLocationOptions>(
    builder.Configuration.GetSection("Geolocation"));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    using var scope = app.Services.CreateScope();
    var tableStorageService = scope.ServiceProvider.GetService<ITableStorageService>();
    await tableStorageService.UpsertEntityAsync(
        Tables.Nft,
        new NftEntity(Tables.Nft, "1") { Latitude = 47.497913, Longitude = 19.040236 });
    await tableStorageService.UpsertEntityAsync(
        Tables.Nft,
        new NftEntity(Tables.Nft, "2") { Latitude = 40.730610, Longitude = -73.935242 });
    await tableStorageService.UpsertEntityAsync(
        Tables.Nft,
        new NftEntity(Tables.Nft, "3") { Latitude = 35.652832, Longitude = 139.839478 });

    // Add CORS to endpoints
    app.UseCors();
}

//app.UseHttpsRedirection();

app.MapControllers();

await app.RunAsync();
