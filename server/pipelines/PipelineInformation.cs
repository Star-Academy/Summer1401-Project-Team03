using server.Components;
using SqlKata;

namespace server.Pipelines;

public class PipelineInformation
{
    public int ID { get; set; }
    public string Name { get; set; }
    public HashSet<int> DestinationIDs { get; set; }
    public Dictionary<int, ComponentInformation> Components { get; set; }
    
    public PipelineInformation() {}

    public PipelineInformation(string name, int id, List<Component> components, HashSet<int> destinationIDs, Dictionary<int, Component> idToComponent)
    {
        Name = name;
        ID = id;
        DestinationIDs = destinationIDs;
        Components = idToComponent.ToDictionary( t => t.Key, 
            t => ComponentInformationAdaptor.GetInformationFromComponent(t.Value));
    }
    
}