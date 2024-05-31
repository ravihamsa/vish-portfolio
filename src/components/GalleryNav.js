"use client";
import { useRouter } from "next/navigation";

export default function GalleryNav({ prevUrl, nextUrl }) {
  const router = useRouter();
  return (
    <div className="w-full flex justify-between py-4">
      <button
        onClick={() => {
          router.push(prevUrl, { replace: true });
        }}
        disabled={prevUrl === null}
        className="disabled:opacity-0"
      >
        <svg
          width="18"
          height="15"
          viewBox="0 0 18 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 1L1.5 7.5L8 14" stroke="#7F7F7F" strokeWidth="1.5" />
          <line
            x1="2"
            y1="7.25"
            x2="18"
            y2="7.25"
            stroke="#7F7F7F"
            strokeWidth="1.5"
          />
        </svg>
      </button>
      <button
        onClick={() => {
          router.push(nextUrl);
        }}
        disabled={nextUrl === null}
        className="disabled:opacity-0"
      >
        <svg
          width="19"
          height="15"
          viewBox="0 0 19 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.5 1L17 7.5L10.5 14" stroke="#7F7F7F" strokeWidth="1.5" />
          <line
            y1="-0.75"
            x2="16"
            y2="-0.75"
            transform="matrix(-1 0 0 1 16.5 8)"
            stroke="#7F7F7F"
            strokeWidth="1.5"
          />
        </svg>
      </button>
    </div>
  );
}
