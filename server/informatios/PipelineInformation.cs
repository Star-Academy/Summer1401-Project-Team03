using server.pipelines;

namespace server.informatios;

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
        ComponentInformations = pipeline.IdToComponent.Select(c => new ComponentInformation(c.Value)).ToList();
    }

    public int Id { get; set; }
    public string Name { get; set; }
    public HashSet<int> DestinationIDs { get; set; }
    public List<ComponentInformation> ComponentInformations { get; set; }
}