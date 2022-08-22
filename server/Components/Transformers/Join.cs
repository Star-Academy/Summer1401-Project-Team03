using SqlKata;
using static server.Transform.ConvertToPostgreQuery;

namespace server.Transform;

public class Join : ITransformer
{
    private string firstTableProperty { get; set; }
    private string secondTableProperty { get; set; }
    private JoinType joinType { get; set; }

    public List<string> Keys { get; set; }

    public List<IComponent> PreviousComponents { get; set; }

    public string GetQuery()
    {
        var firstTableName = PreviousComponents[0].GetQuery();
        var secondTableName = PreviousComponents[1].GetQuery();

        var firstProperty = $"{firstTableName}.{firstTableProperty}";
        var secondProperty = $"{secondTableName}.{secondTableProperty}";

        var query = new Query(firstTableName);
        query = QueryByJoinType(query, secondTableName, firstProperty, secondProperty);

        return getPostgresQuery(query);
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