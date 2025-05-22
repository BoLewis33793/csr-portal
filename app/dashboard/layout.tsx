import NavBar from "@/components/navigation/navbar";
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row h-screen overflow-hidden bg-yellow-200">
      <div className="flex-none">
        <NavBar />
      </div>
      <div className="grow overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
