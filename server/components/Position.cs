namespace server.components;

public class Position
{
    public Position(double x, double y)
    {
        X = x;
        Y = y;
    }

    private double X { get; }

    private double Y { get; }
}