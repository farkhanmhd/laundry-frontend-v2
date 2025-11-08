import { TabsContent } from "@/components/ui/tabs";
import { ImageForm } from "../components/image-form";
import { ProductDataForm } from "../components/product-data-form";
import { StockAdjustmentForm } from "../components/stock-adjustment-form";
import { getProductById } from "../data";

type Props = {
  params: Promise<{ id: string }>;
};

const ProductDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const product = await getProductById(id);
  return (
    <>
      <TabsContent
        className="data-[state=inactive]:hidden"
        forceMount
        value="product"
      >
        <ProductDataForm
          description={product?.description as string}
          id={id}
          name={product?.name as string}
          price={product?.price as number}
          reorderPoint={product?.reorderPoint as number}
        />
      </TabsContent>
      <TabsContent
        className="data-[state=inactive]:hidden"
        forceMount
        value="image"
      >
        <ImageForm id={product?.id as string} src={product?.image as string} />
      </TabsContent>
      <TabsContent
        className="data-[state=inactive]:hidden"
        forceMount
        value="stock"
      >
        <StockAdjustmentForm
          currentQuantity={product?.currentQuantity as number}
          id={product?.id as string}
        />
      </TabsContent>
    </>
  );
};

export default ProductDetailPage;
