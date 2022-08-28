using server.Enums;

namespace server.Components.Transformers;

public class Aggregate : Transformer
{
    public Aggregate()
    {
        FieldsToAggregate = new List<string>();
        AggregateFunctions = new List<AggregateFunction>();
        FieldsToGroupBy = new List<string>();
        Type = ComponentType.Aggregate;
    }

    public List<string> FieldsToAggregate { get; set; }

    public List<AggregateFunction> AggregateFunctions { get; set; }

    public List<string> FieldsToGroupBy { get; set; }

    public override string GetQuery()
    {
        var fieldsToSelect = new List<string>();
        for (var i = 0; i < FieldsToAggregate.Count; i++)
            fieldsToSelect.Add(QueryBuilder.Aggregate(FieldsToAggregate[i], AggregateFunctions[i].ToString()));

        return
            $"{QueryBuilder.Select(fieldsToSelect, PreviousComponents[0].GetQuery(), QueryBuilder.NewAlias())} {QueryBuilder.GroupBy(FieldsToGroupBy)}";
    }
}