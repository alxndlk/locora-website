import { Wrapper } from "@/layout/Wrapper/Wrapper";
import { Hero } from "./components/Hero/Hero";
import { Knowledge } from "./components/Knowledge/Knowledge";
import { MetaBrain } from "./components/MetaBrain/MetaBrain";

export default function Home() {
  return (
    <Wrapper>
      <Hero />
      <Knowledge />
      <MetaBrain />
    </Wrapper>
  );
}
