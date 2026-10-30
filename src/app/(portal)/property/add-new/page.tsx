"use client";

import { useRouter } from "next/navigation";
import { PortalPostProperty } from "@/components/post-property/PortalPostProperty";

export default function PostPropertyPage() {
  const router = useRouter();

  return (
    <PortalPostProperty
      onCancel={() => router.push("/")}
      onComplete={() => router.push("/property")}
    />
  );
}
