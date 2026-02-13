import { ServiceDataForm } from "@/components/features/services/service-data-form";
import { ServiceImageForm } from "@/components/features/services/service-image-form";
import { TabsContent } from "@/components/ui/tabs";
import { type Service, ServicesApi } from "@/lib/modules/services/data";

type Props = {
  params: Promise<{ id: string }>;
};

const ServiceDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const service = (await ServicesApi.getServiceById(id)) as Service;
  return (
    <>
      <TabsContent
        className="data-[state=inactive]:hidden"
        forceMount
        value="service"
      >
        <ServiceDataForm
          description={service.description}
          id={id}
          name={service.name}
          price={service.price}
        />
      </TabsContent>
      <TabsContent
        className="data-[state=inactive]:hidden"
        forceMount
        value="image"
      >
        <ServiceImageForm id={service.id} src={service.image as string} />
      </TabsContent>
    </>
  );
};

export default ServiceDetailPage;
