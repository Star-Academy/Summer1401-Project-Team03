namespace server.file;

public class IDCounterHandler
{
    public static int LoadPipeLineID()
    {
        return Int32.Parse(File.ReadAllLines($@"{Environment.CurrentDirectory}\IDs\PipeLineID.txt")[0]);
    }

    public static int LoadComponentID()
    {
        return Int32.Parse(File.ReadAllLines($@"{Environment.CurrentDirectory}\IDs\ComponentID.txt")[0]);
    }
    
    public static int LoadFileID()
    {
        return Int32.Parse(File.ReadAllLines($@"{Environment.CurrentDirectory}\IDs\FileID.txt")[0]);
    }

    public static void SavePipelineID(int id)
    {
        File.WriteAllText($@"{Environment.CurrentDirectory}\IDs\PipeLineID.txt", id.ToString());
    }

    public static void SaveComponentID(int id)
    {
        File.WriteAllText($@"{Environment.CurrentDirectory}\IDs\ComponentID.txt", id.ToString());
    }

    public static void SaveFileID(int id)
    {
        File.WriteAllText($@"{Environment.CurrentDirectory}\IDs\FileID.txt", id.ToString());
    }

}