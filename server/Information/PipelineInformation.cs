using server.Pipelines;

namespace server.Information;

public class PipelineInformation
{
    public PipelineInformation()
    {
    }

    public PipelineInformation(Pipeline pipeline)
    {
        Id = pipeline.Id;
        Name = pipeline.Name;
        DestinationIDs = new HashSet<int>(pipeline.DestinationIDs);
        Components = pipeline.IdToComponent.ToDictionary(t => t.Key,
            t => new ComponentInformation(t.Value));
    }

    public int Id { get; set; }
    public string Name { get; set; }
    public HashSet<int> DestinationIDs { get; set; }
    public Dictionary<int, ComponentInformation> Components { get; set; }
}