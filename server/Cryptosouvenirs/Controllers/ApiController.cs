using Azure;
using Cryptosouvenirs.Constants;
using Cryptosouvenirs.Models;
using Cryptosouvenirs.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Nethereum.Signer;
using System.Globalization;
using Nethereum.Util;

namespace Cryptosouvenirs.Controllers;

[Route("api")]
[ApiController]
public class ApiController : ControllerBase
{
    private readonly ITableStorageService _tableStorageService;
    private readonly GeoLocationOptions _geoLocationOptions;

    public ApiController(
        ITableStorageService tableStorageService,
        IOptionsSnapshot<GeoLocationOptions> geoLocationOptions)
    {
        _tableStorageService = tableStorageService;
        _geoLocationOptions = geoLocationOptions.Value;
    }

    [HttpPost("available-nfts")]
    public async Task<IActionResult> AvailableNfts([FromBody] AvailableNftApiModel model)
    {
        var text = $"{model.Latitude.ToString(CultureInfo.InvariantCulture)},{model.Longitude.ToString(CultureInfo.InvariantCulture)}";
        var signer = new EthereumMessageSigner();
        var account = signer.HashAndEcRecover(text, model.SignedLocation);

        if (!account.IsTheSameAddress(model.WalletId)) return BadRequest();

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

    [HttpPost("can-buy-nft")]
    public async Task<IActionResult> CanBuyNft([FromBody] CanBuyNftApiModel model)
    {
        var user = await (await _tableStorageService
            .RunQueryAsync<UserEntity>(user => user.RowKey == model.WalletId, Tables.User))
            .FirstOrDefaultAsync(user => user.Timestamp.Value.AddMinutes(10) >= DateTime.UtcNow);

        if (user == null) return BadRequest();

        NftEntity nft;
        try
        {
            nft = await _tableStorageService.GetEntityAsync<NftEntity>(Tables.Nft, Tables.Nft, model.NftId);
        }
        catch (RequestFailedException)
        {
            return BadRequest();
        }

        var userLocation = new GeoLocation(user.Latitude, user.Longitude);
        return userLocation.CalculateDistance(nft.Latitude, nft.Longitude) <= _geoLocationOptions.MaximumDistanceInMeters
            ? Ok()
            : BadRequest();
    }
}
