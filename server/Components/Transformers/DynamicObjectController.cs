using System.Runtime.CompilerServices;
using Microsoft.CSharp.RuntimeBinder;

namespace server.Components.Transformers;

public class DynamicObjectController
{
    private readonly object _obj;

    public DynamicObjectController(object obj)
    {
        _obj = obj;
    }


//https://stackoverflow.com/questions/5306018/how-to-call-dynamicobject-trygetmember-directly/7108263#7108263
    public object GetDynamicMember(string memberName)
    {
        var binder = Binder.GetMember(CSharpBinderFlags.None, memberName, _obj.GetType(),
            new[] {CSharpArgumentInfo.Create(CSharpArgumentInfoFlags.None, null)});
        var callsite = CallSite<Func<CallSite, object, object>>.Create(binder);
        return callsite.Target(callsite, _obj);
    }
}