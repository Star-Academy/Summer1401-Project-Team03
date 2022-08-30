using server.Enums;

namespace server.Components.Transformers;

public class FieldSelector : Transformer
{
    public FieldSelector()
    {
        Type = ComponentType.FieldSelector;
    }

    private const string Fields = "fields";

    public override string GetQuery()
    {
        return Pipeline.QueryBuilder.Select(Parameters[Fields], PreviousComponents[0].GetQuery(),
            Pipeline.QueryBuilder.NewAlias());
    }

    public override List<string> GetKeys()
    {
        return Parameters[Fields];
    }
}