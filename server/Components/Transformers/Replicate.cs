using server.Components;
using server.Components.Transformers;

namespace server.Transform;

public class Replicate : Mutator
{
    public List<string> Keys { get; set; }
    private int counter = 0;
    private int _branches = 2;
    private string previousTableName;

    public List<Component> PreviousComponents { get; set; }
    public override void Mutate()
    {
        pipeline.QueryBuilder.CopyTable(PreviousComponents[0].GetTableName(), previousTableName);
        throw new NotImplementedException();
    }

    public override string GetQuery()
    {
        previousTableName = PreviousComponents[0].GetTableName();
        counter = counter == _branches ? 1 : counter + 1;
        return PreviousComponents[0].GetQuery();
    }
    
    public override string GetTableName()
    {
        return $"{previousTableName}{counter}";
    }

    
}