import Feedback from '@/components/section/feedback'
import ProductCard from '@/components/ui/cards/productCard'
import SectionTitle from '@/components/ui/sectionTitle'

export const metadata = {
    title: "Kalpana Struct-Con -- Product Archive",
    description: "Kalpana Struct-Con is a next js and tailwind css website",
};

async function getConstructionData() {
    const res = await fetch("https://kscplcms.cubeone.in/api/construction-main-page?populate[mainPage][populate]=*", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch construction data");
    return res.json();
}

const ProductArchive = async () => {
    const apiData = await getConstructionData();
    const { mainPage } = apiData.data;
  
    // Build productData dynamically using API mainPage fields
    const productData = [
        { id: 1, product_name: "Commercial", product_img: mainPage.commercial.url, width: 800, height: 600 },
        { id: 2, product_name: "Infrastructure", product_img: mainPage.infrastructure.url, width: 800, height: 600 },
        { id: 3, product_name: "Institutional", product_img: mainPage.institutional.url, width: 800, height: 600 },
        { id: 4, product_name: "Residential and Commercial", product_img: mainPage.residentialAndCommercial.url, width: 800, height: 600 },
        { id: 5, product_name: "Residential", product_img: mainPage.residential.url, width: 800, height: 600 },
        { id: 6, product_name: "Show all", product_img: mainPage.showAll.url, width: 800, height: 600 },
    ];

    return (
        <>
            <section>
                <div className='container-fluid'>
                    <SectionTitle 
                      sectionName={mainPage.backgroundTitle} 
                      sectionTitle={mainPage.title} 
                      sectionDesc={mainPage.subtitle}
                    />
                </div>
                <div className='container mt-30'>
                    <div className='grid lg:grid-cols-3 2sm:grid-cols-2 gap-x-7 gap-y-17.5 mb-25'>
                        {
                            productData.map(({ id, product_img, product_name, width, height }) => 
                                <ProductCard key={id} id={id} product_img={product_img} product_name={product_name} width={width} height={height} />
                            )
                        }
                    </div>
                </div>
            </section>
            <Feedback />
        </>
    )
}

export default ProductArchive;