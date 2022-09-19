namespace server.configurations;

public record DbConfiguration(string Host, string Username, string Database, string Password)
{
    public string Host { get; set; } = Host;
    public string Username { get; set; } = Username;
    public string Database { get; set; } = Database;
    public string Password { get; set; } = Password;
}