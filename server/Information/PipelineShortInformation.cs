namespace server.Information;

public record PipelineShortInformation
{
    public string Name { get; set; }
    public int ID { get; set; }

    public PipelineShortInformation(string name, int id)
    {
        Name = name;
        ID = id;
    }
}