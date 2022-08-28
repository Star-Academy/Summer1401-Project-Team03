using server.Pipelines;
using SqlKata;

namespace server.Components.Transformers;

public class Join : Transformer
{
    public Join() : base()
    {
        Type = "join";
    }

    private string firstTableProperty { get; set; }
    private string secondTableProperty { get; set; }
    private JoinType joinType { get; set; }
    private string firstTableName { get; set; }
    private string secondTableName { get; set; }
    
    public override string GetQuery()
    {
        throw new NotImplementedException();
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