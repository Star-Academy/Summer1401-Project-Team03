namespace server.Transform;

using Component;

public interface ITransformer : IComponent
{
    public List<IComponent> PreviousComponents { set; get; }
}