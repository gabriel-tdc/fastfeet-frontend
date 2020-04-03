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

export default function Destinatarios() {
  return (
    <>
      <Header />
      <Content>
        <ContentHeader>
          <Title>Cadastro de Destinatário</Title>
          <Col>
            <Link to="/destinatarios">
              <SecondaryButton>
                <FaChevronLeft />
                Voltar
              </SecondaryButton>
            </Link>
            <Link to="/destinatarios">
              <PrimaryButton>
                <FaCheck />
                Salvar
              </PrimaryButton>
            </Link>
          </Col>
        </ContentHeader>
        <Container>
          <div className="full-width">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Ludwig van Beethoven"
            />
          </div>

          <div className="full-width">
            <label htmlFor="rua">Rua</label>
            <input
              type="text"
              id="rua"
              name="rua"
              placeholder="Rua Beethoven"
            />
          </div>

          <div className="full-width">
            <label htmlFor="numero">Número</label>
            <input type="text" id="numero" name="numero" placeholder="1729" />
          </div>

          <div className="full-width">
            <label htmlFor="complemento">Complemento</label>
            <input type="text" id="complemento" name="complemento" />
          </div>

          <div className="full-width">
            <label htmlFor="cidade">Cidade</label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              placeholder="Diadema"
            />
          </div>

          <div className="full-width">
            <label htmlFor="estado">Estado</label>
            <input
              type="text"
              id="estado"
              name="estado"
              placeholder="São Paulo"
            />
          </div>

          <div className="full-width">
            <label htmlFor="cep">CEP</label>
            <input type="text" id="cep" name="cep" placeholder="09960-580" />
          </div>
        </Container>
      </Content>
    </>
  );
}
