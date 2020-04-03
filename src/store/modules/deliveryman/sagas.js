import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {
  deliverymanPostSuccess,
  deliverymanPostFailure,
  deliverymanUpdateSuccess,
  deliverymanUpdateFailure,
  deliverymanDeleteSuccess,
  deliverymanDeleteFailure,
} from './actions';

export function* deliverymanPost({ payload }) {
  try {
    const { data } = payload;

    const response = yield call(api.post, 'deliveryman', data);
    const { id } = response.data;

    // Enviar a foto
    const photo = document.getElementById('photo');
    if (photo.files[0]) {
      const fileData = new FormData();
      fileData.append('file', photo.files[0]);
      fileData.append('id', id);
      yield api.post('avatar', fileData);
    }

    toast.success('Entregador cadastrado com sucesso!');

    yield put(deliverymanPostSuccess());

    history.push('/entregadores');
  } catch (err) {
    toast.error('Erro ao cadastrar entregador ');
    yield put(deliverymanPostFailure());
  }
}

export function* deliverymanUpdate({ payload }) {
  try {
    const { data, id } = payload;

    yield call(api.put, `deliveryman/${id}`, data);

    // Enviar a foto
    const photo = document.getElementById('photo');
    if (photo.files[0]) {
      const fileData = new FormData();
      fileData.append('file', photo.files[0]);
      fileData.append('id', id);
      yield api.post('avatar', fileData);
    }

    toast.success('Entregador atualizado com sucesso!');

    yield put(deliverymanUpdateSuccess());

    history.push('/entregadores');
  } catch (err) {
    toast.error('Erro ao alterar entregador');
    yield put(deliverymanUpdateFailure());
  }
}

export function* deliverymanDelete({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `deliveryman/${id}`);

    const data = yield call(api.get, 'deliveryman');

    toast.success('Entregador removido com sucesso!');

    yield put(deliverymanDeleteSuccess(data));

    history.push('/entregadores');
  } catch (err) {
    toast.error('Erro ao remover entregador!');
    yield put(deliverymanDeleteFailure());
  }
}

export default all([
  takeLatest('@deliveryman/DELIVERYMAN_POST', deliverymanPost),
  takeLatest('@deliveryman/DELIVERYMAN_UPDATE', deliverymanUpdate),
  takeLatest('@deliveryman/DELIVERYMAN_DELETE', deliverymanDelete),
]);
