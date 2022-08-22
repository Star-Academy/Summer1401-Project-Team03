namespace server.Components.Transformers;

public abstract class Mutator : Transformer
{
    public Mutator() : base()
    {
    }

    public abstract void Mutate();
}