import React from 'react';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';

import { deliverymanPost } from '~/store/modules/deliveryman/actions';

import PhotoHolder from './PhotoHolder';

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

const schema = Yup.object().shape({
  name: Yup.string()
    .required('O campo nome é obrigatório')
    .min(6, 'O nome precisa ter pelo menos 6 caracteres'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
});

export default function CadastrarEntregadores() {
  const dispatch = useDispatch();

  async function handleSubmit(data) {
    dispatch(deliverymanPost(data));
  }

  return (
    <>
      <Header />
      <Content>
        <Form schema={schema} onSubmit={handleSubmit}>
          <ContentHeader>
            <Title>Cadastro de Entregador</Title>
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
              <PhotoHolder />
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
