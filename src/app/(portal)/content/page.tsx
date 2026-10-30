"use client";

import Image from "next/image";
import { Download, Share2 } from "lucide-react";
import toast from "react-hot-toast";

export default function PortalContentManager() {
  return (
    <div className="space-y-6 font-jakarta">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-[22px] font-bold text-[#0B132B]">
            Marketing Collateral & Media Assets
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Download verified high-res brochures, floor plans, and social promotion templates
          </p>
        </div>
        <button
          type="button"
          onClick={() => toast.success("Opening media uploader...")}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-[#1865F2] text-white text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer"
        >
          + Upload Media Asset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            title: "The Terraces At Max 361 Brochure",
            type: "PDF Document (14.2 MB)",
            downloads: 342,
            preview: "/images/properties/tower-popular-figma.jpg",
          },
          {
            title: "ATS Knightsbridge Floor Plans (3/4 BHK)",
            type: "High-Res CAD / PDF (28 MB)",
            downloads: 512,
            preview: "/images/properties/night-tower-figma.jpg",
          },
          {
            title: "Ambr Magnolia 360° Virtual Walkthrough",
            type: "Interactive WebGL Embed",
            downloads: 189,
            preview: "/images/properties/ambr-aspire-figma.jpg",
          },
        ].map((item, idx) => (
          <div key={idx} className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="relative w-full h-36 bg-slate-100">
                <Image src={item.preview} alt={item.title} fill className="object-cover" />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/60 text-white backdrop-blur-xs">
                  {item.type}
                </span>
              </div>
              <div className="p-4">
                <h4 className="text-sm font-bold text-[#0B132B]">{item.title}</h4>
                <p className="text-[11px] text-slate-400 mt-1">{item.downloads} downloads by buyers</p>
              </div>
            </div>
            <div className="p-4 pt-0 flex items-center gap-2">
              <button
                type="button"
                onClick={() => toast.success(`Downloading ${item.title}...`)}
                className="flex-1 py-2 rounded-xl bg-[#EAF2FF] hover:bg-blue-100 text-[#1865F2] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download size={13} />
                <span>Download</span>
              </button>
              <button
                type="button"
                onClick={() => toast.success("Asset link copied to clipboard!")}
                className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <Share2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
