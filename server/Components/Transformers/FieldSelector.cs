using server.Pipelines;

namespace server.Components.Transformers;

public class FieldSelector : Transformer
{
    public List<string> FieldsToSelect;

    public FieldSelector(Pipeline pipeline, List<string> fieldsToSelect) : base(pipeline)
    {
        FieldsToSelect = fieldsToSelect;
    }

    public override string GetQuery()
    {
        return Pipeline.QueryBuilder.Select(GetKeys(), PreviousComponents[0].GetQuery(), Pipeline.TableManager.NewTableName());
    }

    public override List<string> GetKeys()
    {
        return FieldsToSelect;
    }
}