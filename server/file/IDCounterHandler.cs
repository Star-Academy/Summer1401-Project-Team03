namespace server.file;

public static class IdCounterHandler
{
    public static int LoadPipeLineId()
    {
        return int.Parse(
            File.ReadAllLines(Path.Combine(Environment.CurrentDirectory, "resources", "IDs", "PipelineID"))[0]);
    }

    public static int LoadComponentId()
    {
        return int.Parse(
            File.ReadAllLines(Path.Combine(Environment.CurrentDirectory, "resources", "IDs", "ComponentID"))[0]);
    }

    public static int LoadFileId()
    {
        return int.Parse(
            File.ReadAllLines(Path.Combine(Environment.CurrentDirectory, "resources", "IDs", "FileID"))[0]);
    }

    public static void SavePipelineId(int id)
    {
        File.WriteAllText(Path.Combine(Environment.CurrentDirectory, "resources", "IDs", "PipelineID"), id.ToString());
    }

    public static void SaveComponentId(int id)
    {
        File.WriteAllText(Path.Combine(Environment.CurrentDirectory, "resources", "IDs", "ComponentID"), id.ToString());
    }

    public static void SaveFileId(int id)
    {
        File.WriteAllText(Path.Combine(Environment.CurrentDirectory, "resources", "IDs", "FileID"), id.ToString());
    }
}