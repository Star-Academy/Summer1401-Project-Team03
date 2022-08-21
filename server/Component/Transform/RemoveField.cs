using System.Text;
using server.Component;

namespace server.Transform;

public class RemoveField : ITransformer
{
    private List<string> fieldsToRemove;
    public List<string> Keys { get; set; }
    public string GetQuery()
    {
        var tableName = PreviousComponents[0].GetQuery();

        var builder = new StringBuilder( $"alter TABLE {tableName}");

        foreach (var field in fieldsToRemove)
        {
            builder.Append($"DROP COLUMN {field}");
        }

        builder.Append(';');
        
        return builder.ToString();
    }

    public List<IComponent> PreviousComponents { get; set; }
}