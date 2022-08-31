namespace server.components.Transformers;

public abstract class Transformer : Component
{
    public override List<string> GetKeys()
    {
        return PreviousComponents[0].GetKeys();
    }
}