using server.Component;
using SqlKata;
using static server.Transform.ConvertToPostgreQuery;

namespace server.Transform;

public class Filter : ITransformer
{
    private object value { get; set; }
    private string fieldToFilterBy { get; set; }

    private Operation _operation { get; set; }
    
    public List<string> Keys { get; set; }
    
    public string GetQuery()
    {
        var tableName = PreviousComponents[0].GetQuery();
        var operatorString = GetOperatorString(_operation);
        
        var query = new Query(tableName).Where(fieldToFilterBy, operatorString ,value);

        return getPostgresQuery(query);
    }
    

    public List<IComponent> PreviousComponents { get; set; }

    private enum Operation
    {
        Equal,
        NotEqual,
        Greater,
        GreaterOrEqual,
        Less,
        LessOrEqual,
        
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

}
