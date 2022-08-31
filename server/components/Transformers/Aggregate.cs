﻿using server.Enums;

namespace server.Components.Transformers;

public class Aggregate : Transformer
{
    private const string FieldsToAggregate = "fields_to_aggregate";

    private const string AggregateFunctions = "aggregate_functions";

    private const string FieldsToGroupBy = "fields_to_group_by";

    public Aggregate()
    {
        Type = ComponentType.Aggregate;
    }

    public override string GetQuery()
    {
        if (!isConfigSet)
            throw new System.Configuration.ConfigurationException($"component type: {Type}, id: {Id}");
        
        var fieldsToSelect = new List<string>(Parameters[FieldsToGroupBy]);
        for (var i = 0; i < Parameters[FieldsToAggregate].Count; i++)
            fieldsToSelect.Add(Pipeline.QueryBuilder.Aggregate(Parameters[FieldsToAggregate][i],
                Parameters[AggregateFunctions][i]));

        var x =
            $"{Pipeline.QueryBuilder.Select(fieldsToSelect, PreviousComponents[0].GetQuery(), Pipeline.QueryBuilder.NewAlias())} {Pipeline.QueryBuilder.GroupBy(Parameters[FieldsToGroupBy])}";
        return x;
    }
}