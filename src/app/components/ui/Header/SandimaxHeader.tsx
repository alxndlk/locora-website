import React from "react";
import s from "./SandimaxHeader.module.css";
import Image from "next/image";
import SandimaxNav from "./SandimaxNav";
import Link from "next/link";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import MobileSandimaxHeader from "./MobileSandimaxHeader";

const SandimaxHeader = ({ setOpen }: { setOpen: (value: boolean) => void }) => {
  const [isMobile, setIsMobile] = React.useState(false);

  return (
    <div className={s.header}>
      <MobileSandimaxHeader open={isMobile} setVisibility={setIsMobile} />
      <div className={s.container}>
        <div className={s.left}>
          <Link
            href="https://sandimax.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/icons/sandimax-logo-gray.png"
              alt="Sanimax Logo"
              width={512}
              height={512}
              className={s.logo}
            />
          </Link>

          <SandimaxNav />
        </div>
        <div className={s.icons}>
          <HiOutlineMenuAlt4
            size={18}
            onClick={() => (setIsMobile(true), setOpen(true))}
            className={s.menuIcon}
            style={{ opacity: 0.8 }}
          />
        </div>
      </div>
    </div>
  );
};

export default SandimaxHeader;
