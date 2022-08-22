using server.Components;
using server.Components.Transformers;
using server.Pipelines;

namespace server.Transform;

public class Replicate : Mutator
{

    public Replicate(Pipeline pipeline) : base(pipeline)
    {
        
    }
    
    private int counter;
    private int _branches = 2;
    private string previousTableName;

    public List<Component> PreviousComponents { get; set; }
    public override void Mutate()
    {
        Pipeline.QueryBuilder.Copy(PreviousComponents[0].GetTable(), previousTableName);
        throw new NotImplementedException();
    }

    public override string GetQuery()
    {
        previousTableName = PreviousComponents[0].GetTable();
        counter = counter == _branches ? 1 : counter + 1;
        return PreviousComponents[0].GetQuery();
    }
    
    public override string GetTable()
    {
        return $"{previousTableName}{counter}";
    }

    
}