import Navbar from "../Navbar";

type DefaultLayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: DefaultLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="py-6  flex flex-col grow-[1] items-stretch bg-gray-light">
        <div className=" flex justify-center grow-[1] ">
          <div className="container mx-4 lg:max-w-[1024px] flex flex-col grow-[1] ">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
