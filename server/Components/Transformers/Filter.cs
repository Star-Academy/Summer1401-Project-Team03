using server.Enums;
using server.Pipelines;

namespace server.Components.Transformers;

public class Filter : Transformer
{
    public Filter(Pipeline pipeline, Position position, string fieldToFilter, Operator @operator, object value) :
        base(pipeline, position)
    {
        FieldToFilter = fieldToFilter;
        Operator = @operator;
        Value = value;
    }

    public string FieldToFilter { get; set; }

    public Operator Operator { get; set; }

    public object Value { get; set; }

    public override string GetQuery()
    {
        return
            $"{Pipeline.QueryBuilder.Select(new List<string> {"*"}, PreviousComponents[0].GetQuery(), Pipeline.TableManager.NewTableName())} {Pipeline.QueryBuilder.Where(FieldToFilter, Operator.GetString(), Value)}";
    }
}