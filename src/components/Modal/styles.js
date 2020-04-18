import styled from 'styled-components';

export const OpenElem = styled.div``;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  display: ${props => (props.visible ? 'flex' : 'none')};

  .modal-header {
    float: right;

    svg {
      cursor: pointer;
    }
  }

  .modal-body {
    max-width: 600px;
    min-width: 450px;
    background-color: #fff;
    border-radius: 5px;
    padding: 15px;

    h2 {
      color: #444444;
      font-size: 14px;
      margin-bottom: 10px;
    }

    p {
      color: #666666;
      font-size: 16px;
    }

    hr {
      border: none;
      border-top: 1px solid #eeeeee;
      margin: 15px 0;
    }

    img {
      margin: 10px auto;
      display: inline;
    }

    .center {
      text-align: center;
    }
  }
`;
