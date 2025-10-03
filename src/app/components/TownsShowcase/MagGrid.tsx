import { motion } from "framer-motion";
import Image from "next/image";
import s from "./MagGrid.module.css";
import { Tile } from "@/lib/types/types";
import {
  useRevealOnView,
  useParallax,
  fadeIn,
  fadeUp,
} from "@/hooks/useMotion";
import { ICONS } from "@/constants";

export default function MagGrid({ items }: { items: Tile[] }) {
  const grid = useRevealOnView<HTMLUListElement>({ amount: 0.25 });

  const yCenter = useParallax(grid.ref, { distance: 120, distanceVH: 0.05 });
  const yLayer = useParallax(grid.ref, { distance: 60, distanceVH: 0.01 });

  return (
    <motion.ul
      ref={grid.ref}
      className={s.grid}
      variants={fadeIn}
      initial={grid.initial}
      animate={grid.controls}
    >
      <motion.div className={s.big_wrap} style={{ y: yCenter }}>
        <Image
          className={s.big}
          width={1024}
          height={1024}
          src={ICONS.home_screen}
          alt={ICONS.home_screen}
          loading="lazy"
        />
      </motion.div>

      <motion.div
        className={s.absolute_images}
        style={{ y: yLayer }}
        variants={{
          show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
        }}
      >
        {items.map((item, index) => (
          <motion.div key={index} className={s.item_wrap} variants={fadeUp}>
            <Image
              className={s.item}
              width={1024}
              height={1024}
              src={item.img}
              alt={item.alt || ""}
              loading="lazy"
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.ul>
  );
}
