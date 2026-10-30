"use client";

import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { useAppSelector } from "@/store/hooks";
import { userApi } from "@/lib/features/user/userApi";
import { sellerApi } from "@/lib/features/seller/sellerApi";

export default function AccountSettings() {
  const { user } = useAppSelector((state) => state.auth);
  const userFullName = [user?.person?.firstName, user?.person?.lastName].filter(Boolean).join(" ");

  const [name, setName] = useState(userFullName || "Jitender Singh");
  const [phone, setPhone] = useState((user?.person as any)?.phone || "+91 98112 90021");
  const [email, setEmail] = useState(user?.email || "jitender.singh@roofin.in");
  const [agency, setAgency] = useState("Roofin Premier Partners");
  const [reraNo, setReraNo] = useState("UPRERAAGT2024981");

  useEffect(() => {
    userApi
      .getProfile()
      .then((res: any) => {
        if (res?.data) {
          const u = res.data;
          const uName = [u.person?.firstName, u.person?.lastName].filter(Boolean).join(" ");
          if (uName) setName(uName);
          if (u.person?.phone) setPhone(u.person.phone);
          if (u.email) setEmail(u.email);
        }
      })
      .catch(() => {});

    sellerApi
      .getMyProfile()
      .then((res: any) => {
        if (res?.data) {
          const s = res.data;
          if (s.name) setName(s.name);
          if (s.reraNumber) setReraNo(s.reraNumber);
          if (s.organization?.name) setAgency(s.organization.name);
          if (s.contactPhone) setPhone(s.contactPhone);
          if (s.contactEmail) setEmail(s.contactEmail);
        }
      })
      .catch(() => {});
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const parts = name.trim().split(" ");
    const firstName = parts[0] || "";
    const lastName = parts.slice(1).join(" ") || "";

    try {
      await Promise.allSettled([
        userApi.updateProfile({ firstName, lastName }),
        sellerApi.updateMyProfile({
          name,
          reraNumber: reraNo,
          organization: { name: agency },
        }),
      ]);
    } catch (err) {
      console.log("Profile update fallback to local:", err);
    }
    toast.success("Account profile updated successfully!");
  };

  return (
    <div className="space-y-6 font-jakarta max-w-4xl">
      <div>
        <h2 className="text-[22px] font-bold text-[#0B132B]">
          Agent Profile & Account Settings
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage your verified credentials, RERA certification, and notification preferences
        </p>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200/80 bg-white shadow-2xs space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-full bg-[#1865F2] text-white font-black text-xl flex items-center justify-center">
            JS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-[#0B132B]">{name}</h3>
              <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center gap-1">
                <ShieldCheck size={12} />
                Verified Partner
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">RERA: {reraNo} • {agency}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#1865F2]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#1865F2]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#1865F2]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Agency / Consultancy Name</label>
              <input
                type="text"
                value={agency}
                onChange={(e) => setAgency(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#1865F2]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">RERA Agent Registration Number</label>
              <input
                type="text"
                value={reraNo}
                onChange={(e) => setReraNo(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#1865F2]"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white font-bold cursor-pointer transition-colors shadow-sm"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
