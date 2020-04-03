import styled from 'styled-components';

export const Container = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 3px dashed #dddddd;
  text-align: center;
  position: relative;

  margin-left: 50%;
  transform: translateX(-50%);

  label {
    color: #dddddd;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;

    svg {
      font-size: 30px;
    }

    p {
      font-size: 16px;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: 0;
    }

    input {
      display: none;
    }
  }
`;
