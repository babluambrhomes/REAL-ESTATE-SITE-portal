"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Camera,
  MapPin,
  User,
  Briefcase,
  ChevronRight,
  ChevronDown,
  Edit3,
  ShieldCheck,
  Building2,
  Globe,
  Lock,
  Upload,
  Download,
  Phone,
  Mail,
  Trash2,
  FileText,
  FileCheck,
  Users,
  X,
  Check,
  Info,
  Bell,
  Monitor,
  Smartphone,
  Eye,
  EyeOff,
  Megaphone,
  BarChart3,
  Tag,
  Share2,
  Star,
  MessageSquare,
  Clock,
  Award,
  CheckCircle2,
  Plus,
  Image as ImageIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateUser } from "@/store/slice/authSlice";
import { userApi } from "@/lib/features/user/userApi";
import { sellerApi } from "@/lib/features/seller/sellerApi";

export default function AccountSettings() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const userFullName =
    [user?.person?.firstName, user?.person?.lastName].filter(Boolean).join(" ") ||
    user?.email ||
    "";
  const userEmail = user?.email || "";
  const userPhone = user?.phone || "";


  const [activeTab, setActiveTab] = useState<
    | "my-profile"
    | "personal-info"
    | "business-info"
    | "verification"
    | "public-profile"
    | "security"
  >("public-profile");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const paramTab = new URLSearchParams(window.location.search).get("tab");
      if (
        paramTab &&
        [
          "my-profile",
          "personal-info",
          "business-info",
          "verification",
          "public-profile",
          "security",
        ].includes(paramTab)
      ) {
        setActiveTab(paramTab as any);
      }
    }
  }, []);

  // Security form state (Figma 1:1)
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Notification toggles (Figma 1:1)
  const [notifLeads, setNotifLeads] = useState(true);
  const [notifListings, setNotifListings] = useState(true);
  const [notifProductUpdates, setNotifProductUpdates] = useState(true);
  const [notifMarketing, setNotifMarketing] = useState(false);
  const [notifPromos, setNotifPromos] = useState(false);

  // Form Fields (prefilled from Redux after login)
  const [fullName, setFullName] = useState(userFullName);
  const [mobileNumber, setMobileNumber] = useState(userPhone);
  const [emailAddress, setEmailAddress] = useState(userEmail);
  const [altContact, setAltContact] = useState("+91 9867867896");
  const [addressLine1, setAddressLine1] = useState("Sectore 76, Noida");
  const [addressLine2, setAddressLine2] = useState("Sectore 76, Noida");
  const [city, setCity] = useState("Noida");
  const [stateName, setStateName] = useState("Uttar Pradesh");
  const [pincode, setPincode] = useState("201301");

  useEffect(() => {
    if (!user) return;
    if (!fullName && userFullName) setFullName(userFullName);
    if (!emailAddress && userEmail) setEmailAddress(userEmail);
    if (!mobileNumber && userPhone) setMobileNumber(userPhone);
  }, [user, userFullName, userEmail, userPhone, fullName, emailAddress, mobileNumber]);

  const [aboutBusiness, setAboutBusiness] = useState(
    "We help home buyers and investors find the right property in noida and greater nois . focus on honest advice, transparent deals, and a seamless buying experience."
  );

  // Business info fields (Figma 1:1)
  const [agencyName, setAgencyName] = useState("Sharma Properties");
  const [professionalType, setProfessionalType] = useState("Independent Agent");
  const [yearsExperience, setYearsExperience] = useState("3+ Years");
  const [agencyRegNo, setAgencyRegNo] = useState("");
  const [primaryLocation, setPrimaryLocation] = useState("Noida");
  const [otherLocations, setOtherLocations] = useState<string[]>([
    "Greater Noida",
    "Greater Noida",
    "Greater Noida",
  ]);
  const [officeAddressLine1, setOfficeAddressLine1] = useState("");
  const [officeAddressLine2, setOfficeAddressLine2] = useState("");
  const [officeCity, setOfficeCity] = useState("Noida");
  const [officeState, setOfficeState] = useState("Uttar Pradesh");
  const [officePincode, setOfficePincode] = useState("201301");

  // Public Profile State (Figma 1:1)
  const [coverPhoto, setCoverPhoto] = useState<string>("/broker/bg_image.png");
  const [aboutPublicBusiness, setAboutPublicBusiness] = useState(
    "I am a real estate professional based in Noida, helping home buyers find the right residential properties. With 3+ years of experience, I focus on transparent deals, verified listings and end-to-end support from site visit to possession."
  );
  const [specializations, setSpecializations] = useState<string[]>([
    "Residential Sales",
    "New Launch Projects",
    "Ready to Move",
    "Investment",
  ]);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [languages, setLanguages] = useState<string[]>(["English", "Hindi"]);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [previewSubTab, setPreviewSubTab] = useState<string>("About");

  // Legacy fields preserved
  const [agency, setAgency] = useState("Roofin Premier Partners");
  const [reraNo, setReraNo] = useState("UPRERAAGT2024981");
  const [experience, setExperience] = useState("3+ years Experience");
  const [role, setRole] = useState("Seller/Property Professional");
  const [publicSlug, setPublicSlug] = useState("jitender-singh-properties");

  useEffect(() => {
    userApi
      .getProfile()
      .then((res: any) => {
        const profile = res?.data?.user ?? res?.data;
        if (profile) dispatch(updateUser(profile));
      })
      .catch(() => {});

    sellerApi
      .getMyProfile()
      .then((res: any) => {
        if (res?.data) {
          const s = res.data;
          if (s.reraNumber) setReraNo(s.reraNumber);
          if (s.organization?.name) setAgency(s.organization.name);
        }
      })
      .catch(() => {});
  }, []);

  const handleSave = async (e?: React.FormEvent, nextTab?: any) => {
    if (e) e.preventDefault();
    const parts = fullName.trim().split(" ");
    const firstName = parts[0] || "";
    const lastName = parts.slice(1).join(" ") || "";

    try {
      await Promise.allSettled([
        userApi.updateProfile({ firstName, lastName }),
        sellerApi.updateMyProfile({
          name: fullName,
          reraNumber: reraNo,
          organization: { name: agency },
        }),
      ]);
    } catch {
      // Local fallback
    }
    dispatch(updateUser({ person: { ...(user?.person ?? {}), firstName, lastName } }));
    toast.success("Personal information saved successfully!");
    if (nextTab) {
      setActiveTab(nextTab);
    }
  };

  const STEPPER_ITEMS = [
    { id: "my-profile", num: "1", label: "My Profile" },
    { id: "personal-info", num: "2", label: "Personal information" },
    { id: "business-info", num: "3", label: "Business Information" },
    { id: "verification", num: "4", label: "Verification" },
    { id: "public-profile", num: "5", label: "Public profile" },
    { id: "security", num: "6", label: "Account & Security" },
  ] as const;

  return (
    <div className="space-y-6 font-jakarta pb-12 antialiased">
      {/* 1. Header Banner Box: My Profile (Figma 1:1) */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="border-l-[3.5px] border-[#1865F2] pl-3.5 space-y-0.5">
          <h1 className="text-lg sm:text-[20px] font-bold text-[#0B132B] leading-tight">
            My Profile
          </h1>
          <p className="text-xs text-slate-500 font-normal">
            Manage Your Personal Details And Seller Information.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = ".csv,.xlsx";
              input.onchange = () => toast.success("Leads file selected for import!");
              input.click();
            }}
            className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Upload size={14} className="text-slate-500" />
            <span>Import Leads</span>
          </button>

          <button
            type="button"
            onClick={() => {
              toast.success("Exporting profile data...");
            }}
            className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Download size={14} className="text-slate-500" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* 2. Numbered Stepper Tabs (Figma 1:1) */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 sm:p-4 shadow-2xs flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
        {STEPPER_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className="flex items-center gap-2.5 shrink-0 py-1.5 px-3 rounded-lg transition-all cursor-pointer hover:bg-slate-50/70"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ${
                  activeTab !== "my-profile" || item.id === "my-profile"
                    ? "bg-[#1865F2] text-white"
                    : "bg-[#475569] text-white"
                }`}
              >
                {item.num}
              </div>
              <span
                className={`text-xs whitespace-nowrap ${
                  isActive
                    ? "font-bold text-[#0B132B]"
                    : "font-medium text-slate-700"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          VIEW 1: MY PROFILE OVERVIEW (FIGMA 1:1 WITH CRISP BORDER RADIUS)
         ========================================================================= */}
      {activeTab === "my-profile" && (
        <div className="space-y-6">
          {/* Profile Summary Card */}
          <div className="rounded-xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-2xs flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Left: Avatar & Personal Specs */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 flex-1 min-w-0 w-full sm:w-auto">
              {/* Photo with Camera Badge */}
              <div className="relative w-24 h-24 rounded-full shrink-0">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-100 shadow-xs relative">
                  <Image
                    src="/broker/jitender_singh_figma.jpg"
                    alt={fullName}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.onchange = () => toast.success("New profile picture updated!");
                    input.click();
                  }}
                  className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#1865F2] hover:bg-blue-700 text-white flex items-center justify-center border-2 border-white shadow-xs cursor-pointer transition-colors"
                  title="Change profile picture"
                >
                  <Camera size={13} />
                </button>
              </div>

              {/* Name & Roles */}
              <div className="space-y-1 text-center sm:text-left min-w-0">
                <h2 className="text-[22px] font-bold text-[#0B132B] truncate leading-tight">
                  {fullName}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {role}
                </p>

                {/* 3 Meta Specifications */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-2 text-[11.5px] text-slate-600 font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-[#1865F2]" />
                    <span>{city}, {stateName}</span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <div className="flex items-center gap-1.5">
                    <Users size={13} className="text-slate-600" />
                    <span>Independent Agent</span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <div className="flex items-center gap-1.5">
                    <Briefcase size={13} className="text-slate-600" />
                    <span>{experience}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle: Profile Completion */}
            <div className="flex items-start gap-6 border-t lg:border-t-0 lg:border-l border-slate-200/80 pt-5 lg:pt-0 lg:pl-8 w-full lg:w-auto">
              <div className="space-y-1.5 max-w-xs">
                <span className="text-xs font-bold text-[#0B132B] block">
                  Profile completion
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-40 sm:w-48 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="w-[78%] h-full bg-[#1865F2] rounded-full" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">78%</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug mt-1">
                  Complete your profile to get more leads and increase your visibility on Roofin.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab("personal-info")}
                  className="text-xs font-bold text-[#1865F2] hover:underline inline-block pt-0.5 cursor-pointer"
                >
                  Complete now →
                </button>
              </div>
            </div>

            {/* Right: Edit Profile Button */}
            <div className="shrink-0 w-full sm:w-auto flex justify-end">
              <button
                type="button"
                onClick={() => setActiveTab("personal-info")}
                className="px-5 py-2.5 rounded-lg bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
              >
                <Edit3 size={14} />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          {/* Profile Sections Header & 5 Stacked Cards */}
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#0B132B]">
                Profile Sections
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Keep Your Profile Up To Date To Build Trust With Buyers And Get More Leads.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: "personal-info",
                  title: "Personal information",
                  desc: "Manage Your Name, Contact Details And Profile Photo.",
                  bg: "bg-[#EFF6FF]",
                  iconSrc: "/icon/hero/personal-info.png",
                },
                {
                  id: "business-info",
                  title: "Business Information",
                  desc: "Add Your Agency Name, Professional Type, Experience And Operating Locations.",
                  bg: "bg-[#FFF7ED]",
                  iconSrc: "/icon/hero/business-info.png",
                },
                {
                  id: "verification",
                  title: "Verification",
                  desc: "Verify Your Mobile Number, Email Address And Business Details.",
                  bg: "bg-[#ECFDF5]",
                  iconSrc: "/icon/hero/verification.png",
                },
                {
                  id: "public-profile",
                  title: "Public Profile",
                  desc: "Preview And Manage How Your Professional Profile Appears To Buyers On Roofin.",
                  bg: "bg-[#F3E8FF]",
                  iconSrc: "/icon/hero/public-profile.png",
                },
                {
                  id: "security",
                  title: "Account & Security",
                  desc: "Manage Your Password, Login Security And Account Preferences.",
                  bg: "bg-[#FEE2E2]",
                  iconSrc: "/icon/hero/account-security.png",
                },
              ].map((sec) => (
                <div
                  key={sec.id}
                  onClick={() => setActiveTab(sec.id as any)}
                  className="w-full p-4 sm:p-4.5 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center justify-between gap-4 cursor-pointer group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 p-2 ${sec.bg}`}
                    >
                      <Image
                        src={sec.iconSrc}
                        alt={sec.title}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[13.5px] font-bold text-[#0B132B] group-hover:text-[#1865F2] transition-colors truncate">
                        {sec.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">
                        {sec.desc}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    size={16}
                    className="text-slate-400 group-hover:text-[#1865F2] transition-colors shrink-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: 2. PERSONAL INFORMATION (FIGMA 1:1 SCREENSHOT media_1794914211202_07b79eb8.jpg)
         ========================================================================= */}
      {activeTab === "personal-info" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-2xs space-y-6">
            {/* Header */}
            <div>
              <h2 className="text-[20px] sm:text-[22px] font-bold text-[#0B132B]">
                2. Personal Information
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Add your name, contact details and profile photo.
              </p>
            </div>

            {/* Profile Photo Row (Figma 1:1) */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-1">
              {/* Photo with camera icon badge */}
              <div className="relative w-20 h-20 rounded-full shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-100 shadow-xs relative">
                  <Image
                    src="/broker/jitender_singh_figma.jpg"
                    alt={fullName}
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.onchange = () => toast.success("New profile picture updated!");
                    input.click();
                  }}
                  className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#1865F2] hover:bg-blue-700 text-white flex items-center justify-center border-2 border-white shadow-xs cursor-pointer"
                >
                  <Camera size={11} />
                </button>
              </div>

              {/* Upload & Remove Buttons */}
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.onchange = () => toast.success("Photo selected!");
                    input.click();
                  }}
                  className="px-4 py-1.5 rounded-lg border border-[#1865F2] hover:bg-blue-50 text-[#1865F2] text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Upload size={13} />
                  <span>Upload New Photo</span>
                </button>

                <button
                  type="button"
                  onClick={() => toast.success("Profile photo removed")}
                  className="px-4 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-500 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Trash2 size={13} />
                  <span>Remove Photo</span>
                </button>
              </div>

              {/* Recommendation Note */}
              <div className="text-xs text-slate-700 font-medium sm:pl-2">
                <span>• Recommended: square image, at least 400*400px.jpg,png up to 5 mb.</span>
              </div>
            </div>

            {/* Input Form Fields (2 Columns) */}
            <form onSubmit={handleSave} className="space-y-4 pt-2 text-xs">
              {/* Row 1: Full Name & Mobile Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
                    Full Name<span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                    />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full h-11 pl-9 pr-3 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1865F2] bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
                    Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                    />
                    <input
                      type="text"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full h-11 pl-9 pr-3 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1865F2] bg-white transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Email Address & Alternative Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
                    Email Address<span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                    />
                    <input
                      type="email"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="w-full h-11 pl-9 pr-3 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1865F2] bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
                    Alternative Contact<span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                    />
                    <input
                      type="text"
                      value={altContact}
                      onChange={(e) => setAltContact(e.target.value)}
                      className="w-full h-11 pl-9 pr-3 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1865F2] bg-white transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Section: Current Address */}
              <div className="pt-2">
                <h3 className="text-xs font-bold text-[#0B132B] mb-2">
                  Currenet Address
                </h3>

                {/* Address Line 1 & Line 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1.5">
                      Address Line 1 <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin
                        size={14}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                      />
                      <input
                        type="text"
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                        className="w-full h-11 pl-9 pr-3 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1865F2] bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1.5">
                      Address Line 2 <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin
                        size={14}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                      />
                      <input
                        type="text"
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                        className="w-full h-11 pl-9 pr-3 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1865F2] bg-white transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* City, State, Pincode (3 Columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1.5">
                      City<span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin
                        size={14}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                      />
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full h-11 pl-9 pr-3 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1865F2] bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1.5">
                      State<span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin
                        size={14}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                      />
                      <input
                        type="text"
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                        className="w-full h-11 pl-9 pr-3 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1865F2] bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1.5">
                      Pincode<span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin
                        size={14}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                      />
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full h-11 pl-9 pr-3 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1865F2] bg-white transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section: About your business */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  About your business
                </label>
                <div className="relative">
                  <textarea
                    rows={4}
                    value={aboutBusiness}
                    onChange={(e) => setAboutBusiness(e.target.value)}
                    className="w-full p-3.5 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1865F2] bg-white resize-none leading-relaxed"
                  />
                  <span className="block text-right text-[11px] text-slate-400 mt-1">
                    {aboutBusiness.length}/ 500 characters
                  </span>
                </div>
              </div>
            </form>
          </div>

          {/* Bottom Action Buttons (Figma 1:1) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
            <button
              type="button"
              onClick={() => setActiveTab("my-profile")}
              className="px-6 py-2.5 rounded-lg bg-[#F1F5F9] hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer w-full sm:w-auto"
            >
              ← Cancel
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => {
                  toast.success("Draft saved successfully!");
                }}
                className="px-5 py-2.5 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] hover:bg-blue-100 text-[#1865F2] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer flex-1 sm:flex-none"
              >
                <FileText size={13} />
                <span>Save as Draft</span>
              </button>

              <button
                type="button"
                onClick={() => handleSave(undefined, "business-info")}
                className="px-6 py-2.5 rounded-lg bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer flex-1 sm:flex-none"
              >
                <span>Save & Continue →</span>
              </button>
            </div>
          </div>

          {/* Bottom Step Progress Line */}
          <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden pt-0.5">
            <div className="w-[33%] h-full bg-[#1865F2] rounded-full" />
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 3: 3. BUSINESS INFORMATION (FIGMA 1:1 SCREENSHOT media_1794914564108_3abe147b.jpg)
         ========================================================================= */}
      {activeTab === "business-info" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-2xs space-y-6">
            {/* Header */}
            <div>
              <h2 className="text-[20px] sm:text-[22px] font-bold text-[#0B132B]">
                3. Business Information
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Add your agency details, professional type, experience and operating locations.
              </p>
            </div>

            <form onSubmit={(e) => handleSave(e, "verification")} className="space-y-5 text-xs">
              {/* Section 1: Agency Details */}
              <div className="space-y-3.5">
                <h3 className="text-xs font-bold text-[#0B132B]">
                  Agency Details
                </h3>

                {/* Row 1: Business/ Agency Name & Professional Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
                      Business/ Agency Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Building2
                        size={14}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                      />
                      <input
                        type="text"
                        value={agencyName}
                        onChange={(e) => setAgencyName(e.target.value)}
                        className="w-full h-11 pl-9 pr-3 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1865F2] bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
                      Professional Type <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User
                        size={14}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                      />
                      <input
                        type="text"
                        value={professionalType}
                        onChange={(e) => setProfessionalType(e.target.value)}
                        className="w-full h-11 pl-9 pr-3 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1865F2] bg-white transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Years of Experience & Agency Registration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
                      Years of Experience <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Briefcase
                        size={14}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                      />
                      <input
                        type="text"
                        value={yearsExperience}
                        onChange={(e) => setYearsExperience(e.target.value)}
                        className="w-full h-11 pl-9 pr-3 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1865F2] bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
                      Agency Registration (Optional)<span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <FileCheck
                        size={14}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                      />
                      <input
                        type="text"
                        value={agencyRegNo}
                        placeholder="Enter Registration Number (Eg. GT/RERA)"
                        onChange={(e) => setAgencyRegNo(e.target.value)}
                        className="w-full h-11 pl-9 pr-3 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1865F2] bg-white transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Current Address (Operating Locations) */}
              <div className="space-y-3.5 pt-1">
                <h3 className="text-xs font-bold text-[#0B132B]">
                  Currenet Address
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
                      Primary operating location <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin
                        size={14}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                      />
                      <input
                        type="text"
                        value={primaryLocation}
                        onChange={(e) => setPrimaryLocation(e.target.value)}
                        className="w-full h-11 pl-9 pr-3 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1865F2] bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
                      Other operating location <span className="text-rose-500">*</span>
                    </label>
                    <div className="w-full min-h-[44px] px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white flex flex-wrap items-center gap-2">
                      {otherLocations.map((loc, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-[#EAF2FF] border border-[#BFDBFE] text-[#1865F2] text-[11.5px] font-semibold flex items-center gap-1.5 shadow-2xs"
                        >
                          <span>{loc}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setOtherLocations((prev) =>
                                prev.filter((_, i) => i !== idx)
                              )
                            }
                            className="text-[#1865F2] hover:text-blue-800 cursor-pointer"
                          >
                            <X size={11} strokeWidth={2.5} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Office Address */}
              <div className="space-y-3.5 pt-1">
                <h3 className="text-xs font-bold text-[#0B132B]">
                  Office Address
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
                      Address line 1 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={officeAddressLine1}
                      onChange={(e) => setOfficeAddressLine1(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1865F2] bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
                      Address line 2
                    </label>
                    <input
                      type="text"
                      value={officeAddressLine2}
                      onChange={(e) => setOfficeAddressLine2(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1865F2] bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* City, State, Pincode (3 Columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
                      City <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin
                        size={14}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                      />
                      <input
                        type="text"
                        value={officeCity}
                        onChange={(e) => setOfficeCity(e.target.value)}
                        className="w-full h-11 pl-9 pr-3 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1865F2] bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
                      State <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={officeState}
                        onChange={(e) => setOfficeState(e.target.value)}
                        className="w-full h-11 px-3.5 pr-8 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1865F2] bg-white appearance-none cursor-pointer"
                      >
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Maharashtra">Maharashtra</option>
                      </select>
                      <ChevronDown
                        size={13}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
                      Pincode<span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin
                        size={14}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                      />
                      <input
                        type="text"
                        value={officePincode}
                        onChange={(e) => setOfficePincode(e.target.value)}
                        className="w-full h-11 pl-9 pr-3 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1865F2] bg-white transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: About your business */}
              <div className="pt-1">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  About your business
                </label>
                <div className="relative">
                  <textarea
                    rows={4}
                    value={aboutBusiness}
                    onChange={(e) => setAboutBusiness(e.target.value)}
                    className="w-full p-3.5 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1865F2] bg-white resize-none leading-relaxed"
                  />
                  <span className="block text-right text-[11px] text-slate-400 mt-1">
                    {aboutBusiness.length}/ 500 characters
                  </span>
                </div>
              </div>
            </form>
          </div>

          {/* Bottom Action Buttons (Figma 1:1) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
            <button
              type="button"
              onClick={() => setActiveTab("personal-info")}
              className="px-6 py-2.5 rounded-lg bg-[#F1F5F9] hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer w-full sm:w-auto"
            >
              ← Cancel
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => toast.success("Draft saved successfully!")}
                className="px-5 py-2.5 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] hover:bg-blue-100 text-[#1865F2] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer flex-1 sm:flex-none"
              >
                <FileText size={13} />
                <span>Save as Draft</span>
              </button>

              <button
                type="button"
                onClick={() => handleSave(undefined, "verification")}
                className="px-6 py-2.5 rounded-lg bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer flex-1 sm:flex-none"
              >
                <span>Save & Continue →</span>
              </button>
            </div>
          </div>

          {/* Bottom Step Progress Line (50% filled) */}
          <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden pt-0.5">
            <div className="w-[50%] h-full bg-[#1865F2] rounded-full" />
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 4: 4. VERIFICATION (FIGMA 1:1 SCREENSHOT media_1794914790921_af0d3fef.jpg)
         ========================================================================= */}
      {activeTab === "verification" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-2xs space-y-4">
            {/* Header */}
            <div>
              <h2 className="text-[20px] sm:text-[22px] font-bold text-[#0B132B]">
                4. Verification
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Verify Your Mobile Number, Email Address And Business Details To Build Trust With Buyers.
              </p>
            </div>

            {/* Box 1: Mobile Number */}
            <div className="p-4 sm:p-5 rounded-xl border border-slate-200/80 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-full bg-[#E6F7ED] text-[#00A35C] flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-[13.5px]">
                      Mobile Number
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#E6F7ED] text-[#00A35C] border border-[#A7F3D0] text-[10px] font-bold flex items-center gap-1">
                      <Check size={10} strokeWidth={3} />
                      Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Use For Login , Important Notification And Buyer Communication.
                  </p>
                  <p className="text-xs font-bold text-slate-900 pt-0.5">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toast.success("Enter new mobile number to change")}
                className="px-5 py-2.5 rounded-lg border border-[#BFDBFE] bg-white hover:bg-blue-50 text-[#1865F2] text-xs font-semibold shadow-2xs transition-colors cursor-pointer shrink-0"
              >
                Change Number
              </button>
            </div>

            {/* Box 2: Email Address */}
            <div className="p-4 sm:p-5 rounded-xl border border-slate-200/80 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-full bg-[#E6F7ED] text-[#00A35C] flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-[13.5px]">
                      Email Address
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#E6F7ED] text-[#00A35C] border border-[#A7F3D0] text-[10px] font-bold flex items-center gap-1">
                      <Check size={10} strokeWidth={3} />
                      Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Use For Notification, Account Recovery And Important Updates.
                  </p>
                  <p className="text-xs font-bold text-slate-900 pt-0.5">
                    Jitender.Singh@Gmail.Com
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toast.success("Enter new email address to change")}
                className="px-5 py-2.5 rounded-lg border border-[#BFDBFE] bg-white hover:bg-blue-50 text-[#1865F2] text-xs font-semibold shadow-2xs transition-colors cursor-pointer shrink-0"
              >
                Change Email
              </button>
            </div>

            {/* Box 3: Business Details Verification (With Document Required Box) */}
            <div className="p-4 sm:p-5 rounded-xl border border-slate-200/80 bg-white space-y-3.5 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-full bg-[#FEF6EB] text-[#F59E0B] flex items-center justify-center shrink-0">
                    <ShieldCheck size={22} className="text-[#F59E0B]" />
                  </div>
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-[#FEE2E2] text-[#EF4444] border border-[#FECACA] text-[10.5px] font-bold flex items-center gap-1">
                        <X size={10} strokeWidth={3} />
                        Not Verified
                      </span>
                    </div>
                    <p className="text-xs text-slate-800 font-medium">
                      Verify Your Business Details To Get A Verified Badge And Build Trust With Buyers.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toast.success("Opening business verification...")}
                  className="px-6 py-2.5 rounded-lg bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer shrink-0"
                >
                  Verify Now
                </button>
              </div>

              {/* Light blue sub-card for Document Required */}
              <div className="rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] p-4 sm:p-4.5 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1865F2]">
                  <div className="w-4 h-4 rounded-full bg-[#1865F2] text-white flex items-center justify-center text-[10px] font-black">
                    i
                  </div>
                  <span>Document Required</span>
                </div>
                <ul className="text-xs text-slate-600 pl-6 space-y-1 leading-relaxed">
                  <li>• Government ID (Aadhaar /PAN)</li>
                  <li>• Business Registration (GST /RERA) ( If Possible)</li>
                  <li>• Office Address Proof (Electricity Bill/ Rent Agreement)</li>
                </ul>
              </div>
            </div>

            {/* Box 4: Professional Verification (Optional) */}
            <div className="p-4 sm:p-5 rounded-xl border border-slate-200/80 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs hover:border-slate-300 transition-colors">
              <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-full bg-[#EFF6FF] text-[#1865F2] flex items-center justify-center shrink-0">
                  <ShieldCheck size={22} className="text-[#1865F2]" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-[13.5px]">
                      Professional Verification
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-medium">
                      Optional
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Get A Verified Professional Badge To Increase Your Visibility On Roofin
                  </p>
                  <ul className="text-xs text-slate-500 pt-0.5 space-y-0.5">
                    <li>• Experience Proof (Optional)</li>
                    <li>• Office Photos (Optional)</li>
                  </ul>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toast.success("Opening professional verification...")}
                className="px-5 py-2.5 rounded-lg border border-[#BFDBFE] bg-white hover:bg-blue-50 text-[#1865F2] text-xs font-semibold shadow-2xs transition-colors cursor-pointer shrink-0"
              >
                Add Details
              </button>
            </div>
          </div>

          {/* Bottom Action Buttons (Figma 1:1) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
            <button
              type="button"
              onClick={() => setActiveTab("business-info")}
              className="px-6 py-2.5 rounded-lg bg-[#F1F5F9] hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer w-full sm:w-auto"
            >
              ← Cancel
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => toast.success("Draft saved successfully!")}
                className="px-5 py-2.5 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] hover:bg-blue-100 text-[#1865F2] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer flex-1 sm:flex-none"
              >
                <FileText size={13} />
                <span>Save as Draft</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  toast.success("Verification details updated!");
                  setActiveTab("public-profile");
                }}
                className="px-6 py-2.5 rounded-lg bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer flex-1 sm:flex-none"
              >
                <span>Save & Continue →</span>
              </button>
            </div>
          </div>

          {/* Bottom Step Progress Line (66% filled) */}
          <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden pt-0.5">
            <div className="w-[66%] h-full bg-[#1865F2] rounded-full" />
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 5: 5. PUBLIC PROFILE (FIGMA 1:1 SCREENSHOT media_1794917372046_6e2b3dc5.jpg)
         ========================================================================= */}
      {activeTab === "public-profile" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-2xs space-y-6">
            {/* Header */}
            <div>
              <h2 className="text-[20px] sm:text-[22px] font-bold text-[#0B132B]">
                5. Public profile
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Preview And Manage How Your Professional Profile Appears To Buyers On Roofin.
              </p>
            </div>

            {/* 2-Column Grid: Form Inputs vs Profile Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-xs">
              {/* LEFT COLUMN: Form Controls (5 Cols) */}
              <div className="lg:col-span-5 space-y-4">
                {/* 1. Profile Cover */}
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold text-[#0B132B]">Profile Cover</h3>
                  <p className="text-[11px] text-slate-500">
                    Add a cover image to make your profile more professional.
                  </p>
                  <div
                    onClick={() => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = "image/*";
                      input.onchange = () => toast.success("Cover image uploaded!");
                      input.click();
                    }}
                    className="rounded-lg border border-dashed border-[#93C5FD] bg-[#EFF6FF] p-6 text-center cursor-pointer hover:bg-blue-50/80 transition-colors flex flex-col items-center justify-center gap-1.5"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#1865F2]">
                      <ImageIcon size={18} />
                    </div>
                    <span className="text-xs font-bold text-[#1865F2]">
                      Upload cover image
                    </span>
                    <span className="text-[10px] text-slate-500">
                      JPG , PNG or WEPB (Recommended size 1920px*276px)
                    </span>
                  </div>
                </div>

                {/* 2. About My Business */}
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold text-[#0B132B]">About My Business</h3>
                  <p className="text-[11px] text-slate-500">
                    Write a short introduction about yourself and your services.
                  </p>
                  <textarea
                    rows={4}
                    value={aboutPublicBusiness}
                    onChange={(e) => setAboutPublicBusiness(e.target.value)}
                    className="w-full p-3 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1865F2] bg-white resize-none leading-relaxed"
                  />
                  <span className="block text-right text-[10.5px] text-slate-400">
                    {aboutPublicBusiness.length}/500 characters
                  </span>
                </div>

                {/* 3. Specializations */}
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold text-[#0B132B]">Specializations</h3>
                  <p className="text-[11px] text-slate-500">
                    Select up to 5 specializations to highlight on your profile.
                  </p>
                  <div className="w-full min-h-[44px] p-2 rounded-lg border border-slate-200 bg-white flex flex-wrap items-center gap-2">
                    {specializations.map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-[#EFF6FF] border border-[#BFDBFE] text-[#1865F2] text-[11px] font-semibold flex items-center gap-1.5 shadow-2xs"
                      >
                        <span>{spec}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setSpecializations((prev) =>
                              prev.filter((_, i) => i !== idx)
                            )
                          }
                          className="hover:text-blue-800 cursor-pointer"
                        >
                          <X size={11} strokeWidth={2.5} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const spec = prompt("Enter specialization (e.g. Luxury Villas):");
                      if (spec) setSpecializations((prev) => [...prev, spec]);
                    }}
                    className="text-xs font-semibold text-[#1865F2] hover:underline inline-flex items-center gap-1 pt-0.5 cursor-pointer"
                  >
                    <Plus size={12} />
                    <span>Add More</span>
                  </button>
                </div>

                {/* 4. Social Profile( optional) */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-[#0B132B]">Social Profile( optional)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Linkedin Profile URL"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1865F2] bg-white"
                    />
                    <input
                      type="text"
                      placeholder="YouTube Channel URL"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1865F2] bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Instagram Profile URL"
                      value={instagramUrl}
                      onChange={(e) => setInstagramUrl(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1865F2] bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Facebook Profile URL"
                      value={facebookUrl}
                      onChange={(e) => setFacebookUrl(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1865F2] bg-white"
                    />
                  </div>
                </div>

                {/* 5. Language */}
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold text-[#0B132B]">Language</h3>
                  <p className="text-[11px] text-slate-500">
                    Select languages you are comfortable communicating in.
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    {languages.map((lang, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-[#EFF6FF] border border-[#BFDBFE] text-[#1865F2] text-[11px] font-semibold flex items-center gap-1.5 shadow-2xs"
                      >
                        <span>{lang}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setLanguages((prev) => prev.filter((_, i) => i !== idx))
                          }
                          className="hover:text-blue-800 cursor-pointer"
                        >
                          <X size={11} strokeWidth={2.5} />
                        </button>
                      </span>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const l = prompt("Enter language (e.g. Punjabi):");
                        if (l) setLanguages((prev) => [...prev, l]);
                      }}
                      className="px-2.5 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Plus size={11} />
                      <span>Add More</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Profile Preview (7 Cols) */}
              <div className="lg:col-span-7 space-y-3">
                {/* Header with Device Toggles */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-[#0B132B]">Profile Preview</h3>
                    <p className="text-[10.5px] text-slate-500">
                      This is how buyers will see your profile on Roofin.
                    </p>
                  </div>
                  <div className="flex items-center p-0.5 rounded-lg border border-slate-200 bg-slate-50/70">
                    <button
                      type="button"
                      onClick={() => setPreviewDevice("desktop")}
                      className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                        previewDevice === "desktop"
                          ? "bg-[#1865F2] text-white shadow-2xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Desktop View
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice("mobile")}
                      className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                        previewDevice === "mobile"
                          ? "bg-[#1865F2] text-white shadow-2xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Mobile View
                    </button>
                  </div>
                </div>

                {/* Profile Card Mockup (Exact 1:1 with Figma) */}
                <div
                  className={`rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs text-xs transition-all ${
                    previewDevice === "mobile" ? "max-w-[340px] mx-auto border-2 border-slate-700 shadow-lg" : ""
                  }`}
                >
                  {/* Banner */}
                  <div className="relative h-28 sm:h-32 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={coverPhoto}
                      alt="Cover"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-4 space-y-3.5">
                    {/* Top Row: Avatar + Name + Badges + Stats */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 -mt-10 relative">
                      {/* Avatar & Name */}
                      <div className="flex items-end gap-3 min-w-0">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-xs shrink-0 bg-white">
                          <Image
                            src="/broker/jitender_singh_figma.jpg"
                            alt={fullName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 pb-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 text-sm truncate">
                              {fullName}
                            </span>
                            <CheckCircle2 size={13} className="text-[#1865F2] fill-[#1865F2] text-white shrink-0" />
                          </div>
                          <span className="text-[11px] text-slate-500 block truncate">
                            Senior Property Consultant
                          </span>
                          <div className="flex items-center gap-1.5 pt-1">
                            <button
                              type="button"
                              className="px-2.5 py-0.5 rounded-md bg-[#1865F2] text-white text-[10px] font-bold shadow-2xs flex items-center gap-1"
                            >
                              <Plus size={10} strokeWidth={3} />
                              <span>Follow</span>
                            </button>
                            <button
                              type="button"
                              className="px-2 py-0.5 rounded-md border border-slate-200 bg-white text-slate-600 text-[10px] font-semibold hover:bg-slate-50"
                            >
                              Share
                            </button>
                            <button
                              type="button"
                              className="w-5 h-5 rounded-md border border-slate-200 bg-white text-slate-500 text-[10px] flex items-center justify-center hover:bg-slate-50"
                            >
                              •••
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Stats Counter */}
                      <div className="flex items-center gap-3 text-center sm:text-right shrink-0 pt-1 sm:pt-0">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">Followers</span>
                          <span className="text-xs font-black text-slate-900 block leading-tight">2,985</span>
                        </div>
                        <div className="w-px h-6 bg-slate-200" />
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">Views</span>
                          <span className="text-xs font-black text-slate-900 block leading-tight">132</span>
                        </div>
                        <div className="w-px h-6 bg-slate-200" />
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">Listing</span>
                          <span className="text-xs font-black text-slate-900 block leading-tight">500</span>
                        </div>
                        <div className="w-px h-6 bg-slate-200" />
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">Videos</span>
                          <span className="text-xs font-black text-slate-900 block leading-tight">20</span>
                        </div>
                      </div>
                    </div>

                    {/* Middle Row: Left Specs & Buttons vs Right Dealer Trust Score */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1 border-t border-slate-100">
                      {/* Left Specs */}
                      <div className="sm:col-span-7 space-y-2">
                        <div className="space-y-1 text-[11px] text-slate-600 font-medium">
                          <div className="flex items-center gap-1.5">
                            <Briefcase size={12} className="text-[#1865F2]" />
                            <span>12+ Years Of Experience</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-amber-500 font-bold">★★★★★</span>
                            <span className="font-bold text-slate-800">4.5/5</span>
                            <span className="text-slate-400">(520 Verified Reviews)</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin size={12} className="text-[#1865F2]" />
                            <span>Operating in: Noida, Greater Noida, Ghaziabad</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            className="px-3 py-1.5 rounded-lg bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-[11px] shadow-2xs transition-colors cursor-pointer"
                          >
                            Contact Broker
                          </button>
                          <button
                            type="button"
                            className="px-3 py-1.5 rounded-lg border border-[#1865F2] text-[#1865F2] hover:bg-blue-50 font-semibold text-[11px] transition-colors cursor-pointer"
                          >
                            Request Callback
                          </button>
                        </div>
                      </div>

                      {/* Right Dealer Trust Score */}
                      <div className="sm:col-span-5 rounded-lg border border-slate-200 bg-slate-50/60 p-2.5 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wide">
                            Roofin Dealer Trust Score
                          </span>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-black text-[#1865F2]">9.4</span>
                          <span className="text-[10px] text-slate-400 font-bold">/ 10</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-[9.5px] text-slate-600 font-medium pt-0.5">
                          <div className="flex items-center gap-1">
                            <Check size={10} className="text-emerald-600 shrink-0" strokeWidth={3} />
                            <span>RERA Verified</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Check size={10} className="text-emerald-600 shrink-0" strokeWidth={3} />
                            <span>Address Verified</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Check size={10} className="text-emerald-600 shrink-0" strokeWidth={3} />
                            <span>KYC Verified</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Check size={10} className="text-emerald-600 shrink-0" strokeWidth={3} />
                            <span>Top Performer 2024</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 8 Feature Pills / Icons Row */}
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 pt-1 text-center">
                      {[
                        { title: "12 Min", desc: "Response Time" },
                        { title: "10K+", desc: "Happy Clients" },
                        { title: "10+", desc: "Team Size" },
                        { title: "Free", desc: "Site Visit" },
                        { title: "Availability", desc: "Mon - Sun (9AM - 8PM)" },
                        { title: "Office Address", desc: "Verified" },
                        { title: "Listing", desc: "500 Active" },
                        { title: "Market", desc: "Knowledge" },
                      ].map((f, i) => (
                        <div
                          key={i}
                          className="p-1.5 rounded-lg border border-slate-100 bg-slate-50/70 space-y-0.5"
                        >
                          <span className="block text-[10px] font-bold text-[#0B132B] truncate">
                            {f.title}
                          </span>
                          <span className="block text-[8.5px] text-slate-400 truncate">
                            {f.desc}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Mini Tabs inside card */}
                    <div className="flex items-center gap-4 border-b border-slate-200 text-xs font-semibold pt-1">
                      {["Overview", "Videos", "Properties Listed", "About", "Post"].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setPreviewSubTab(t)}
                          className={`pb-2 border-b-2 text-[11px] transition-colors cursor-pointer ${
                            previewSubTab === t
                              ? "border-[#1865F2] text-[#1865F2] font-bold"
                              : "border-transparent text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    {/* About Tab Content */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1 text-[11px]">
                      {/* Left: Paragraphs */}
                      <div className="sm:col-span-8 space-y-2 text-slate-600 leading-relaxed">
                        <span className="font-bold text-slate-900 block text-xs">
                          About Jitender Singh
                        </span>
                        <p>
                          Jitender Singh is a trained property consultant associated with Roofin, helping home buyers, sellers, and investors find the right property with complete transparency and professional guidance.
                        </p>
                        <p>
                          With strong knowledge of residential plots, apartments, builder floors, and investment properties, he focuses on understanding each client's needs and providing suitable options that match their budget and location preferences.
                        </p>
                        <div className="space-y-0.5 pt-1">
                          <span className="font-bold text-slate-800 block">Services Offered:</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[10.5px]">
                            <span>• Verified Property Assistance</span>
                            <span>• Free Site Visit Support</span>
                            <span>• Property Negotiation Guidance</span>
                            <span>• Loan & Documentation Assistance</span>
                            <span>• End-To-End Buying Support</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: CTA Card + Socials + RERA */}
                      <div className="sm:col-span-4 space-y-2">
                        <div className="rounded-lg bg-[#1865F2] text-white p-3 text-center space-y-2 shadow-2xs">
                          <span className="block text-[11px] font-bold leading-tight">
                            Need Help Finding The Right Property?
                          </span>
                          <button
                            type="button"
                            className="w-full py-1.5 rounded-md bg-white text-[#1865F2] text-[10.5px] font-bold hover:bg-blue-50 transition-colors shadow-2xs cursor-pointer"
                          >
                            Chat with Jitender Singh
                          </button>
                        </div>

                        <div className="rounded-lg border border-slate-200 bg-white p-2 text-center space-y-1">
                          <span className="text-[10px] text-slate-500 block">Follow me on:</span>
                          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-600">
                            <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-[10px]">f</span>
                            <span className="w-5 h-5 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center font-bold text-[10px]">ig</span>
                            <span className="w-5 h-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold text-[10px]">yt</span>
                            <span className="w-5 h-5 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-[10px]">in</span>
                          </div>
                        </div>

                        <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-2 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <ShieldCheck size={14} className="text-emerald-600" />
                            <span className="text-[10.5px] font-bold text-emerald-800">RERA Verified</span>
                          </div>
                          <span className="text-[9.5px] font-semibold text-[#1865F2] hover:underline cursor-pointer">
                            View Certificate →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Buttons (Figma 1:1) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
            <button
              type="button"
              onClick={() => setActiveTab("verification")}
              className="px-6 py-2.5 rounded-lg bg-[#F1F5F9] hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer w-full sm:w-auto"
            >
              ← Cancel
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => toast.success("Draft saved successfully!")}
                className="px-5 py-2.5 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] hover:bg-blue-100 text-[#1865F2] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer flex-1 sm:flex-none"
              >
                <FileText size={13} />
                <span>Save as Draft</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  toast.success("Public profile saved successfully!");
                  setActiveTab("security");
                }}
                className="px-6 py-2.5 rounded-lg bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer flex-1 sm:flex-none"
              >
                <span>Save & Continue →</span>
              </button>
            </div>
          </div>

          {/* Bottom Step Progress Line (83% filled) */}
          <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden pt-0.5">
            <div className="w-[83%] h-full bg-[#1865F2] rounded-full" />
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 6: 5. ACCOUNT & SECURITY (FIGMA 1:1 SCREENSHOT media_1794915097062_4c4fcd7a.jpg)
         ========================================================================= */}
      {activeTab === "security" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-2xs space-y-6">
            {/* Header */}
            <div>
              <h2 className="text-[20px] sm:text-[22px] font-bold text-[#0B132B]">
                5. Account & security
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage Your Login Details, Security Settings And Communication Preferences.
              </p>
            </div>

            {/* 2x2 Grid of Security Boxes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 text-xs">
              {/* Box 1: Change Password & Password Requirements */}
              <div className="p-5 rounded-xl border border-slate-200/80 bg-white space-y-4 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <Lock size={15} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs">Change Password</h3>
                    <p className="text-[11px] text-slate-500">
                      Keep your account secure with a strong password.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {/* Left Column: Password Inputs */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Current Password <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Lock
                          size={13}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        />
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Enter current password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full h-10 pl-8 pr-8 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1865F2]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                        >
                          {showCurrentPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        New Password <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Lock
                          size={13}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        />
                        <input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full h-10 pl-8 pr-8 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1865F2]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                        >
                          {showNewPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Confirm New Password <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Lock
                          size={13}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full h-10 pl-8 pr-8 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1865F2]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                        >
                          {showConfirmPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Password Requirements Dark Box + Update Button */}
                  <div className="flex flex-col justify-between gap-3">
                    <div className="rounded-lg bg-[#0B132B] text-white p-3.5 space-y-2 shadow-xs">
                      <div className="flex items-center gap-1.5 text-[11.5px] font-bold text-slate-100">
                        <ShieldCheck size={13} className="text-[#10B981]" />
                        <span>Password Requirements</span>
                      </div>
                      <div className="space-y-1 text-[10.5px] text-slate-300">
                        <div className="flex items-center gap-1.5">
                          <Check size={11} className="text-slate-400" />
                          <span>At least 8 characters</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check size={11} className="text-slate-400" />
                          <span>One uppercase letter (A-Z)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check size={11} className="text-slate-400" />
                          <span>One lowercase letter (a-z)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check size={11} className="text-slate-400" />
                          <span>One number (0-9)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check size={11} className="text-slate-400" />
                          <span>One special character (!@#$%)</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toast.success("Password updated successfully!")}
                      className="w-full py-2.5 rounded-lg bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </div>

              {/* Box 2: Two-Factor Authentication */}
              <div className="p-5 rounded-xl border border-slate-200/80 bg-white space-y-4 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1865F2] flex items-center justify-center shrink-0">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs">Two-Factor Authentication</h3>
                    <p className="text-[11px] text-slate-500">
                      Add an extra layer of security to your account.
                    </p>
                  </div>
                </div>

                {/* Toggle Row */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  <div>
                    <span className="font-bold text-slate-900 text-xs block">
                      Enable 2FA
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Receive a verification code on your mobile number during login.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setTwoFactorEnabled(!twoFactorEnabled);
                      toast.success(
                        !twoFactorEnabled ? "2FA Enabled" : "2FA Disabled"
                      );
                    }}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors shrink-0 ${
                      twoFactorEnabled ? "bg-[#1865F2]" : "bg-slate-200"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        twoFactorEnabled ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Sub Box: Why enable 2FA? */}
                <div className="rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1865F2]">
                    <div className="w-4 h-4 rounded-full bg-[#1865F2] text-white flex items-center justify-center text-[10px] font-black">
                      i
                    </div>
                    <span>Why enable 2FA?</span>
                  </div>
                  <ul className="text-xs text-slate-600 pl-6 space-y-1">
                    <li>• Protect your account from unauthorized access</li>
                    <li>• Keep your property and client data safe</li>
                    <li>• Recommended for all property professionals</li>
                  </ul>
                </div>
              </div>

              {/* Box 3: Notification Preferences */}
              <div className="p-5 rounded-xl border border-slate-200/80 bg-white space-y-4 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1865F2] flex items-center justify-center shrink-0">
                    <Bell size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs">
                      Notification Preferences
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Choose what updates and alerts you want to receive.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  {[
                    {
                      label: "Property leads and enquiries",
                      icon: <Mail size={14} className="text-slate-500" />,
                      val: notifLeads,
                      toggle: () => setNotifLeads(!notifLeads),
                    },
                    {
                      label: "Updates about your listings",
                      icon: <FileText size={14} className="text-slate-500" />,
                      val: notifListings,
                      toggle: () => setNotifListings(!notifListings),
                    },
                    {
                      label: "Product updates and new features",
                      icon: <Megaphone size={14} className="text-slate-500" />,
                      val: notifProductUpdates,
                      toggle: () => setNotifProductUpdates(!notifProductUpdates),
                    },
                    {
                      label: "Marketing tips and industry insights",
                      icon: <BarChart3 size={14} className="text-slate-500" />,
                      val: notifMarketing,
                      toggle: () => setNotifMarketing(!notifMarketing),
                    },
                    {
                      label: "Promotional offers and events",
                      icon: <Tag size={14} className="text-slate-500" />,
                      val: notifPromos,
                      toggle: () => setNotifPromos(!notifPromos),
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5">
                        {item.icon}
                        <span className="text-xs font-medium text-slate-800">
                          {item.label}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={item.toggle}
                        className={`w-9 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors shrink-0 ${
                          item.val ? "bg-[#1865F2]" : "bg-slate-200"
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                            item.val ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box 4: Active Sessions & Delete Account */}
              <div className="p-5 rounded-xl border border-slate-200/80 bg-white space-y-4 shadow-2xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1865F2] flex items-center justify-center shrink-0">
                      <Monitor size={16} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-xs">Active Sessions</h3>
                      <p className="text-[11px] text-slate-500">
                        Manage devices where you are currently logged in.
                      </p>
                    </div>
                  </div>

                  {/* Device 1: Windows Chrome */}
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                        <Monitor size={15} />
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-slate-900 text-xs block truncate">
                          Windows • Chrome
                        </span>
                        <div className="flex items-center gap-1.5 text-[10.5px] text-slate-500">
                          <span>Noida, Uttar Pradesh</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                          <span className="text-emerald-600 font-semibold">Active Now</span>
                        </div>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-lg bg-[#EFF6FF] text-[#1865F2] text-[11px] font-bold shrink-0">
                      This Device
                    </span>
                  </div>

                  {/* Device 2: Samsung Chrome */}
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                        <Smartphone size={15} />
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-slate-900 text-xs block truncate">
                          Samsung • Chrome
                        </span>
                        <span className="text-[10.5px] text-slate-500 block">
                          Noida, Uttar Pradesh • 2 days ago
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toast.success("Logged out from Samsung Chrome")}
                      className="px-3 py-1 rounded-lg border border-rose-200 text-rose-500 hover:bg-rose-50 text-[11px] font-semibold transition-colors cursor-pointer shrink-0"
                    >
                      Logout
                    </button>
                  </div>
                </div>

                {/* Divider & Delete Account */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                        <Trash2 size={15} />
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-slate-900 text-xs block">
                          Delete Account
                        </span>
                        <span className="text-[11px] text-slate-500 block truncate">
                          Permanently delete your account and all associated data.
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toast.error("Account deletion requested")}
                      className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors cursor-pointer shrink-0 whitespace-nowrap"
                    >
                      Delete My Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Buttons (Figma 1:1) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
            <button
              type="button"
              onClick={() => setActiveTab("public-profile")}
              className="px-6 py-2.5 rounded-lg bg-[#F1F5F9] hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer w-full sm:w-auto"
            >
              ← Cancel
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => toast.success("Draft saved successfully!")}
                className="px-5 py-2.5 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] hover:bg-blue-100 text-[#1865F2] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer flex-1 sm:flex-none"
              >
                <FileText size={13} />
                <span>Save as Draft</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  toast.success("Security preferences saved!");
                  setActiveTab("my-profile");
                }}
                className="px-6 py-2.5 rounded-lg bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer flex-1 sm:flex-none"
              >
                <span>Save & Continue →</span>
              </button>
            </div>
          </div>

          {/* Bottom Step Progress Line (100% filled) */}
          <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden pt-0.5">
            <div className="w-[100%] h-full bg-[#1865F2] rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
}
