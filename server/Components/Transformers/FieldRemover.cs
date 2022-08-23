using server.Components.Transformers;
using server.Pipelines;

namespace server.Transform;

public class FieldRemover : Transformer
{
    public List<string> FieldsToRemove;

    public FieldRemover(Pipeline pipeline, List<string> fieldsToRemove) : base(pipeline)
    {
        FieldsToRemove = fieldsToRemove;
    }

    public override string GetQuery()
    {
        return Pipeline.QueryBuilder.Select(GetKeys(), PreviousComponents[0].GetQuery(), Pipeline.TableManager.NewTableName());
    }

    public override List<string> GetKeys()
    {
        return PreviousComponents[0].GetKeys().Except(FieldsToRemove).ToList();
    }
}