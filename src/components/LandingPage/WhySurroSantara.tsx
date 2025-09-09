import Image from "next/image";
import React from "react";

const WhySurroSantara = () => {
  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="p-10 grid grid-cols-2 gap-20">
        <div className="w-[650px]">
          <Image
            src="/images/question.svg"
            alt=""
            width={500}
            height={300}
            className="w-full"
          />
          <p className="text-primary text-[48px] font-bold">
            Why SurroSantara?
          </p>
          <p className="text-[15px] mx-auto">
            In many parts of the world, surrogacy lacks structure and is often
            controlled by costly middlemen. SurroSantara is changing that. We
            empower more women to become surrogates with dignity, while making
            it easier for intended parents to find their ideal match quickly,
            transparently, and affordably.
          </p>
        </div>
        <div className="space-y-5">
          {/* AFFORDABLE  */}
          <div className="bg-[#F0E5F6] rounded-[360px] p-[12px] flex items-center gap-5 w-[490px]">
            <p className="bg-[#753498] h-[85px] w-[85px] text-[#FFFFFF4D] text-[70px] flex items-center justify-center rounded-full font-bold">
              1
            </p>
            <div>
              <p className="text-[#753498] text-[32px] font-semibold">
                Affordable:
              </p>
              <p className="text-[15px] font-[400] text-primary">
                Transparent fees, lower than agents
              </p>
            </div>
          </div>

          {/* TRUSTED  */}
          <div className="bg-[#FAF2EF] rounded-[360px] p-[12px] flex items-center gap-5 w-[490px] ml-15">
            <p className="bg-[#9B4E31] h-[85px] w-[85px] text-[#0D141C4D] font-bold text-[70px] flex items-center justify-center rounded-full">
              2
            </p>
            <div>
              <p className="text-[#9B4E31] text-[32px] font-semibold">
                Trusted:
              </p>
              <p className="text-[15px] font-[400] text-primary">
                Verified surrogates, clinics, and parents
              </p>
            </div>
          </div>

          {/* SECURE  */}
          <div className="bg-[#EFFAF1] rounded-[360px] p-[12px] flex items-center gap-5 w-[490px]">
            <p className="bg-[#319B44] h-[85px] w-[85px] text-[#0D141C26] font-bold text-[70px] flex items-center justify-center rounded-full">
              3
            </p>
            <div>
              <p className="text-[#319B44] text-[32px] font-semibold">
                Secure:
              </p>
              <p className="text-[15px] font-[400] text-primary">
                Escrow-backed payments (Phase 2)
              </p>
            </div>
          </div>

          {/* Supportive:   */}
          <div className="bg-[#E5F6F2] rounded-[360px] p-[12px] flex items-center gap-5 w-[490px] ml-15">
            <p className="bg-[#349880] h-[85px] w-[85px] text-[#0D141C26] font-bold text-[70px] flex items-center justify-center rounded-full">
              4
            </p>
            <div>
              <p className="text-[#349880] text-[32px] font-semibold">
                Supportive:
              </p>
              <p className="text-[15px] font-[400] text-primary">
                Verified surrogates, clinics, and parents
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhySurroSantara;
