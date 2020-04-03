import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/fastfeet.svg';

import { PrimaryButton } from '~/styles/dashboard';
import { Background, Container } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Background>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Container>
          <img src={logo} alt="Logotipo FastFeet" />
          <label htmlFor="email">SEU E-MAIL</label>
          <Input
            type="text"
            id="email"
            name="email"
            placeholder="exemplo@email.com"
          />

          <label htmlFor="password">SEU E-MAIL</label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="******"
          />

          <PrimaryButton type="submit">
            {loading ? 'Carregando...' : 'Entrar no sistema'}
          </PrimaryButton>
        </Container>
      </Form>
    </Background>
  );
}
