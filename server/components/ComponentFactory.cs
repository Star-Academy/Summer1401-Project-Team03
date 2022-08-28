using server.Components.Extractors;
using server.Components.Loaders;
using server.Components.Transformers;
using server.Databases;

namespace server.Components;

public class ComponentFactory
{
    private static int _counter;

    public Component GetComponent(string type) =>
        type switch
        {
            "aggregate" => new Aggregate(),
            "data_sampling" => new DataSampling(),
            "field_remover" => new FieldRemover(),
            "field_renamer" => new FieldRenamer(),
            "field_selector" => new FieldSelector(),
            "filter" => new Filter(),
            "hash" => new Hash(),
            "join" => new Join(),
            "type_converter" => new TypeConverter(),
            _ => throw new Exception()
        };

    public Component CreateNewComponent(string type)
    {
        var component = GetComponent(type);
        _counter++;
        component.Id = _counter;
        return component;
    }

    public Component CreateComponent(ComponentInformation componentInformation, IQueryBuilder queryBuilder, IDatabase database)
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
