using Newtonsoft.Json;

namespace server.configurations;

public static class DbConfigLoader
{
    public static DbConfiguration Load()
    {
        using var r = new StreamReader("configurations/DBconfig.json");
        var json = r.ReadToEnd();
        var dbConfiguration = JsonConvert.DeserializeObject<DbConfiguration>(json);
        return dbConfiguration;
    }
}