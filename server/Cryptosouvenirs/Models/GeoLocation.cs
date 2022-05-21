namespace Cryptosouvenirs.Models;

public class GeoLocation
{
    public double Latitude { get; set; }
    public double Longitude { get; set; }

    public GeoLocation(double latitude, double longitude)
    {
        Latitude = latitude;
        Longitude = longitude;
    }

    /// <summary>
    /// Gives back distance in meters.
    /// </summary>
    public double CalculateDistance(double latitude, double longitude)
    {
        var d1 = Latitude * (Math.PI / 180.0);
        var num1 = Longitude * (Math.PI / 180.0);
        var d2 = latitude * (Math.PI / 180.0);
        var num2 = (longitude * (Math.PI / 180.0)) - num1;
        var d3 = Math.Pow(Math.Sin((d2 - d1) / 2.0), 2.0) +
                 (Math.Cos(d1) * Math.Cos(d2) * Math.Pow(Math.Sin(num2 / 2.0), 2.0));
        return 6_376_500.0 * (2.0 * Math.Atan2(Math.Sqrt(d3), Math.Sqrt(1.0 - d3)));
    }
}
