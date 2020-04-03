import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';

import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import { deliverymanUpdate } from '~/store/modules/deliveryman/actions';

import PhotoHolder from './PhotoHolder';

import api from '~/services/api';

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

export default function EditarDestinatarios() {
  const [tableData, setData] = useState([]);
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadEntregadores() {
      const response = await api.get(`/deliveryman/${id}`);

      setData(response.data);
    }
    loadEntregadores();
  }, [id]);

  function handleSubmit(data) {
    dispatch(deliverymanUpdate(id, data));
  }

  return (
    <>
      <Header />
      <Content>
        <Form onSubmit={handleSubmit} initialData={tableData}>
          <ContentHeader>
            <Title>Edição de Entregador</Title>
            <Col>
              <Link to="/entregadores">
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
              <PhotoHolder currentPhoto={tableData.avatar} />
            </div>

            <div className="full-width">
              <label htmlFor="name">Nome</label>
              <Input type="text" id="name" name="name" placeholder="John Doe" />
            </div>

            <div className="full-width">
              <label htmlFor="email">E-mail</label>
              <Input
                type="text"
                id="email"
                name="email"
                placeholder="example@fastfeet.com"
              />
            </div>
          </Container>
        </Form>
      </Content>
    </>
  );
}
