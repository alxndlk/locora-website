import { Wrapper } from "@/layout/Wrapper/Wrapper";
import Main from "../../components/Authentication/Main";

export default function Login() {
  return (
    <Wrapper footerLarge={false} needHeader={false}>
      <Main />
    </Wrapper>
  );
}
