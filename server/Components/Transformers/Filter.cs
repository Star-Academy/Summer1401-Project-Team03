using server.Components;
using server.Components.Transformers;
using server.Pipelines;
using SqlKata;
using static server.Transform.ConvertToPostgreQuery;
using server.Enums;

namespace server.Components.Transformers;

public class Filter : Transformer
{
    public string FieldToFilter { get; set; }

    public Operator Operator { get; set; }

    public object Value { get; set; }

    public Filter(Pipeline pipeline, string fieldToFilter, Operator @operator, object value) : base(pipeline)
    {
        FieldToFilter = fieldToFilter;
        Operator = @operator;
        Value = value;
    }

    public override string GetQuery()
    {
        return
            $"{Pipeline.QueryBuilder.Select(new List<string>() {"*"}, PreviousComponents[0].GetQuery(), Pipeline.TableManager.NewTableName())} {Pipeline.QueryBuilder.Where(FieldToFilter, Operator, Value)}";
    }
}