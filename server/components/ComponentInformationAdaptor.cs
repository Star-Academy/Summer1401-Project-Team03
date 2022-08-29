using server.Pipelines;

namespace server.Components;

public static class ComponentInformationAdaptor
{
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