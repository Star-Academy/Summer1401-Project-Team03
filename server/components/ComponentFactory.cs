﻿using server.components.Extractors;
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
            ComponentType.Math => new Math(),
            ComponentType.Replicate => new Replicate(),
            ComponentType.DataCleanser => new DataCleanser(),
            ComponentType.Concatenate => new Concatenate(),
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