using server.Pipelines;

namespace server.Components.Transformers;

public class FieldSelector : Transformer
{
    public List<string> FieldsToSelect;

    public FieldSelector(Pipeline pipeline, Position position) : base(pipeline, position)
    {
        FieldsToSelect = new List<string>();
        Name = $"Field Selector{Id}";
    }

    public override string GetQuery()
    {
        return Pipeline.QueryBuilder.Select(FieldsToSelect, PreviousComponents[0].GetQuery(),
            Pipeline.TableManager.NewTableName());
    }

    public override List<string> GetKeys()
    {
        return FieldsToSelect;
    }
}