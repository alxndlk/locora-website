import { Wrapper } from "@/layout/Wrapper/Wrapper";
import Main from "../components/Download/Main";

export default function Download() {
  return (
    <Wrapper
      footerTheme="black"
      blackHeader={true}
      headerText="Download Locora"
    >
      <Main />
    </Wrapper>
  );
}
