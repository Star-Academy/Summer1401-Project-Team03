using server.Pipelines;

namespace server.Components.Transformers;

public class TypeConverter : Mutator
{
    public List<string> Fields;
    public List<Type> Types;
    
    public TypeConverter(Pipeline pipeline, Position position) : base(pipeline, position)
    {
        TableName = Pipeline.TableManager.NewTableName();
        Fields = new List<string>();
        Types = new List<Type>();
        Name = $"Type Converter{Id}";
    }
    
    public override string GetQuery()
    {
        //Mutate();
        var fieldsToSelect = GetKeys().Except(Fields).ToList();
        for (int i = 0; i < Fields.Count; i++)
        {
            fieldsToSelect.Add(Pipeline.QueryBuilder.ConvertType(Fields[i],Types[i].ToString()));
        }
        return Pipeline.QueryBuilder.Select(fieldsToSelect,PreviousComponents[0].GetQuery(),Pipeline.TableManager.NewTableName());
    }

    public override void Mutate()
    {
        Pipeline.Database.Execute(Pipeline.QueryBuilder.Drop(TableName)).Close();
        var query = Pipeline.QueryBuilder.Copy(TableName, PreviousComponents[0].GetQuery());
        Pipeline.Database.Execute(query).Close();
    }
    
}