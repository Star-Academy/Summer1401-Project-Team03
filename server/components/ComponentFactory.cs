using server.Components.Extractors;
using server.Components.Loaders;
using server.Components.Transformers;
using server.Databases;
using server.Enums;
using server.file;

namespace server.Components;

public class ComponentFactory
{
    private static int _counter;

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
            _ => throw new Exception()
        };
    }

    public Component CreateNewComponent(ComponentType type)
    {
        var component = GetComponent(type);
        component.Id = IDCounterHandler.LoadComponentID();
        IDCounterHandler.SaveComponentID(component.Id + 1);
        return component;
    }

    public Component CreateComponent(ComponentInformation componentInformation, IQueryBuilder queryBuilder,
        IDatabase database)
    {
        var component = GetComponent(componentInformation.Type);
        component.Id = componentInformation.Id;
        component.Position = componentInformation.Position;
        component.Parameters = componentInformation.Parameters;
        component.QueryBuilder = queryBuilder;
        if (component is Extractor extractor)
        {
            extractor.Database = database;
            return extractor;
        }

        if (component is Loader loader)
        {
            loader.Database = database;
            return loader;
        }

        return component;
    }
}