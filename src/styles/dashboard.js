import styled from 'styled-components';

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Col = styled.div`
  display: flex;

  button {
    margin-left: 15px;
  }
`;

export const PrimaryButton = styled.button`
  background: #7d40e7;
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 12px;

  text-align: center;
  color: #fff;
  font-size: 16px;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 7px;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
`;

export const SecondaryButton = styled.button`
  background: #cccccc;
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 12px;

  text-align: center;
  color: #fff;
  font-size: 16px;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 7px;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
`;

export const Content = styled.section`
  max-width: 1200px;
  padding: 0 15px;
  margin: 0 auto;
`;

export const Container = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 30px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;

  label {
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    color: #444444;
  }

  input,
  select {
    width: 100%;
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding: 12px;
    margin-top: 9px;
  }

  .full-width {
    grid-column: 1 / 3;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #444444;
  margin-bottom: 34px;
`;

export const PageWarn = styled.h2`
  font-size: 20px;
  color: #444444;
  margin-top: 34px;
  background-color: #fff;
  padding: 20px;
`;

export const Searchbox = styled.label`
  svg {
    margin: 0 -28px -3px 11px;
    position: relative;
    z-index: 2;
    font-size: 17px;
    color: #dddddd;
  }
`;

export const SearchInput = styled.input`
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 12px;
  padding-left: 40px;
  position: relative;

  &::before {
    content: '▲';
    transform: scaleY(0.5);
    position: absolute;
    left: calc(50% - 10px);
    top: -22px;
    text-shadow: 0px -4px 5px rgba(0, 0, 0, 0.15);
    z-index: 0;
    color: #fff;
    padding: 10px;
  }
`;

export const Acoes = styled.div`
  position: relative;
`;

export const Dropdown = styled.ul`
  background: #fff;
  position: absolute;
  width: 150px;
  left: calc(50% - 75px);
  top: calc(100% + 5px);
  padding: 7px 15px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  display: ${props => (props.visible ? 'block' : 'none')};
  z-index: 1;

  &::before {
    content: '▲';
    transform: scaleY(0.5);
    position: absolute;
    left: calc(50% - 17px);
    top: -22px;
    text-shadow: 0px -4px 5px rgba(0, 0, 0, 0.15);
    z-index: 0;
    color: #fff;
    padding: 10px;
  }
`;

export const DropdownItem = styled.li`
  display: flex;
  flex-direction: row;
  padding: 6px;
  border-top: 0px;
  color: #999999;

  span {
    cursor: pointer;
    display: flex;
    color: #999999;
  }

  & + li {
    border-top: 1px solid #eeeeee;
  }

  svg {
    margin-right: 8px;
  }

  a {
    display: flex;
    color: #999999;
  }
`;

export const Modal = styled.div`
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
      font-size: 20px;
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

  .modal-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }
`;

export const Loading = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  color: #fff;
  display: ${props => (props.inLoad ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeinT 1s 1 linear;

  @keyframes fadeinT {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  svg {
    font-size: 50px;
  }

  .fa-spin {
    animation: fa-spin 2s infinite linear;
  }
  @keyframes fa-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }
`;
