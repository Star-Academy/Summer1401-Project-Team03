using System.Diagnostics;
using server.configurations;
using server.enums;

namespace server.components.Transformers;

public class Python : Transformer
{
    private static readonly DBConfiguration Configuration = DBConfigLoader.Load(); 
    
    private string _tableName;
    private string _prefix;
    private string _sufix;

    
    public Python()
    {
         Type = ComponentType.Python;
    }

    private const string Code = "code";
    public override string GetQuery()
    {
        if (_tableName is null)
        {
            _tableName = Pipeline.QueryBuilder.NewAlias();
        }

        var configurations = DBConfigLoader.Load();
        var query = Pipeline.QueryBuilder.Select(new List<string>() {"*"}, PreviousComponents[0].GetQuery(),
            Pipeline.QueryBuilder.NewAlias());
        //Start of Python Code
        var pythonCode = $@"from sqlalchemy import create_engine
import pandas.io.sql as psql
engine = create_engine('postgresql://{configurations.Username}:{configurations.Password}@{configurations.Host}/{configurations.Database}')
connection = engine.connect()
connection.execute('{Pipeline.QueryBuilder.Drop(_tableName)}')
input = psql.read_sql('{query}', connection)    
output = input
{Parameters["code"][0]}
output.to_sql('{_tableName}', connection)";
        //End of Python Code
    
        var path = Path.Combine(Directory.GetCurrentDirectory(), "resources", "tmp.py");
        File.WriteAllText(path,pythonCode.ToString());
        using var process = Process.Start("CMD.exe",
            $"/C python {path}");
        process.WaitForExit();
        return Pipeline.QueryBuilder.SelectTable(_tableName);
    }
}