using Azure;
using Azure.Data.Tables;
using System.Linq.Expressions;

namespace Cryptosouvenirs.Services;

public class TableStorageService : ITableStorageService
{
    private readonly IConfiguration _configuration;

    public TableStorageService(IConfiguration configuration) => _configuration = configuration;

    public async Task<IList<TEntity>> GetAllEntitiesAsync<TEntity>(string tableName)
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

    public async Task<AsyncPageable<TEntity>> RunQueryAsync<TEntity>(
        Expression<Func<TEntity, bool>> filter,
        string tableName)
        where TEntity : class, ITableEntity, new()
    {
        var tableClient = await GetTableClientAsync(tableName);
        return tableClient.QueryAsync(filter);
    }

    private async Task<TableClient> GetTableClientAsync(string tableName)
    {
        var serviceClient = new TableServiceClient(_configuration["ConnectionStrings:StorageConnectionString"]);
        var tableClient = serviceClient.GetTableClient(tableName);
        await tableClient.CreateIfNotExistsAsync();
        return tableClient;
    }
}

public static class AsyncPageableExtension
{
    public static async Task<TEntity> FirstOrDefaultAsync<TEntity>(this AsyncPageable<TEntity> entities)
    {
        await foreach (var item in entities)
        {
            // It is returned deliberately
#pragma warning disable S1751 // Loops with at most one iteration should be refactored
            return item;
#pragma warning restore S1751 // Loops with at most one iteration should be refactored
        }

        return default;
    }

    public static async Task<TEntity> FirstOrDefaultAsync<TEntity>(
        this AsyncPageable<TEntity> entities,
        Func<TEntity, bool> predicate)
    {
        // AsyncPageable<TEntity>' does not contain a definition for 'Where'.
#pragma warning disable S3267 // Loops should be simplified with "LINQ" expressions
        await foreach (var item in entities)
        {
            if (predicate(item))
            {
                return item;
            }
        }
#pragma warning restore S3267 // Loops should be simplified with "LINQ" expressions

        return default;
    }
}
