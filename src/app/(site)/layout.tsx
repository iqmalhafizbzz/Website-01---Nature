import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { site } from "@/content/site";
import s from "@/components/site/site.module.css";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <p className={s.demo}>{site.demoBanner}</p>
      <div className={s.frame}>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </div>
    </>
  );
}
