namespace server.Components;

public class Position
{
    public Position(double x, double y)
    {
        X = x;
        Y = y;
    }

    public double X { set; get; }

    public double Y { set; get; }
}