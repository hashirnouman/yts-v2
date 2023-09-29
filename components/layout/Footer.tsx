import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex  text-midnight-blue  w-full">
      <div className=" flex flex-col items-center gap-[2em]   w-full py-[40px] text-[11px] sm:text-[13px] md:text-[15px] lg:text-[20px]">
        <div className="flex jusitfy-center gap-[1em] font-ariel">
          <Link href="/about-us">About us</Link>
          <Link href="/contact-us">Contact us</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/terms-of-services">Terms of service</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>
        <div className="text-[18px]">
          &copy;2022 yts1.co | All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
