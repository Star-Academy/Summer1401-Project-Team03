using server.components.Extractors;
using server.components.Loaders;
using server.components.Transformers;
using server.enums;
using server.informatios;
using server.pipelines;
using Math = server.components.Transformers.Math;

namespace server.components;

public class ComponentFactory
{
    private static int _counter;
    public static readonly ComponentFactory Instance = new();

    private Component GetComponent(ComponentType type)
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
            ComponentType.CsvExtractor => new CSVExtractor(),
            ComponentType.CsvLoader => new CSVLoader(),
            ComponentType.JsonExtractor => new JSONExtractor(),
            ComponentType.JsonLoader => new JSONLoader(),
            ComponentType.Math => new Math(),
            ComponentType.Replicate => new Replicate(),
            ComponentType.DataCleanser => new DataCleanser(),
            ComponentType.Concatenate => new Concatenate(),
            ComponentType.Python => new Python(),
            _ => throw new Exception()
        };
    }

    public Component CreateComponent(ComponentType type, string title)
    {
        var component = GetComponent(type);
        _counter++;
        component.Id = _counter;
        component.Title = title;
        return component;
    }

    public Component CreateComponent(ComponentType type, Pipeline pipeline, Position position, string title)
    {
        var component = GetComponent(type);
        _counter++;
        component.Id = _counter;
        component.Pipeline = pipeline;
        component.Position = position;
        component.Title = title;
        return component;
    }

    public Component LoadComponent(ComponentInformation componentInformation, Pipeline pipeline)
    {
        var component = GetComponent(componentInformation.Type.GetComponentType());
        component.Title = componentInformation.Title;
        component.Id = componentInformation.Id;
        component.Position = componentInformation.Position;
        component.Parameters = new Dictionary<string, List<string>>(componentInformation.Parameters);
        component.Pipeline = pipeline;
        return component;
    }
}