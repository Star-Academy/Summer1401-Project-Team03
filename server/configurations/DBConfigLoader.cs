using Newtonsoft.Json;
using server.configurations;

namespace a;

public static class DBConfigLoader
{
    public static DBConfiguration Load()
    {
        using (StreamReader r = new StreamReader("configurations/DBconfig.json"))
        {
            string json = r.ReadToEnd();
            var dbConfiguration = JsonConvert.DeserializeObject<DBConfiguration>(json);
            return dbConfiguration;
        }
    }
}