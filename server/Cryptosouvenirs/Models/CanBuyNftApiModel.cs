using System.ComponentModel.DataAnnotations;

namespace Cryptosouvenirs.Models;

public class CanBuyNftApiModel
{
    [Required]
    public string WalletId { get; set; }

    [Required]
    public string NftId { get; set; }
}
