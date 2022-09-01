using server.enums;

namespace server.components.Transformers;

public class Filter : Transformer
{
    private const string FieldsToFilter = "fields_to_filter";
    private const string Operators = "operators";
    private const string Values = "values";
    private const string Types = "types";

    public Filter()
    {
        Type = ComponentType.Filter;
    }

    public override string GetQuery()
    {
        if (!isConfigSet)
            throw new System.Configuration.ConfigurationException($"Configuration not set!component Title: {Title}, component type: {Type}, id: {Id}");

        var valuesForQuery = new List<string>();

        for (var i = 0; i < Parameters[Values].Count; i++)
        {
            valuesForQuery.Add(ModifyByType(Parameters[Types][i], Parameters[Values][i]));
        }
        
        return
            $"{Pipeline.QueryBuilder.Select(new List<string> { "*" }, PreviousComponents[0].GetQuery(), Pipeline.QueryBuilder.NewAlias())} {Pipeline.QueryBuilder.Where(Parameters[FieldsToFilter], Parameters[Operators], valuesForQuery)}";
    }
    
    private string ModifyByType(string type, string value)
    {
        if (type == "string" || type == "text")
        {
            return $"'{value}'";
        }

        return value;
    }
    
}