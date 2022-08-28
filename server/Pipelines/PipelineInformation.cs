using server.Components;
using SqlKata;

namespace server.Pipelines;

public class PipelineInformation
{
    public int ID { get; set; }
    public string Name { get; set; }
    public List<ComponentInformation> Components { get; set; }
    public HashSet<int> DestinationIDs { get; set; }
    public Dictionary<int, ComponentInformation> IdToComponent { get; set; }
    
    public PipelineInformation() {}

    public PipelineInformation(string name, int id, List<Component> components, HashSet<int> destinationIDs, Dictionary<int, Component> idToComponent)
    {
        Name = name;
        ID = id;
        Components = components.Select(ComponentInformationAdaptor.GetInformationFromComponent).ToList();
        DestinationIDs = destinationIDs;
        IdToComponent = idToComponent.ToDictionary( t => t.Key, 
            t => ComponentInformationAdaptor.GetInformationFromComponent(t.Value));
    }
    
}