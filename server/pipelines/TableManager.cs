namespace server.pipelines;

public class TableManager
{
    private static int _counter;

    public string NewTableName()
    {
        _counter++;
        return $"T{_counter}";
    }
}