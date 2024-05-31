"use client";
import { usePathname, useRouter } from "next/navigation";

export default function ActiveLink({ children, href }) {
  const router = useRouter();
  const pathName = usePathname();
  const className = pathName === href ? "active" : "";
  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
