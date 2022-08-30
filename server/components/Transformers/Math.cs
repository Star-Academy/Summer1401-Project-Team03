using server.Enums;

namespace server.Components.Transformers;

public class Math : Transformer
{
    private const string FieldsToCalculate = "fields_to_calculate";
    private const string ShouldCreateNewColumn = "should_create_new_column";
    private const string Values = "values";
    private const string Operators = "operators";

    public Math()
    {
        Type = ComponentType.Math;
    }

    public override string GetQuery()
    {
        var selectList = GetKeysForQuery();
        return Pipeline.QueryBuilder.Select(selectList, PreviousComponents[0].GetQuery(),
            Pipeline.QueryBuilder.NewAlias());
    }

    public override List<string> GetKeys()
    {
        var keys = PreviousComponents[0].GetKeys();

        if (bool.Parse(Parameters[ShouldCreateNewColumn][0]))
            keys.Add($"{Parameters[FieldsToCalculate][0]}__{Parameters[Values][0]}");

        return keys;
    }

    private List<string> GetKeysForQuery()
    {
        var keys = PreviousComponents[0].GetKeys();
        var valForQuery = GetFunctionFromMathOperator(Parameters[FieldsToCalculate][0], Parameters[Values][0]);

        if (bool.Parse(Parameters[ShouldCreateNewColumn][0]))
            keys.Add($"{valForQuery} AS {Parameters[FieldsToCalculate][0]}__{Parameters[Values][0]}");
        else
        {
            keys[keys.IndexOf(Parameters[FieldsToCalculate][0])] = $"{valForQuery} AS {Parameters[FieldsToCalculate][0]}";
        }

        return keys;
    }


    private string GetFunctionFromMathOperator(string x, string y)
    {
        return Parameters[Operators][0].GetOperatorType() switch
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