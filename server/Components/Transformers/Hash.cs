using System.Collections;
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
        
        //TODO read table as data
        dynamic data = query;

        var hashValues = new List<string>();
        
        var a = ((IEnumerable) data).Cast<dynamic>();

        foreach (var o in a)
        {
            var dynamicController = new DynamicObjectController(o);
            hashValues.Add(GetHashString(dynamicController.GetDynamicMember(fieldToHash)));
        }
        
        throw new NotImplementedException();
    }

    public List<IComponent> PreviousComponents { get; set; }
    
    private IEnumerable<byte> GetHashArray(string str)
    {
        using (HashAlgorithm algorithm = SHA256.Create())
            return algorithm.ComputeHash(Encoding.UTF8.GetBytes(str));
    }

    private string GetHashString(object obj)
    {
        var sb = new StringBuilder();
        foreach (var b in GetHashArray(obj.ToString()))
            sb.Append(b.ToString("X2"));

        return sb.ToString();
    }
}


