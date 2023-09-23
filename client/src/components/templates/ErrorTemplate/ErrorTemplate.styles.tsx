import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;

  color: #1a1a1a;

  h1, h1>.pi {
    font-size: 4rem;
  }

  p {
    font-size: 1.5rem;
  }
  
  button {
    width: 8rem;
    align-self: flex-end;
  }
`;