'use client'
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <div className=" min-h-screen w-full bg-gray-50 px-4 pt-6 pb-16 sm:px-6 lg:px-8" style={{
      backgroundImage: "url('/auth/auth_banner.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <header className=" px-10  ">
        <div className="">
          <div className="flex items-center gap-4">
            <Image
              src="/layout/logo.png"
              alt="AmbrHomes"
              width={80}
              sizes="(max-width: 768px) 100vw, 33vw"
              height={50}
            />
          </div>
         
        </div>
      </header>
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
}
