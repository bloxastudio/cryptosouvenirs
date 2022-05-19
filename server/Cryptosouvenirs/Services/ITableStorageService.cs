using Azure.Data.Tables;

namespace Cryptosouvenirs.Services;

public interface ITableStorageService
{
    Task<List<TEntity>> GetAllEntitiesAsync<TEntity>(string tableName)
        where TEntity : class, ITableEntity, new();

    Task<TEntity> GetEntityAsync<TEntity>(string tableName, string partitionKey, string rowKey)
        where TEntity : class, ITableEntity, new();

    Task<TEntity> UpsertEntityAsync<TEntity>(string tableName, TEntity entity)
        where TEntity : ITableEntity;

    Task DeleteEntityAsync(string tableName, string partitionKey, string rowKey);
}
