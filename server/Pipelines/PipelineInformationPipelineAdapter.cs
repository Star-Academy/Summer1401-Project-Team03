namespace server.Pipelines;

public class PipelineInformationPipelineAdapter
{

    public static Pipeline PipelineFromInformation(PipelineInformation information)
    {
        return new Pipeline();
    }

    public static PipelineInformation InformationFromPipeline(Pipeline pipeline, string id)
    {
        return new PipelineInformation(pipeline.Name, id, pipeline.IdToComponent.Values.ToList(), pipeline.DestinationIDs,
            pipeline.IdToComponent);
    }
}