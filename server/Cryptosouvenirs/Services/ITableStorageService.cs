using Azure;
using Azure.Data.Tables;

namespace Cryptosouvenirs.Services;

/// <summary>
/// Service for Azure Table Storage related operations.
/// </summary>
public interface ITableStorageService
{
    /// <summary>
    /// Returns all <typeparamref name="TEntity"/> from <paramref name="tableName"/> table in a <see
    /// cref="IList{TEntity}"/>.
    /// </summary>
    /// <typeparam name="TEntity">A custom model type that implements <see cref="ITableEntity" />.</typeparam>
    Task<IList<TEntity>> GetAllEntitiesAsync<TEntity>(string tableName)
        where TEntity : class, ITableEntity, new();

    /// <summary>
    /// Returns the <typeparamref name="TEntity"/> model from <paramref name="tableName"/> table with the given
    /// <paramref name="partitionKey"/> and <paramref name="rowKey"/>
    /// </summary>
    /// <typeparam name="TEntity">A custom model type that implements <see cref="ITableEntity" />.</typeparam>
    /// <param name="partitionKey">Currently it should be the same as the <paramref name="tableName"/>.</param>
    /// <param name="rowKey">Id of the <typeparamref name="TEntity"/> model.</param>
    Task<TEntity> GetEntityAsync<TEntity>(string tableName, string partitionKey, string rowKey)
        where TEntity : class, ITableEntity, new();

    /// <summary>
    /// Replaces the specified table entity of type <typeparamref name="TEntity"/>, if it exists. Creates the entity if
    /// it does not exist.
    /// </summary>
    /// <typeparam name="TEntity">A custom model type that implements <see cref="ITableEntity" />.</typeparam>
    /// <param name="tableName">The table name to upsert to.</param>
    /// <param name="entity">The entity to upsert.</param>
    /// <returns>The upserted entity.</returns>
    Task<TEntity> UpsertEntityAsync<TEntity>(string tableName, TEntity entity)
        where TEntity : ITableEntity;

    /// <summary>
    /// Deletes the specified table entity.
    /// </summary>
    /// <param name="tableName">The tableName identifies the table name.</param>
    /// <param name="partitionKey">The partitionKey that identifies the table entity.</param>
    /// <param name="rowKey">The rowKey that identifies the table entity.</param>
    Task DeleteEntityAsync(string tableName, string partitionKey, string rowKey);
}
