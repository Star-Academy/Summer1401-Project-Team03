using server.enums;

namespace server.components.Transformers;

public class Math : Transformer
{
    private const string FieldsToCalculate = "fields";
    private const string ShouldCreateNewColumn = "should_create_new_column";
    private const string Values = "values";
    private const string Operators = "operators";

    public Math()
    {
        Type = ComponentType.Math;
    }

    public override string GetQuery()
    {
        if (!isConfigSet)
            throw new System.Configuration.ConfigurationException($"Configuration not set!component Title: {Title}, component type: {Type}, id: {Id}");

        var selectList = GetKeysForQuery();
        return Pipeline.QueryBuilder.Select(selectList, PreviousComponents[0].GetQuery(),
            Pipeline.QueryBuilder.NewAlias());
    }

    public override List<string> GetKeys()
    {
        var keys = PreviousComponents[0].GetKeys();

        for (var i = 0; i < Parameters[ShouldCreateNewColumn].Count; i++)
        {
            if (bool.Parse(Parameters[ShouldCreateNewColumn][i]))
                keys.Add($"{Parameters[FieldsToCalculate][i]}__{Parameters[Values][i]}");
        }
        
        return keys;
    }

    private List<string> GetKeysForQuery()
    {
        var keys = PreviousComponents[0].GetKeys();

        for (var i = 0; i < Parameters[FieldsToCalculate].Count; i++)
        {
            var valForQuery = GetFunctionFromMathOperator(Parameters[FieldsToCalculate][i], Parameters[Values][i], Parameters[Operators][i]);

            if (bool.Parse(Parameters[ShouldCreateNewColumn][i]))
                keys.Add($"{valForQuery} AS {Parameters[FieldsToCalculate][i]}__{Parameters[Values][i]}");
            else
            {
                keys[keys.IndexOf(Parameters[FieldsToCalculate][i])] = $"{valForQuery} AS {Parameters[FieldsToCalculate][i]}";
            }

        }
        
        return keys;
    }


    private string GetFunctionFromMathOperator(string x, string y, string @operator)
    {
        return @operator.GetOperatorType() switch
        {
            MathOperator.Log => $"LOG({x}, {y})",
            MathOperator.Sin => $"SIN({x})",
            MathOperator.Cos => $"COS({x})",
            MathOperator.SquareRoot => $"SQRT({x})",
            MathOperator.Tan => $"TAN({x})",
            MathOperator.Add => $"{x} + {y}",
            MathOperator.Subtract => $"{x} - {y}",
            MathOperator.Multiply => $"{x} * {y})",
            MathOperator.Divide => $"{x} / {y}",
            MathOperator.Abs => $"ABS({x})",
            MathOperator.Exponential => $"EXP({x})",
            MathOperator.Power => $"POWER({x}, {y})",
            MathOperator.Negate => $"-{x}",
            MathOperator.Mod => $"{x} % {y}",

            MathOperator.Max => $"{x} / {y}",
            MathOperator.Min => $"{x} / {y}",
            _ => throw new ArgumentOutOfRangeException()
        };
    }
}