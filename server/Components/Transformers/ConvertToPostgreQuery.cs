using SqlKata;
using SqlKata.Compilers;

namespace server.Components.Transformers;

public class ConvertToPostgreQuery
{
    public static string getPostgresQuery(Query query)
    {
        return new PostgresCompiler().Compile(query).Sql;
    }
}