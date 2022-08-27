using server.Pipelines;

namespace server.Components;

public class ComponentInformationAdaptor
{

    public static Component GetComponentFromInformation(ComponentInformation information)
    {
        // return new component by type
        throw new NotImplementedException();
    }

    public static void setPreviousNextComponents(Pipeline pipeline, List<ComponentInformation> informations)
    {
        foreach (var information in informations)
        {
            
        }
    }


    public static ComponentInformation GetInformationFromComponent(Component component)
    {
        return new ComponentInformation(component);
    }
}