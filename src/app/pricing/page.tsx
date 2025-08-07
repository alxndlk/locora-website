import { Header } from "@/layout/Header/Header";
import { Wrapper } from "@/layout/Wrapper/Wrapper";
import Main from "./components/Main";

export default function Home() {
  return (
    <Wrapper>
      <Header />
      <Main />
    </Wrapper>
  );
}
