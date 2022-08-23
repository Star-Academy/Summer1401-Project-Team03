using server.Pipelines;

namespace server.Components.Transformers;

public class FieldSelector : Transformer
{
    public List<string> FieldsToSelect;

    public FieldSelector(Pipeline pipeline, Position position, List<string> fieldsToSelect) : base(pipeline, position)
    {
        FieldsToSelect = fieldsToSelect;
    }

    public override string GetQuery()
    {
        return Pipeline.QueryBuilder.Select(GetKeys(), PreviousComponents[0].GetQuery(),
            Pipeline.TableManager.NewTableName());
    }

    public override List<string> GetKeys()
    {
        return FieldsToSelect;
    }
}