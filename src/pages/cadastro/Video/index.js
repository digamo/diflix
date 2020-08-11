import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';

function CadastroVideo() {
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);

  const categoryTitles = categorias.map(({ titulo }) => titulo);

  const { handleChange, values } = useForm({
    titulo: 'Default Video',
    url: 'https://www.youtube.com/watch?v=ROeA2H-EQ6w',
    categoria: 'Javascript',
  });

  useEffect(() => {
    categoriasRepository.getAll().then(categoriesFromServe => {
      setCategorias(categoriesFromServe);
    });
  }, []);

  return (
    <PageDefault>
      <h1>Cadastro de Vídeo</h1>

      <form
        onSubmit={event => {
          event.preventDefault();

          const categorySelected = categorias.find(categoria => {
            return categoria.titulo === values.categoria;
          });

          console.log(categorySelected);

          videosRepository
            .create({
              titulo: values.titulo,
              url: values.url,
              categoriaId: 1,
            })
            .then(() => {
              history.push('/');
            });
        }}
      >
        <FormField
          label="Título do Vídeo"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="URL"
          name="url"
          value={values.url}
          onChange={handleChange}
        />

        <FormField
          label="Categorias"
          name="categoria"
          value={values.categoria}
          onChange={handleChange}
          suggestions={categoryTitles}
        />

        <Button type="submit">Cadastrar</Button>
      </form>

    </PageDefault>
  );
}

export default CadastroVideo;
