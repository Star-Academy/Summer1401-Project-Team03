namespace server.Components;

public abstract class Component
{
    private static int _counter = 0;  
    public int Id { get; }
    public Component()
    {
        Id = _counter;
        _counter++;
    }
    
    public abstract string GetQuery();
}