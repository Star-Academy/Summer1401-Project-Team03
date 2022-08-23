using server.Components;
using server.Components.Transformers;
using server.Pipelines;

namespace server.Transform;

public class FieldRename : Transformer
{
    public FieldRename(Pipeline pipeline) : base(pipeline)
    {
    }

    private string FieldToRename { get; set; }
    private string NewNameOfField { get; set; }


    public List<Component> PreviousComponents { get; set; }

    public override string GetQuery()
    {
        var tableName = PreviousComponents[0].GetQuery();

        return $"alter TABLE {tableName} RENAME {FieldToRename} TO {NewNameOfField};";
    }
}