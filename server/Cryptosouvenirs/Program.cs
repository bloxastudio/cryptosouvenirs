using Cryptosouvenirs.Constants;
using Cryptosouvenirs.Models;
using Cryptosouvenirs.Services;

var builder = WebApplication.CreateBuilder(args);

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
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

await app.RunAsync();