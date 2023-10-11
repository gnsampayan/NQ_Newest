import styled from "styled-components";
import React from "react";

const SectionElementParent = styled.div`
  margin-left: 0px; //update later
`;

interface PageProps {
  sectionElement: React.ReactElement<'div'>;
}

const Page: React.FC<PageProps> = ({ sectionElement }) => {

  return (
    <>
      <SectionElementParent>
        {sectionElement}
      </SectionElementParent>
    </>
  )
}

export default Page