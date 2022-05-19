using Azure.Data.Tables;

namespace Cryptosouvenirs.Services;

public class TableStorageService : ITableStorageService
{
    private readonly IConfiguration _configuration;

    public TableStorageService(IConfiguration configuration) => _configuration = configuration;

    public async Task<List<TEntity>> GetAllEntitiesAsync<TEntity>(string tableName)
        where TEntity : class, ITableEntity, new()
    {
        var tableClient = await GetTableClientAsync(tableName);
        var allEntity = new List<TEntity>();
        await foreach (var page in tableClient.QueryAsync<TEntity>().AsPages())
        {
            allEntity.AddRange(page.Values);
        }

        return allEntity;
    }

    public async Task<TEntity> GetEntityAsync<TEntity>(string tableName, string partitionKey, string rowKey)
        where TEntity : class, ITableEntity, new()
    {
        var tableClient = await GetTableClientAsync(tableName);
        return await tableClient.GetEntityAsync<TEntity>(partitionKey, rowKey);
    }

    public async Task<TEntity> UpsertEntityAsync<TEntity>(string tableName, TEntity entity)
        where TEntity : ITableEntity
    {
        var tableClient = await GetTableClientAsync(tableName);
        await tableClient.UpsertEntityAsync(entity);
        return entity;
    }

    public async Task DeleteEntityAsync(string tableName, string partitionKey, string rowKey)
    {
        var tableClient = await GetTableClientAsync(tableName);
        await tableClient.DeleteEntityAsync(partitionKey, rowKey);
    }

    private async Task<TableClient> GetTableClientAsync(string tableName)
    {
        var serviceClient = new TableServiceClient(_configuration["StorageConnectionString"]);
        var tableClient = serviceClient.GetTableClient(tableName);
        await tableClient.CreateIfNotExistsAsync();
        return tableClient;
    }
}
