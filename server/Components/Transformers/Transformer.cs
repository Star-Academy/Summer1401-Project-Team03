namespace server.Components.Transformers;

public abstract class Transformer : Component
{
    public List<Component> PreviousComponents { set; get; }
}