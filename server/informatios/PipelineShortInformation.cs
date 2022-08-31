namespace server.informatios;

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