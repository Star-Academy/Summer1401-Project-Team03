using server.Pipelines;

namespace server.Components.Transformers;

public class TypeConverter : Mutator
{
    public List<string> Field;
    public List<Type> Type;
    
    public TypeConverter(Pipeline pipeline, Position position) : base(pipeline, position)
    {
        TableName = Pipeline.TableManager.NewTableName();
        Field = new List<string>();
        Type = new List<Type>();
    }
    
    public override string GetQuery()
    {
        Mutate();
        return Pipeline.QueryBuilder.SelectTable(TableName);
    }

    public override void Mutate()
    {
        Pipeline.Database.Execute(Pipeline.QueryBuilder.Drop(TableName)).Close();
        var query = Pipeline.QueryBuilder.Copy(TableName, PreviousComponents[0].GetQuery());
        Pipeline.Database.Execute(query).Close();
    }
    
}