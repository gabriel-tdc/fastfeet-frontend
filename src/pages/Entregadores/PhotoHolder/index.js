import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FaImage } from 'react-icons/fa';

import { Container } from './styles';

export default function PhotoHolder({ currentPhoto }) {
  const [preview, setPreview] = useState();

  async function handleChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = load => {
        setPreview(load.target.result);
      };
    } else {
      setPreview();
    }
  }

  return (
    <Container>
      <label>
        {(preview || currentPhoto) && (
          <img src={preview || currentPhoto.url} alt="" />
        )}
        <FaImage />
        Adicionar Foto
        <input
          type="file"
          id="photo"
          accept="image/*"
          onChange={handleChange}
        />
      </label>
    </Container>
  );
}

PhotoHolder.propTypes = {
  currentPhoto: [PropTypes.object],
};

PhotoHolder.defaultProps = {
  currentPhoto: null,
};
