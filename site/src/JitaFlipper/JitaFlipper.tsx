import styled from "styled-components";
import { Opportunities } from "./Opportunities";
import { Settings } from "./Settings";

const Layout = styled.div`
  display: flex;
  justify-content: start;
  align-items: flex-start;
  box-sizing: border-box;
  margin: 10px;
  flex: 1;
  min-height: 0;
`;

export function JitaFlipper() {
  return (
    <Layout>
      <Settings />
      <Opportunities />
    </Layout>
  );
}
