using server.Pipelines;

namespace server.Components.Transformers;

public class FieldRemover : Transformer
{
    public List<string> FieldsToRemove;

    public FieldRemover(Pipeline pipeline, Position position, List<string> fieldsToRemove) : base(pipeline, position)
    {
        FieldsToRemove = fieldsToRemove;
        Name = $"Field Remover{Id}";
    }

    public override string GetQuery()
    {
        return Pipeline.QueryBuilder.Select(GetKeys(), PreviousComponents[0].GetQuery(),
            Pipeline.TableManager.NewTableName());
    }

    public override List<string> GetKeys()
    {
        return PreviousComponents[0].GetKeys().Except(FieldsToRemove).ToList();
    }
}