import { Wrapper } from "@/layout/Wrapper/Wrapper";
import Main from "./components/Home/Main";

export default function Home() {
  return (
    <Wrapper footerTheme="black" blackHeader={true}>
      <Main />
    </Wrapper>
  );
}
