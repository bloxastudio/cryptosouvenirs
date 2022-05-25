using System.ComponentModel.DataAnnotations;

namespace Cryptosouvenirs.Models;

public class AvailableNftApiModel
{
    [Required]
    public string WalletId { get; set; }

    [Required]
    public double Latitude { get; set; }

    [Required]
    public double Longitude { get; set; }

    [Required]
    public string SignedLocation { get; set; }
}
