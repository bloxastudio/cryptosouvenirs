using Azure;
using Azure.Data.Tables;

namespace Cryptosouvenirs.Models;

public class NftEntity : ITableEntity
{
    public string PartitionKey { get; set; }
    public string RowKey { get; set; }
    public DateTimeOffset? Timestamp { get; set; }
    public ETag ETag { get; set; }
    public float Longitude { get; set; }
    public float Latitude { get; set; }

    public NftEntity(string partitionKey, string rowKey)
    {
        PartitionKey = partitionKey;
        RowKey = rowKey;
    }

    public NftEntity()
    {
    }
}
