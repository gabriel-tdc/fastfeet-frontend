import React from 'react';

import { Link } from 'react-router-dom';

import { FaChevronLeft, FaCheck } from 'react-icons/fa';

import Header from '~/pages/Template/Header/';

import {
  Content,
  Title,
  Container,
  ContentHeader,
  PrimaryButton,
  SecondaryButton,
  Col,
} from '~/styles/dashboard';

export default function CadastrarDestinatarios() {
  return (
    <>
      <Header />
      <Content>
        <ContentHeader>
          <Title>Cadastro de encomendas</Title>
          <Col>
            <Link to="/encomendas">
              <SecondaryButton>
                <FaChevronLeft />
                Voltar
              </SecondaryButton>
            </Link>
            <Link to="/encomendas">
              <PrimaryButton>
                <FaCheck />
                Salvar
              </PrimaryButton>
            </Link>
          </Col>
        </ContentHeader>
        <Container>
          <div>
            <label htmlFor="destinatario">Destinatário</label>
            <select name="destinatario" id="destinatario">
              <option value="" selected disabled>
                Selecione o destinatário
              </option>
              <option value="">1</option>
              <option value="">1</option>
              <option value="">1</option>
              <option value="">1</option>
            </select>
          </div>

          <div>
            <label htmlFor="entregador">Entregador</label>
            <select name="entregador" id="entregador">
              <option value="" selected disabled>
                Selecione o Entregador
              </option>
              <option value="">1</option>
              <option value="">1</option>
              <option value="">1</option>
              <option value="">1</option>
            </select>
          </div>

          <div className="full-width">
            <label htmlFor="nome_produto">Nome do produto</label>
            <input
              type="text"
              id="nome_produto"
              name="nome_produto"
              placeholder="Yamaha SX7"
            />
          </div>
        </Container>
      </Content>
    </>
  );
}
