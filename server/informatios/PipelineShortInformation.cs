namespace server.Information;

public record PipelineShortInformation
{
    public PipelineShortInformation(string name, int id)
    {
        Name = name;
        ID = id;
    }

    public string Name { get; set; }
    public int ID { get; set; }
}