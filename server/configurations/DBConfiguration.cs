namespace server.configurations;

public record DBConfiguration
{
    public DBConfiguration(string host, string username, string database, string password)
    {
        Host = host;
        Username = username;
        Database = database;
        Password = password;
    }

    public string Host { get; set; }
    public string Username { get; set; }
    public string Database { get; set; }
    public string Password { get; set; }
}