using System.Data.Common;

namespace server.databases;

public interface IDatabase
{
    public DbDataReader Execute(string query);
    public Task<DbDataReader> ExecuteAsync(string query);
}