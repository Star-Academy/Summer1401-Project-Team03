using server.Components;

namespace server.Pipelines;

public class PipelineInformation
{
    public string Name;
    public string ID;
    public List<Component> Components;
    public HashSet<int> DestinationIDs;
    public Dictionary<int, Component> IdToComponent;

    public PipelineInformation(string name, string id, List<Component> components, HashSet<int> destinationIDs, Dictionary<int, Component> idToComponent)
    {
        Name = name;
        ID = id;
        Components = components;
        DestinationIDs = destinationIDs;
        IdToComponent = idToComponent;
    }

    public static PipelineInformation ExtractInformation(Dictionary<int, Pipeline> pipelines)
    {
        var informations = new List<PipelineInformation>();

        foreach (var pipeline in pipelines)
        {
            var pipelineInformation = new PipelineInformation();
        }
        throw new NotImplementedException();
    }
}