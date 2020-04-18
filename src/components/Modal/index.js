import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FaTimes } from 'react-icons/fa';
import { Container, OpenElem } from './styles';

export default function Modal({ openElem, title, text, keya }) {
  const [modalVisible, setModalVisible] = useState(false);

  // Modals
  function handleSetModalVisible(id) {
    setModalVisible(id);
  }
  function handleSetModalInvisible() {
    setModalVisible(false);
  }

  return (
    <>
      <OpenElem onClick={() => handleSetModalVisible(keya)}>
        {openElem}
      </OpenElem>
      <Container id={keya} visible={modalVisible && modalVisible === keya}>
        <div className="modal-body">
          <div className="modal-header">
            <FaTimes onClick={() => handleSetModalInvisible()} />
          </div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
      </Container>
    </>
  );
}

Modal.propTypes = {
  openElem: PropTypes.string.isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
  keya: PropTypes.string,
};

Modal.defaultProps = {
  title: 'Aviso',
  text: '',
  keya: '1',
};
