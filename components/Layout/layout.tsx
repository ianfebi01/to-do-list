import Navbar from "../Navbar";

type DefaultLayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Navbar />

      <main className="my-6">
        <div className="h-full flex items-center justify-center">
          <div className="container mx-4 lg:max-w-[1024px]">{children}</div>
        </div>
      </main>
    </>
  );
}
