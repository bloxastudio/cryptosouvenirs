namespace Cryptosouvenirs.Models;

public class GeoLocationOptions
{
    public int MaximumDistanceInMeters { get; set; } = 1500;
    public int MaxMinutesElapsed { get; set; } = 10;
}
