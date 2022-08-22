using System.Text;
using server.Components;
using server.Components.Transformers;

namespace server.Transform;

public class RemoveField : Transformer
{
    private List<string> fieldsToRemove;
    public List<string> Keys { get; set; }

    public List<Component> PreviousComponents { get; set; }

    public override string GetQuery()
    {
        var tableName = PreviousComponents[0].GetQuery();

        var builder = new StringBuilder($"alter TABLE {tableName}");

        foreach (var field in fieldsToRemove) builder.Append($"DROP COLUMN {field}");

        builder.Append(';');

        return builder.ToString();
    }
}