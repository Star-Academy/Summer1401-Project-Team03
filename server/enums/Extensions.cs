namespace server.Enums;

public static class Extensions
{
    public static string GetString(this Operator @operator)
    {
        return @operator switch
        {
            Operator.Equal => "=",
            Operator.NotEqual => "!=",
            Operator.Greater => ">",
            Operator.GreaterOrEqual => ">=",
            Operator.Less => "<",
            Operator.LessOrEqual => "<=",
            _ => throw new ArgumentOutOfRangeException(nameof(@operator), @operator, null)
        };
    }

    public static Operator GetOperator(this string @string)
    {
        return @string switch
        {
            "==" => Operator.Equal,
            "!=" => Operator.NotEqual,
            ">" => Operator.Greater,
            ">=" => Operator.GreaterOrEqual,
            "<" => Operator.Less,
            "<=" => Operator.LessOrEqual,
            _ => throw new ArgumentOutOfRangeException(nameof(@string), @string, null)
        };
    }
}