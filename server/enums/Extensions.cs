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


    public static ComponentType GetComponentType(this string componentType)
    {
        return componentType switch
        {
            "filter" => ComponentType.Filter,
            "field_selector" => ComponentType.FieldSelector,
            "field_renamer" => ComponentType.FieldRenamer,
            "field_remover" => ComponentType.FieldRemover,
            "aggregate" => ComponentType.Aggregate,
            "data_sampling" => ComponentType.DataSampling,
            "hash" => ComponentType.Hash,
            "join" => ComponentType.Join,
            "type_converter" => ComponentType.TypeConverter,
            "csv_loader" => ComponentType.CSVLoader,
            "csv_extractor" => ComponentType.CSVExtractor,
            "json_loader" => ComponentType.JSONLoader,
            "json_extractor" => ComponentType.JSONExtractor,
            "replicate" => ComponentType.Replicate,
            "math" => ComponentType.Math,
            "data_cleanser" => ComponentType.DataCleanser,
            "split" => ComponentType.Concatenate,
            _ => throw new ArgumentOutOfRangeException(nameof(componentType), componentType, null)
        };
    }

    public static string GetString(this ComponentType componentType)
    {
        return componentType switch
        {
            ComponentType.Filter => "filter",
            ComponentType.FieldSelector => "field_selector",
            ComponentType.FieldRenamer => "field_renamer",
            ComponentType.FieldRemover => "field_remover",
            ComponentType.Aggregate => "aggregate",
            ComponentType.DataSampling => "data_sampling",
            ComponentType.Hash => "hash",
            ComponentType.Join => "join",
            ComponentType.TypeConverter => "type_converter",
            ComponentType.CSVLoader => "csv_loader",
            ComponentType.CSVExtractor => "csv_extractor",
            ComponentType.JSONLoader => "json_loader",
            ComponentType.JSONExtractor => "json_extractor",
            ComponentType.Replicate => "replicate",
            ComponentType.Math => "math",
            ComponentType.DataCleanser => "data_cleanser",
            ComponentType.Concatenate => "split",
            _ => throw new ArgumentOutOfRangeException(nameof(componentType), componentType, null)
        };
    }

    public static MathOperator GetOperatorType(this string operatorType)
    {
        return operatorType switch
        {
            "log" => MathOperator.Log,
            "sin" => MathOperator.Sin,
            "cos" => MathOperator.Cos,
            "sqrt" => MathOperator.SquareRoot,
            "tan" => MathOperator.Tan,
            "add" => MathOperator.Add,
            "subtract" => MathOperator.Subtract,
            "multiply" => MathOperator.Multiply,
            "divide" => MathOperator.Divide,
            "abs" => MathOperator.Abs,
            "exp" => MathOperator.Exponential,
            "power" => MathOperator.Power,
            "negate" => MathOperator.Negate,
            "mod" => MathOperator.Mod,

            "max" => MathOperator.Max,
            "min" => MathOperator.Min,
            _ => throw new ArgumentOutOfRangeException()
        };
    }

    public static string GetOperatorString(this MathOperator @operator)
    {
        return @operator switch
        {
            MathOperator.Log => "log",
            MathOperator.Sin => "sin",
            MathOperator.Cos => "cos",
            MathOperator.SquareRoot => "sqrt",
            MathOperator.Tan => "tan",
            MathOperator.Add => "add",
            MathOperator.Subtract => "subtract",
            MathOperator.Multiply => "multiply",
            MathOperator.Divide => "divide",
            MathOperator.Abs => "abs",
            MathOperator.Exponential => "exp",
            MathOperator.Power => "power",
            MathOperator.Negate => "negate",
            MathOperator.Mod => "mod",

            MathOperator.Max => "max",
            MathOperator.Min => "min",
            _ => throw new ArgumentOutOfRangeException()
        };
    }
}