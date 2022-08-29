using server.Components.Extractors;
using server.Components.Loaders;
using server.Components.Transformers;
using server.Enums;
using server.Information;
using server.Pipelines;

namespace server.Components;

public class ComponentFactory
{
    private static int _counter;
    public static ComponentFactory Instance = new();

    public Component GetComponent(ComponentType type)
    {
        return type switch
        {
            ComponentType.Aggregate => new Aggregate(),
            ComponentType.DataSampling => new DataSampling(),
            ComponentType.FieldRemover => new FieldRemover(),
            ComponentType.FieldRenamer => new FieldRenamer(),
            ComponentType.FieldSelector => new FieldSelector(),
            ComponentType.Filter => new Filter(),
            ComponentType.Hash => new Hash(),
            ComponentType.Join => new Join(),
            ComponentType.TypeConverter => new TypeConverter(),
            ComponentType.CSVExtractor => new CSVExtractor(),
            ComponentType.CSVLoader => new CSVLoader(),
            ComponentType.JSONExtractor => new JSONExtractor(),
            ComponentType.JSONLoader => new JSONLoader(),
            _ => throw new Exception()
        };
    }

    public Component CreateComponent(ComponentType type)
    {
        var component = GetComponent(type);
        _counter++;
        component.Id = _counter;
        return component;
    }

    public Component CreateComponent(ComponentType type, Pipeline pipeline, Position position)
    {
        var component = GetComponent(type);
        component.Pipeline = pipeline;
        component.Position = position;
        return component;
    }

    public Component LoadComponent(ComponentInformation componentInformation, Pipeline pipeline)
    {
        var component = GetComponent(componentInformation.Type.GetComponentType());
        component.Id = componentInformation.Id;
        component.Position = componentInformation.Position;
        component.Parameters = new Dictionary<string, List<string>>(componentInformation.Parameters);
        component.Pipeline = pipeline;
        return component;
    }
}