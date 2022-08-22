using System.Text;
using server.Component;
using SqlKata;

namespace server.Transform;
using System.Security.Cryptography;

public class Hash : ITransformer
{
    public List<string> Keys { get; set; }
    
    private string fieldToHash { get; set; }
    private bool ShouldCreateNewField { get; set; }
    private string newFieldName { get; set; }
    
    public string GetQuery()
    {

        var query = new Query(PreviousComponents[0].GetQuery());
        
        throw new NotImplementedException();
    }

    public List<IComponent> PreviousComponents { get; set; }
    
    private byte[] GetHashArray(string Str)
    {
        using (HashAlgorithm algorithm = SHA256.Create())
            return algorithm.ComputeHash(Encoding.UTF8.GetBytes(Str));
    }

    private string GetHashString(object obj)
    {
        var sb = new StringBuilder();
        foreach (var b in GetHashArray(obj.ToString()))
            sb.Append(b.ToString("X2"));

        return sb.ToString();
    }
}


