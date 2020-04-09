import styled from 'styled-components';

export const Menu = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 16px 30px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 34px;
  background: #fff;
`;

export const Nav = styled.ul`
  flex: 1;
  display: flex;
  align-items: center;
  border-left: 1px solid #ddd;
  margin-left: 15px;
  padding-left: 15px;

  li {
    list-style: none;
    margin-right: 21px;
    font-size: 15px;
  }

  li a {
    color: #999999;

    &:hover {
      color: #7d40e7;
    }
  }

  li.active a {
    color: #444444;

    &:hover {
      color: #7d40e7;
    }
  }
`;

export const Logout = styled.div`
  font-size: 14px;

  p {
    color: #666666;
    margin-bottom: 5px;
    font-weight: bold;
  }
  span {
    color: #de3b3b;
    cursor: pointer;
  }
`;
