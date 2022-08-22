namespace server.Components;

public abstract class Component
{
    private static int _counter;

    public Component()
    {
        Id = _counter;
        _counter++;
    }

    public int Id { get; }

    public abstract string GetQuery();
}