import { CategoryMenu, Hero, Incentives, IntroducingSection, Newsletter, ProductsSection } from "@/components";
import ImpactStats from "@/components/ImpactStats";
import CallToAction from "@/components/CallToAction";
import WHero from "@/components/Hero";

export default function Home() {
  return (
    <>
 <WHero />
    <ImpactStats />
  
    <ProductsSection />
    <CallToAction />
    </>
  );
}
