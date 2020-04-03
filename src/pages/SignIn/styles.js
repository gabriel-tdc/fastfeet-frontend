import styled from 'styled-components';

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background: #7d40e7;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  background: #fff;
  min-width: 360px;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);

  display: flex;
  flex-direction: column;

  img {
    margin-bottom: 40px;
  }

  label {
    font-size: 14px;
    font-weight: bold;
    color: #444444;
    margin-bottom: 9px;
  }

  input {
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding: 12px;
    margin-bottom: 15px;
  }

  span {
    color: #ff5b5b;
    align-self: flex-start;
    margin: -10px 0 10px;
    font-weight: bold;
  }
`;
