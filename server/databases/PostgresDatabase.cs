using System.Data.Common;
using Npgsql;
using server.configurations;

namespace server.Databases;

public class PostgresDatabase : IDatabase
{
    private readonly NpgsqlConnection _connection;

    public PostgresDatabase(DBConfiguration dbConfiguration)
    {
        var connectionString =
            $"Host={dbConfiguration.Host};Database={dbConfiguration.Database};Username={dbConfiguration.Username};Password={dbConfiguration.Password}";
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