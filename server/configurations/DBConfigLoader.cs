using Newtonsoft.Json;
using server.configurations;

namespace a;

public static class DBConfigLoader
{
    public static DBConfiguration Load()
    {
        using (var r = new StreamReader("configurations/DBconfig.json"))
        {
            var json = r.ReadToEnd();
            var dbConfiguration = JsonConvert.DeserializeObject<DBConfiguration>(json);
            return dbConfiguration;
        }
    }
}