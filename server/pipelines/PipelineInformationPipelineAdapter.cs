namespace server.Pipelines;

public static class PipelineInformationPipelineAdapter
{
    public static Pipeline PipelineFromInformation(PipelineInformation information)
    {
        return new Pipeline(information);
    }

    public static PipelineInformation InformationFromPipeline(Pipeline pipeline)
    {
        return new PipelineInformation(pipeline.Name, pipeline.id, pipeline.IdToComponent.Values.ToList(),
            pipeline.DestinationIDs,
            pipeline.IdToComponent);
    }
}