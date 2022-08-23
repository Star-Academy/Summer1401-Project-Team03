using System.Collections;
using System.Data.Common;
using System.Security.Cryptography;
using System.Text;
using server.Pipelines;
using SqlKata;

namespace server.Components.Transformers;

public class Hash : Mutator
{
    public Hash(Pipeline pipeline, Position position, string fieldToHash, bool shouldCreateNewField, string newFieldName) : base(pipeline, position)
    {
        FieldToHash = fieldToHash;
        NewFieldName = newFieldName;
        ShouldCreateNewField = shouldCreateNewField;

    }

    private string FieldToHash { get; set; }
    private bool ShouldCreateNewField { get; set; }
    private string NewFieldName { get; set; }

    public override void Mutate()
    {
        
        var previousTableName = PreviousComponents[0].GetQuery();
        Pipeline.QueryBuilder.Copy(TableName, previousTableName);
    }
    
    public override string GetQuery()
    {
        TableName = Pipeline.TableManager.NewTableName();
        
        return Pipeline.QueryBuilder.SelectTable(TableName);
    }

    private List<string> GetHashedValueOfColumnn(string previousTableName)
    {
        var tempName = Pipeline.TableManager.NewTableName();
        var query = Pipeline.QueryBuilder.Select(new List<string> {FieldToHash}, previousTableName,
            tempName);

        var reader = Pipeline.Database.Execute(query);
        var hashedValues = CreateListOfStringsFromReader(reader, 0)
                                    .Select(GetHashString).ToList();
        reader.Close();
        
        return hashedValues;
    }

    private IEnumerable<byte> GetHashArray(string str)
    {
        using HashAlgorithm algorithm = SHA256.Create();
        return algorithm.ComputeHash(Encoding.UTF8.GetBytes(str));
    }

    private string GetHashString(object obj)
    {
        var sb = new StringBuilder();
        foreach (var b in GetHashArray(obj.ToString()))
            sb.Append(b.ToString("X2"));

        return sb.ToString();
    }

    private string SqlHash()
    {
        return @"create function h_int(text) returns int as $$
        select ('x'||substr(md5($1),1,8))::bit(32)::int;
            $$ language sql";
    }


    public IEnumerable<string> CreateListOfStringsFromReader(DbDataReader reader, int ordinal)
    {
        var strings = new List<string>();

        if (!reader.HasRows) return strings;
        while (reader.Read())
        {
            try
            {
                strings.Add(reader.GetString(ordinal));
            }
            catch (InvalidCastException)
            {
                strings.Add("0");
            }
        }

        return strings;
    }
}