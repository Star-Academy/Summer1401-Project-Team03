namespace server.Pipelines;

public class TableManager
{
    private static int _counter = 0;

    public string NewTableName()
    {
        _counter++;
        return $"T{_counter}";
    }
}