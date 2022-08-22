using server.Components;
using server.Components.Transformers;
using SqlKata;
using static server.Transform.ConvertToPostgreQuery;

namespace server.Transform;

public class Filter : Transformer
{
    private object value { get; set; }
    private string fieldToFilterBy { get; set; }

    private Operation _operation { get; set; }

    public List<string> Keys { get; set; }


    public List<Component> PreviousComponents { get; set; }

    public override string GetQuery()
    {
        var tableName = PreviousComponents[0].GetQuery();
        var operatorString = GetOperatorString(_operation);

        var query = new Query(tableName).Where(fieldToFilterBy, operatorString, value);

        return getPostgresQuery(query);
    }

    private string GetOperatorString(Operation operation)
    {
        return operation switch
        {
            Operation.Equal => "=",
            Operation.NotEqual => "!=",
            Operation.Greater => ">",
            Operation.GreaterOrEqual => ">=",
            Operation.Less => "<",
            Operation.LessOrEqual => "<=",
            _ => throw new ArgumentOutOfRangeException(nameof(operation), operation, null)
        };
    }

    private enum Operation
    {
        Equal,
        NotEqual,
        Greater,
        GreaterOrEqual,
        Less,
        LessOrEqual
    }
}