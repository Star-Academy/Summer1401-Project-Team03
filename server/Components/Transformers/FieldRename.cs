using server.Components;
using server.Components.Transformers;

namespace server.Transform;

public class FieldRename : Transformer
{
    private string FieldToRename { get; set; }
    private string NewNameOfField { get; set; }

    public List<string> Keys { get; set; }

    public List<Component> PreviousComponents { get; set; }

    public override string GetQuery()
    {
        var tableName = PreviousComponents[0].GetQuery();
    
        Keys.Insert(Keys.IndexOf(FieldToRename), NewNameOfField);
    
        return $"alter TABLE {tableName} RENAME {FieldToRename} TO {NewNameOfField};";
    }
}