namespace Cryptosouvenirs.Models;

public class AvailableNftApiModel
{
    public string WalletId { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}

public class CanBuyNftApiModel
{
    public string WalletId { get; set; }
    public string NftId { get; set; }
}
