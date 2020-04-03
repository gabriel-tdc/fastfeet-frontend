import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
    background: #F5F5F5;
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  table {
    width: 100%;
    margin-top: 15px;
    border-collapse: collapse;
    font-size: 16px;
  }

  table tr th {
    color: #444444;
    text-align: left;
    padding: 0 18px;
    background: #F5F5F5;
  }

  table tr {
    background: #fff;
  }

  table tr td {
    padding: 18px;
    border-top: 21px solid #F5F5F5;
    color: #666666;
  }

  table tr td:last-child {
    text-align: center;
  }

  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 5px;
  }

  .badge {
    padding: 5px;
    padding-left: 20px;
    padding-right: 10px;
    border-radius: 50px;
    position: relative;
    display: inline;
    font-size: 14px;

    &:before{
      content: '';
      position: absolute;
      left: 7px;
      top: 9px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
  }

  .badge.success {
    background: #DFF0DF;
    color: #2CA42B;
    &:before{
      background: #2CA42B;
    }
  }
  .badge.warning {
    background: #F0F0DF;
    color: #C1BC35;
    &:before{
      background: #C1BC35;
    }
  }

  .badge.info {
    background: #BAD2FF;
    color: #4D85EE;
    &:before{
      background: #4D85EE;
    }
  }

  .badge.danger {
    background: #FAB0B0;
    color: #DE3B3B;
    &:before{
      background: #DE3B3B;
    }
  }
`;
