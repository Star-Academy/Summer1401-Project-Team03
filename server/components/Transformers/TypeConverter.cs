﻿using server.enums;

namespace server.components.Transformers;

public class TypeConverter : Transformer
{
    private const string Fields = "fields";
    private const string Types = "types";

    public TypeConverter()
    {
        Type = ComponentType.TypeConverter;
    }

    public override string GetQuery()
    {
        if (!isConfigSet)
            throw new System.Configuration.ConfigurationException($"Configuration not set!component Title: {Title}, component type: {Type}, id: {Id}");

        var fields = Parameters[Fields];
        var types = Parameters[Types];
        var fieldsToSelect = GetKeys().Except(fields).ToList();
        for (var i = 0; i < fields.Count; i++)
            fieldsToSelect.Add(Pipeline.QueryBuilder.ConvertType(fields[i], types[i]));
        return Pipeline.QueryBuilder.Select(fieldsToSelect, PreviousComponents[0].GetQuery(),
            Pipeline.QueryBuilder.NewAlias());
    }
}