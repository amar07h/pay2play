import Hero from "@/components/pages/home/hero";
import FeatureProduct from "@/components/pages/home/featureProduct";
import RecentlyViewed from "@/components/pages/home/recentlyViews";
import Subcategories from "@/components/pages/product/subcategories";
import { Fragment, Suspense} from "react";
import { GetProductAds } from "@/lib/superbase/products";
import { GetProducts } from "@/lib/superbase/products";
import { homeProduct } from "@/lib/types/products";
import { Category } from "@/lib/types/layouts";
import { GetSingelCategories } from "@/lib/superbase/categories";
import Loader from "@/components/ui/loader";

export default async function Home() {

    const HeroAds:string[]|string  = await GetProductAds();
   const Featureproduct:homeProduct[] =await GetProducts("e-cartes-cadeaux",1,20);
    const categorieResponce: Category|null = await GetSingelCategories('e-cartes-cadeaux');
  return (
    <Fragment>
      {/* Pass the fetched ads to the Hero component */}
      <Suspense fallback={<Loader/>} >

        {HeroAds&&typeof(HeroAds)  !== 'string' ?
              <Hero product={HeroAds} />:null
}
      </Suspense>
       <section className="py-20 px-4 relative overflow-hidden bg-gaming-dark">
              <RecentlyViewed/>

      <div className="container mx-auto z-10 relative">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-gaming-cyan font-medium mb-2 inline-block">BROWSE CATEGORIES</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Shop By Category</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our wide range of gaming products across various categories designed to enhance your gaming performance.
          </p>
        </div>
          <div className="max-w-7xl mx-auto pt-32">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
  <Suspense fallback={"لا توجد بيانات "}>
              {categorieResponce &&categorieResponce.sub_categories?.map((c) => (
                <Fragment key={Math.random()}>
                  <Subcategories SubCategory={c} isAdmin={false} />
                </Fragment>
              ))}
            </Suspense>     
            </div>
            </div>
       </div></section>
     {/* Pass the fetched products to the FeatureProduct component */}
       <FeatureProduct product={Featureproduct} />
    </Fragment>
  );
}
