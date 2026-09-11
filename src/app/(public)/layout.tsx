import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ReadingProgress } from "@/components/shared/ReadingProgress";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: Readonly<PublicLayoutProps>) {
  return (
    <>
      <ReadingProgress />
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
