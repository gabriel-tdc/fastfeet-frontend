import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';

import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import { recipientUpdate } from '~/store/modules/recipient/actions';

import api from '~/services/api';

import Header from '~/components/Header/';

import {
  Content,
  Title,
  Container,
  ContentHeader,
  PrimaryButton,
  SecondaryButton,
  Col,
  Col3,
} from '~/styles/dashboard';

export default function Destinatarios() {
  const [tableData, setData] = useState([]);
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadEntregadores() {
      const response = await api.get(`/recipients/${id}`);

      setData(response.data);
    }
    loadEntregadores();
  }, [id]);

  function handleSubmit(data) {
    dispatch(recipientUpdate(id, data));
  }

  return (
    <>
      <Header />
      <Content>
        <Form onSubmit={handleSubmit} initialData={tableData}>
          <ContentHeader>
            <Title>Cadastro de Destinatário</Title>
            <Col>
              <Link to="/destinatarios">
                <SecondaryButton>
                  <FaChevronLeft />
                  Voltar
                </SecondaryButton>
              </Link>
              <PrimaryButton type="submit">
                <FaCheck />
                Salvar
              </PrimaryButton>
            </Col>
          </ContentHeader>
          <Container>
            <div className="full-width">
              <label htmlFor="name">Nome</label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Ludwig van Beethoven"
              />
            </div>

            <Col3>
              <label htmlFor="street">Rua</label>
              <Input
                type="text"
                id="street"
                name="street"
                placeholder="Rua Beethoven"
              />
            </Col3>

            <Col3>
              <label htmlFor="number">Número</label>
              <Input type="text" id="number" name="number" placeholder="1729" />
            </Col3>

            <Col3>
              <label htmlFor="complement">Complemento</label>
              <Input type="text" id="complement" name="complement" />
            </Col3>

            <Col3>
              <label htmlFor="city">Cidade</label>
              <Input type="text" id="city" name="city" placeholder="Diadema" />
            </Col3>

            <Col3>
              <label htmlFor="state">Estado</label>
              <Input
                type="text"
                id="state"
                name="state"
                placeholder="São Paulo"
              />
            </Col3>

            <Col3>
              <label htmlFor="cep">CEP</label>
              <Input type="text" id="cep" name="cep" placeholder="09960-580" />
            </Col3>
          </Container>
        </Form>
      </Content>
    </>
  );
}
