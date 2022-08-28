namespace server.file;

public class IDCounterHandler
{
    public static int LoadPipeLineID()
    {
        return int.Parse(
            File.ReadAllLines(Path.Combine(Environment.CurrentDirectory, "resources", "IDs", "PipelineID"))[0]);
    }

    public static int LoadComponentID()
    {
        return int.Parse(
            File.ReadAllLines(Path.Combine(Environment.CurrentDirectory, "resources", "IDs", "ComponentID"))[0]);
    }

    public static int LoadFileID()
    {
        return int.Parse(
            File.ReadAllLines(Path.Combine(Environment.CurrentDirectory, "resources", "IDs", "FileID"))[0]);
    }

    public static void SavePipelineID(int id)
    {
        File.WriteAllText(Path.Combine(Environment.CurrentDirectory, "resources", "IDs", "PipelineID"), id.ToString());
    }

    public static void SaveComponentID(int id)
    {
        File.WriteAllText(Path.Combine(Environment.CurrentDirectory, "resources", "IDs", "ComponentID"), id.ToString());
    }

    public static void SaveFileID(int id)
    {
        File.WriteAllText(Path.Combine(Environment.CurrentDirectory, "resources", "IDs", "FileID"), id.ToString());
    }
}