import { Wrapper } from "@/layout/Wrapper/Wrapper";
import { Hero } from "./components/Hero/Hero";
import { WelcomeOverlay } from "./components/WelcomeOverlay/WelcomeOverlay";
import { Knowledge } from "./components/Knowledge/Knowledge";
import { MetaBrain } from "./components/MetaBrain/MetaBrain";

export default function Home() {
  return (
    <Wrapper>
      <WelcomeOverlay />
      <Hero />
      <Knowledge />
      <MetaBrain />
    </Wrapper>
  );
}
