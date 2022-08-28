using server.Pipelines;

namespace server.Components.Transformers;

public class TypeConverter : Transformer
{
    public TypeConverter() : base()
    {
        Type = "type_converter";
    }
    
    public override string GetQuery()
    {
        var fields = Parameters["fields"];
        var types = Parameters["types"];
        var fieldsToSelect = GetKeys().Except(fields).ToList();
        for (int i = 0; i < fields.Count; i++)
        {
            fieldsToSelect.Add(QueryBuilder.ConvertType(fields[i],types[i].ToString()));
        }
        return QueryBuilder.Select(fieldsToSelect,PreviousComponents[0].GetQuery(),QueryBuilder.NewAlias());
    }
}