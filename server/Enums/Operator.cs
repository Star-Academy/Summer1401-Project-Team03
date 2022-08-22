namespace server.Enums;

public enum Operator
{
    Equal,
    NotEqual,
    Greater,
    GreaterOrEqual,
    Less,
    LessOrEqual
}

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
}