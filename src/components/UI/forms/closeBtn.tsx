"use client";

import { useRouter } from "next/navigation";

const CloseBtn = () => {
  const router = useRouter();

  return (
    <div
      className="cursor-pointer absolute top-10 right-10 rotate-45 transition-transform duration-300 hover:rotate-135 hover:scale-110 text-5xl text-white"
      onClick={() => router.back()}
    >
      +
    </div>
  );
};

export default CloseBtn;