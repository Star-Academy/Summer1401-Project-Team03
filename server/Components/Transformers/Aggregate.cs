using server.Enums;
using server.Pipelines;

namespace server.Components.Transformers;

public class Aggregate : Transformer
{
    public Aggregate(Pipeline pipeline, Position position) :
        base(pipeline, position)
    {
        FieldsToAggregate = new List<string>();
        AggregateFunctions = new List<AggregateFunction>();
        FieldsToGroupBy = new List<string>();
        Name = "aggregate";
    }
    
    public List<string> FieldsToAggregate { get; set; }

    public List<AggregateFunction> AggregateFunctions { get; set; }

    public List<string> FieldsToGroupBy { get; set; }

    public override string GetQuery()
    {
        var fieldsToSelect = new List<string>();
        for (int i = 0; i < FieldsToAggregate.Count; i++)
        {
            fieldsToSelect.Add(Pipeline.QueryBuilder.Aggregate(FieldsToAggregate[i], AggregateFunctions[i].ToString()));
        }

        return
            $"{Pipeline.QueryBuilder.Select(fieldsToSelect, PreviousComponents[0].GetQuery(), Pipeline.TableManager.NewTableName())} {Pipeline.QueryBuilder.GroupBy(FieldsToGroupBy)}";
    }
}