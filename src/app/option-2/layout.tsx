import { Banner, Header } from "@/components/v2/Chrome";
import { Footer } from "@/components/v2/Footer";
import s from "@/components/v2/v2.module.css";

// Design option 2: Altitude's spacing, type sizes and layout.
export default function OptionTwoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={s.root}>
      <Banner />
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
