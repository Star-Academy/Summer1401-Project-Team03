using System.Data.Common;
using Npgsql;

namespace server.Databases;

public class PostgresDatabase : IDatabase
{
    private readonly NpgsqlConnection _connection;

    public PostgresDatabase(string host, string username, string database, string password)
    {
        var connectionString = $"Host={host};Database={database};Username={username};Password={password}";
        _connection = new NpgsqlConnection(connectionString);
        _connection.Open();
    }

    public DbDataReader Execute(string query)
    {
        using var cmd = new NpgsqlCommand(query, _connection);
        var reader = cmd.ExecuteReader();
        return reader;
    }

    public async Task<DbDataReader> ExecuteAsync(string query)
    {
        await using var cmd = new NpgsqlCommand(query, _connection);
        var reader = await cmd.ExecuteReaderAsync();
        return reader;
    }
}