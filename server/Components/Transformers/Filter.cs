using server.Enums;
using server.Pipelines;

namespace server.Components.Transformers;

public class Filter : Transformer
{
    public Filter(Pipeline pipeline, Position position) :
        base(pipeline, position)
    {
        FieldsToFilter = new List<string>();
        Operators = new List<Operator>();
        Values = new List<object>();
    }

    public List<string> FieldsToFilter { get; set; }

    public List<Operator> Operators { get; set; }

    public List<object> Values { get; set; }

    public override string GetQuery()
    {
        return
            $"{Pipeline.QueryBuilder.Select(new List<string> {"*"}, PreviousComponents[0].GetQuery(), Pipeline.TableManager.NewTableName())} {Pipeline.QueryBuilder.Where(FieldsToFilter, Operators, Values)}";
    }
}