using Cryptosouvenirs.Constants;
using Cryptosouvenirs.Models;
using Cryptosouvenirs.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Cryptosouvenirs.Controllers;

[Route("api/available-nfts")]
[ApiController]
public class AvailableNftsApiController : ControllerBase
{
    private readonly ITableStorageService _tableStorageService;
    private readonly GeoLocationOptions _geoLocationOptions;

    public AvailableNftsApiController(
        ITableStorageService tableStorageService,
        IOptionsSnapshot<GeoLocationOptions> geoLocationOptions)
    {
        _tableStorageService = tableStorageService;
        _geoLocationOptions = geoLocationOptions.Value;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] NftApiModel model)
    {
        if (string.IsNullOrEmpty(model.WalletId)) return BadRequest($"{nameof(model.WalletId)} is required.");

        var user = new UserEntity(Tables.User, model.WalletId)
        {
            Latitude = model.Latitude,
            Longitude = model.Longitude,
        };

        var insertedUser = await _tableStorageService.UpsertEntityAsync(Tables.User, user);
        var userLocation = new GeoLocation(insertedUser.Latitude, insertedUser.Longitude);

        var allnfts = await _tableStorageService.GetAllEntitiesAsync<NftEntity>(Tables.Nft);

        var filteredNfts = allnfts
            .Where(nft =>
                userLocation.CalculateDistance(nft.Latitude, nft.Longitude) <= _geoLocationOptions.MaximumDistanceInMeters)
            .ToList();

        return Ok(filteredNfts);
    }
}
