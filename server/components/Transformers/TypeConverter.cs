using server.Enums;

namespace server.Components.Transformers;

public class TypeConverter : Transformer
{
    public TypeConverter()
    {
        Type = ComponentType.TypeConverter;
    }

    public override string GetQuery()
    {
        var fields = Parameters["fields"];
        var types = Parameters["types"];
        var fieldsToSelect = GetKeys().Except(fields).ToList();
        for (var i = 0; i < fields.Count; i++) fieldsToSelect.Add(QueryBuilder.ConvertType(fields[i], types[i]));
        return QueryBuilder.Select(fieldsToSelect, PreviousComponents[0].GetQuery(), QueryBuilder.NewAlias());
    }
}