/* eslint-disable @typescript-eslint/no-explicit-any */

export function setColorTheme(
  styles: any,
  theme: "black" | "white",
  type:
    | "content"
    | "heading"
    | "link"
    | "navLink"
    | "navButton"
    | "footer"
    | "footerTextTop"
    | "footerContainer"
    | "divider"
    | "gridFooter"
    | "footerTitle"
    | "footerLinks"
    | "footerSummary"
    | "footerList"
    | "mobileHeaderContainer"
    | "mobileProfileText"
    | "icons"
    | "active"
): string {
  const isBlack = theme === "black";

  if (isBlack) {
    switch (type) {
      // Header and hover
      case "content":
        return styles.contentBlack;
      case "active":
        return styles.activeBlack;
      case "heading":
        return styles.blackHeading;
      case "link":
        return styles.blackLinks;
      case "navLink":
        return styles.black;
      case "navButton":
        return styles.black;
      // Footer
      case "footer":
        return styles.footerBlack;
      case "footerTextTop":
        return styles.footerTextBlack;
      case "footerContainer":
        return styles.containerBlack;
      case "divider":
        return styles.dividerBlack;
      case "gridFooter":
        return styles.gridFooterBlack;
      case "footerTitle":
        return styles.footerTitleBlack;
      case "footerLinks":
        return styles.footerLinksBlack;
      case "footerSummary":
        return styles.footerSummaryBlack;
      case "footerList":
        return styles.footerListBlack;
      // Mobile Header
      case "mobileHeaderContainer":
        return styles.containerBlack;
      case "mobileProfileText":
        return styles.mobileProfileTextBlack;
      case "icons":
        return styles.iconsBlack;

      default:
        return "";
    }
  } else {
    switch (type) {
      // Header and hover
      case "content":
        return styles.content;
      case "active":
        return styles.active;
      case "heading":
        return styles.heading;
      case "link":
        return styles.link;
      case "navLink":
        return styles.navLink;
      case "navButton":
        return styles.navButton;
      // Footer
      case "footer":
        return styles.footer;
      case "footerTextTop":
        return styles.footerText;
      case "footerContainer":
        return styles.container;
      case "divider":
        return styles.divider;
      case "gridFooter":
        return styles.gridFooter;
      case "footerTitle":
        return styles.footerTitle;
      case "footerLinks":
        return styles.footerLinks;
      case "footerSummary":
        return styles.footerSummary;
      case "footerList":
        return styles.footerList;
      // Mobile Header
      case "mobileHeaderContainer":
        return styles.container;
      case "mobileProfileText":
        return styles.mobileProfileText;
      case "icons":
        return styles.icons;

      default:
        return "";
    }
  }
}
