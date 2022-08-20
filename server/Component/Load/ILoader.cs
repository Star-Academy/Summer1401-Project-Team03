namespace server.Load;

using Component;
public interface ILoader : IComponent 
{
    public IComponent PreviousComponent { set; get; }
    
    public string FilePath { set; get; }

    public void Load(string query);
}