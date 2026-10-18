import "./brand.css";
import { DemoBanner, Footer, Header, WhatsAppButton } from "@/components/site/SiteChrome";

// Design option 1: Arc blocks on the green and ginger brand layer.
export default function OptionOneLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <DemoBanner />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
