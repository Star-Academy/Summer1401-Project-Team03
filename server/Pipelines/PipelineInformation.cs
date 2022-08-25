using System.ComponentModel;

namespace server.Pipelines;

public class PipelineInformation
{
    public string Name;
    public string ID;
    public List<IComponent> Components;

    // public PipelineInformation(string name, string id, ){}
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