import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  ImageInput,
  SelectInput,
} from "react-admin";

const validateCreation = (values) => {
  const errors = {};
  // if(values.photo) {values.photo = ImageCloud}
  if (!values.brand) errors.brand = "Escriba la marca";
  else if (!/^[a-zA-Z0-9ñ]+$/.test(values.brand)) {
    errors.brand = "Solo se aceptan letras y numeros";
  }
  if (!values.model) errors.model = "Escriba el modelo";
  else if (!/^[a-zA-Z0-9ñ]+$/.test(values.model)) {
    errors.model = "Solo se aceptan letras y numeros";
  }
  if (!values.year) errors.year = "Escriba el año";
  else if (values.year > 2023 || values.year < 2010) {
    errors.year = "Solo se permite el año entre 2010 y 2023";
  }
  if (!values.color) errors.color = "Escriba el color";
  else if (!/^[a-zA-Zñ]+$/.test(values.color)) {
    errors.color = "Solo se aceptan letras";
  }
  if (!values.transmition) errors.transmition = "Seleccione la transmisión";
  if (values.seats < 2) {
    errors.seats = "Selecione 2 o mas asientos";
  }
  if (!values.category) errors.category = "Escriba la categoría";
  else if (!/^[a-zA-Zñ]+$/.test(values.category)) {
    errors.category = "Solo se aceptan letras";
  }
  // if (!values.photo) errors.photo = "Agregar una foto";
  if (values.initialPrice < 1) {
    errors.initialPrice = "Precio tiene que ser mayor a 1";
  }
  if (!values.cityId) errors.cityId = "Seleccione la ciudad";

  return errors;
};

export const UpdateVehicle = () => (
  <Edit title="Edit a vehicle">
    <SimpleForm validate={validateCreation}>
      <TextInput source="brand" label="Marca" />
      <TextInput source="model" label="Modelo" />
      <NumberInput source="year" label="Año" />
      <TextInput source="color" />
      <SelectInput
        source="transmition"
        label="Transmisión"
        choices={[
          { id: "Automatico", name: "Automático" },
          { id: "Manual", name: "Manual" },
        ]}
      />
      <BooleanInput source="air" />
      <NumberInput source="seats" label="Asientos" />
      <TextInput source="category" label="Categoría" />
      <ImageInput source="photo" />
      <BooleanInput source="availability" label="Disponibilidad" />
      <NumberInput source="initialPrice" label="Precio" />
      <SelectInput
        source="cityId"
        label="Ciudad"
        choices={[
          { id: 1, name: "Villa Carlos Paz" },
          { id: 2, name: "San Rafael" },
          { id: 3, name: "Cancun" },
          { id: 4, name: "Mérida" },
          { id: 5, name: "Cartagena" },
          { id: 6, name: "Medellin" },
          { id: 7, name: "Caracas" },
          { id: 8, name: "Valencia" },
          { id: 9, name: "Maracaibo" },
          { id: 10, name: "Punta del Este" },
          { id: 11, name: "Piriapolis" },
          { id: 12, name: "Rio de Janeiro" },
          { id: 13, name: "Florianópolis" },
          { id: 14, name: "Quito" },
          { id: 15, name: "La Paz" },
        ]}
      />
    </SimpleForm>
  </Edit>
);
