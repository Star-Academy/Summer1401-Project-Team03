namespace server.Transform;

public class FieldRename : ITransformer
{
    private string FieldToRename { get; set; }
    private string NewNameOfField { get; set; }

    public List<string> Keys { get; set; }

    public List<IComponent> PreviousComponents { get; set; }

    public string GetQuery()
    {
        var tableName = PreviousComponents[0].GetQuery();

        Keys.Insert(Keys.IndexOf(FieldToRename), NewNameOfField);

        return $"alter TABLE {tableName} RENAME {FieldToRename} TO {NewNameOfField};";
    }
}