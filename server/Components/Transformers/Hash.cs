using System.Collections;
using System.Security.Cryptography;
using System.Text;
using server.Components;
using server.Components.Transformers;
using server.Pipelines;
using SqlKata;

namespace server.Transform;

public class Hash : Transformer
{
    public Hash(Pipeline pipeline) : base(pipeline)
    {
    }

    private string fieldToHash { get; set; }
    private bool ShouldCreateNewField { get; set; }
    private string newFieldName { get; set; }


    public override string GetQuery()
    {
        var query = new Query(PreviousComponents[0].GetQuery());

        //TODO read table as data
        dynamic data = query;

        var hashValues = new List<string>();

        var a = ((IEnumerable)data).Cast<dynamic>();

        foreach (var o in a)
        {
            var dynamicController = new DynamicObjectController(o);
            hashValues.Add(GetHashString(dynamicController.GetDynamicMember(fieldToHash)));
        }

        throw new NotImplementedException();
    }

    private IEnumerable<byte> GetHashArray(string str)
    {
        using (HashAlgorithm algorithm = SHA256.Create())
        {
            return algorithm.ComputeHash(Encoding.UTF8.GetBytes(str));
        }
    }

    private string GetHashString(object obj)
    {
        var sb = new StringBuilder();
        foreach (var b in GetHashArray(obj.ToString()))
            sb.Append(b.ToString("X2"));

        return sb.ToString();
    }
}