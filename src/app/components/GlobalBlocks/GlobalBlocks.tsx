import React from "react";
import { motion } from "framer-motion";
import s from "./GlobalBlocks.module.css";
import { useRevealOnView, useParallax, fadeUp } from "@/hooks/useMotion";

const GlobalBlocks = () => {
  const top = useRevealOnView({ amount: 0.35 });
  const mid1 = useRevealOnView({ amount: 0.35 });
  const mid2 = useRevealOnView({ amount: 0.35 });
  const bottom = useRevealOnView({ amount: 0.35 });

  const yTop = useParallax(top.ref, { distance: 40 });
  const yM1 = useParallax(mid1.ref, { distance: 0 });
  const yM2 = useParallax(mid2.ref, { distance: 0 });
  const yBot = useParallax(bottom.ref, { distance: 40 });

  return (
    <section className={s.globalBlocks}>
      <div className={s.container}>
        <motion.h1
          className={s.title}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.5 }}
        >
          A global news source. Personalized for you.
        </motion.h1>

        <div className={s.grid}>
          {/* TOP */}
          <motion.div
            ref={top.ref}
            className={s.top_block}
            variants={fadeUp}
            initial={top.initial}
            animate={top.controls}
          >
            <div className={s.text}>
              <h2 className={s.block_title}>
                Stay close to what’s happening close to home.
              </h2>
              <p className={s.block_desc}>
                Get all the latest news from local publications in a growing
                number of cities — with coverage on politics, sports, dining,
                culture, and more.
              </p>
            </div>
            <motion.div className={s.image_container} style={{ y: yTop }}>
              <figure className={s.image_figure} />
            </motion.div>
          </motion.div>

          {/* MIDDLE 1 */}
          <motion.div
            ref={mid1.ref}
            className={s.middle_block}
            variants={fadeUp}
            initial={mid1.initial}
            animate={mid1.controls}
          >
            <div className={s.text}>
              <h2 className={s.block_title}>
                The hard-hitting, fast-breaking sports news you need.
              </h2>
              <p className={s.block_desc}>
                Get highlights, scores, and schedules for professional and
                college teams and leagues. Apple News+ unlocks access to The
                Athletic, Sports Illustrated, local newspapers, and more.
              </p>
            </div>
            <motion.div className={s.image_container_middle} style={{ y: yM1 }}>
              <figure className={s.image_figure_middle} />
            </motion.div>
          </motion.div>

          {/* MIDDLE 2 */}
          <motion.div
            ref={mid2.ref}
            className={s.middle_block}
            variants={fadeUp}
            initial={mid2.initial}
            animate={mid2.controls}
          >
            <div className={s.text}>
              <h2 className={s.block_title}>
                The feed that feeds your interests.
              </h2>
              <p className={s.block_desc}>
                As you read, Apple News gets a better understanding of your
                interests and suggests relevant stories that you can easily find
                throughout the app.
              </p>
            </div>
            <motion.div className={s.image_container_middle} style={{ y: yM2 }}>
              <figure
                className={s.image_figure_middle}
                id={s.figure_middle_2}
              />
            </motion.div>
          </motion.div>

          {/* BOTTOM */}
          <motion.div
            ref={bottom.ref}
            className={s.bottom_block}
            variants={fadeUp}
            initial={bottom.initial}
            animate={bottom.controls}
          >
            <div className={s.text}>
              <h2 className={s.block_title}>Only you see what you read.</h2>
              <p className={s.block_desc}>
                Apple News only uses on-device intelligence to recommend stories
                and doesn’t access your information without your permission. We
                never share it with others or allow advertisers to track you.
              </p>
            </div>
            <motion.div
              className={s.image_container_bottom}
              style={{ y: yBot }}
            >
              <figure className={s.image_figure_bottom} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GlobalBlocks;
