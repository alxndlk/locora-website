import React from "react";
import styles from "./Footer.module.css";
import { links, navItems, socialLinks } from "@/lib/nav";
import Image from "next/image";
import { PrimaryButton } from "@/ui/PrimaryButton";
import { SecondaryButton } from "@/ui/SecondaryButton";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.flex}>
          <Image
            src={"/images/gif.gif"}
            alt="image"
            width={1024}
            height={1024}
          />
          <div className={styles.text_container}>
            <h1>Join the Movement</h1>
            <p>
              Unlock the future of productivity with Huly. Remember, this
              journey is just getting started.
            </p>
            <div className={styles.buttons}>
              <PrimaryButton
                text="SEE IN ACTION"
                fontSize={15}
                iconPosition="left"
                icon="GoArrowUpRight"
                iconSize={20}
                fontWeight={500}
                paddingButton="14.25px 24px"
              />
              <SecondaryButton
                text="JOIN OUR SLACK"
                fontSize={15}
                iconPosition="left"
                icon="PiUserList"
                iconSize={20}
                fontWeight={500}
                paddingButton="14.25px 24px"
              />
            </div>
          </div>
        </div>
        <div className={styles.text}>
          <span>Copyright © 2025 Huly Labs. All rights reserved.</span>
          <ul className={styles.ul}>
            <li>
              <a href={links.terms.route} className={styles.ul_link}>
                {links.terms.name}
              </a>
            </li>
            <li>
              <a href={links.privacy.route} className={styles.ul_link}>
                {links.privacy.name}
              </a>
            </li>
          </ul>
          <div className={styles.social}>
            {Object.values(socialLinks).map(
              ({ name, href, icon: Icon, description }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={description}
                  className={styles.social_link}
                >
                  <Icon size={18} />
                </a>
              )
            )}
          </div>

          <h3 className={styles.alex}>
            Made by <a href="https://t.me/alxndlk">alxndlk</a> for commercial
            use
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Footer;
