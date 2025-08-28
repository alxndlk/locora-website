import { Wrapper } from "@/layout/Wrapper/Wrapper";
import React from "react";
import Main from "./components/Main";

const page = () => {
  return (
    <Wrapper footerLarge={false} blackHeader>
      <Main />
    </Wrapper>
  );
};

export default page;
