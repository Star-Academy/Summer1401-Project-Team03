using server.Pipelines;

namespace server.Components.Transformers;

public abstract class Transformer : Component
{
    public Transformer(Pipeline pipeline, Position position) : base(pipeline, position)
    {
    }

    public override string GetTable()
    {
        return PreviousComponents[0].GetTable();
    }

    public override List<string> GetKeys()
    {
        return PreviousComponents[0].GetKeys();
    }

    public override void ConnectToAdjacentComponents(int previousId, int nextId)
    {
        var map = Pipeline.IdToComponent;
        
        var previous = map[previousId];
        var next = map[nextId];
        
        PreviousComponents.Add(previous);
        NextComponents.Add(next);

        previous.NextComponents = new List<Component> {this};
        next.PreviousComponents = new List<Component> {this};

    }
}