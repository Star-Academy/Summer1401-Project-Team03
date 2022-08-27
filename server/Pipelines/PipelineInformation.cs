using server.Components;
using SqlKata;

namespace server.Pipelines;

public class PipelineInformation
{
    public int ID;
    public string Name;
    public List<ComponentInformation> Components;
    public HashSet<int> DestinationIDs;
    public Dictionary<int, ComponentInformation> IdToComponent;
    
    public PipelineInformation() {}

    public PipelineInformation(string name, int id, List<Component> components, HashSet<int> destinationIDs, Dictionary<int, Component> idToComponent)
    {
        Name = name;
        ID = id;
        Components = components.Select(ComponentInformationAdaptor.getInformationFromComponent).ToList();
        DestinationIDs = destinationIDs;
        IdToComponent = idToComponent.ToDictionary( t => t.Key, 
            t => ComponentInformationAdaptor.getInformationFromComponent(t.Value));
    }
    
}