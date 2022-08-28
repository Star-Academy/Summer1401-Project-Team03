using server.Components.Transformers;
using server.Databases;
using server.Pipelines;

namespace server.Components;

public abstract class Component
{
    private static int _counter;
    public Component()
    {
        _counter++;
        Id = _counter;
        NextComponents = new List<Component>();
    }

    public Component(ComponentInformation information, IQueryBuilder queryBuilder)
    {
        Id = information.Id;
        Position = information.Position;
        Type = information.Type;
        Parameters = information.TransformData;
        QueryBuilder = queryBuilder;
    }

    // public static Component CreateComponent(string type, ComponentInformation componentInformation,
    //     IQueryBuilder queryBuilder) =>
    //     type switch
    //     {
    //         "aggregate" => new Aggregate(componentInformation, queryBuilder),
    //         "data_sampling" => new DataSampling(componentInformation, queryBuilder),
    //         "field_remover" => new FieldRemover(componentInformation, position),
    //         "field_renamer" => new FieldRenamer(pipeline, position),
    //         "field_selector" => new FieldSelector(pipeline, position),
    //         "filter" => new Filter(pipeline, position),
    //         //"hash" => new Hash(pipeline, position),
    //         "join" => new Join(pipeline, position),
    //         "type_converter" => new TypeConverter(pipeline, position),
    //         _ => throw new Exception()
    //     };

    public Dictionary<string, List<string>> Parameters { set; get; }
    public List<Component> NextComponents { set; get; }

    public List<Component> PreviousComponents { set; get; }
    public Position Position { set; get; }

    public string Type { set; get; }

    public int Id { get; }
    public IQueryBuilder QueryBuilder { set; get; }

    public abstract string GetQuery();
    public abstract List<string> GetKeys();
}