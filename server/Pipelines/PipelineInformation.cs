using System.ComponentModel;

namespace server.Pipelines;

public class PipelineInformation
{
    public string Name;
    public string ID;
    public List<IComponent> Components;

    public PipelineInformation ExtractInformation()
    {
        var informations = new List<PipelineInformation>();
        throw new NotImplementedException();
    }
}