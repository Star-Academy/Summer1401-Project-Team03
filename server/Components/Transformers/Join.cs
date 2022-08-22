using server.Components;
using server.Components.Transformers;
using server.Pipelines;
using SqlKata;
using static server.Transform.ConvertToPostgreQuery;

namespace server.Transform;

public class Join : Mutator
{
    
    public Join(Pipeline pipeline) : base(pipeline)
    {
        
    }

    private string firstTableProperty { get; set; }
    private string secondTableProperty { get; set; }
    private JoinType joinType { get; set; }
    private string firstTableName { get; set; }
    private string secondTableName { get; set; }


    public List<Component> PreviousComponents { get; set; }
    public override void Mutate()
    {
        firstTableName = PreviousComponents[0].GetQuery();
        secondTableName = PreviousComponents[1].GetQuery();

        var firstProperty = $"{firstTableName}.{firstTableProperty}";
        var secondProperty = $"{secondTableName}.{secondTableProperty}";

        var query = new Query(firstTableName);
        query = QueryByJoinType(query, secondTableName, firstProperty, secondProperty);

        Pipeline.Database.Execute(getPostgresQuery(query));
        Pipeline.QueryBuilder.Copy(firstTableName, GetTable());
        Pipeline.QueryBuilder.Drop(secondTableName);
        Pipeline.QueryBuilder.Drop(firstTableName);

    }

    public override string GetQuery()
    {
        Mutate();
        
        return GetTable();
    }

    public override string GetTable()
    {
        return $"({firstTableName}+{secondTableName})";
    }
    
    private Query QueryByJoinType(Query query,
        string secondTableName, string firstProperty, string secondProperty)
    {
        return joinType switch
        {
            JoinType.Inner => query.Join(secondTableName, firstProperty, secondProperty),
            JoinType.LeftOuter => query.LeftJoin(secondTableName, firstProperty, secondProperty),
            JoinType.RightOuter => query.RightJoin(secondTableName, firstProperty, secondProperty),
            JoinType.FullOuter => query.LeftJoin(secondTableName, firstProperty, secondProperty)
                .Union(query.RightJoin(secondTableName, firstProperty, secondProperty)),
            _ => throw new ArgumentOutOfRangeException(nameof(joinType), joinType, null)
        };
    }

    private enum JoinType
    {
        Inner,
        LeftOuter,
        RightOuter,
        FullOuter
    }
}