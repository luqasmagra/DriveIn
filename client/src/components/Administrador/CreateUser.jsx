import React from "react";
import {
  Create,
  SimpleForm,
  SelectInput,
  TextInput,
  NumberInput,
  BooleanInput,
} from "react-admin";
import axios from "axios";
import { useState } from "react";

const validateCreation = (values) => {
  const errors = {};
  if (!values.name) errors.name = "Escriba el nombre";
  else if (!/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(values.name)) {
    errors.name = "Solo se aceptan letras";
  }
  if (!values.lastName) errors.lastName = "Escriba el apellido";
  else if (!/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(values.lastName)) {
    errors.lastName = "Solo se aceptan letras";
  }
  if (!values.email) errors.email = "Escriba un email";
  else if (
    !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(values.email)
  ) {
    errors.email = "Email inválido";
  }
  if (!values.password) errors.password = "Escriba un password";
  else if (!/^.{4,12}$/.test(values.password)) {
    errors.password = "Password inválido";
  }
  if (!values.role) errors.role = "Elija un rol";

  return errors;
};

const CreateUser = () => {
  const [ImageCloud, setImageCloud] = useState("");

  const imageCloudChangeHandler = (event) => {
    const imageData = new FormData();
    imageData.append("file", event.target.files[0]);
    imageData.append("upload_preset", "drivein_uploader");
    axios
      .post("https://api.cloudinary.com/v1_1/dbmhbouib/upload", imageData)
      .then((response) => {
        setImageCloud(response.data.secure_url);
      });
  };

  return (
    <Create title="Create a User">
      <SimpleForm validate={validateCreation}>
        <TextInput source="name" />
        <TextInput source="lastName" />
        <TextInput source="email" />
        <NumberInput source="whatsapp" />
        <TextInput source="password" />
        <input type="file" onChange={imageCloudChangeHandler}></input>
        {ImageCloud !== "" && (
          <TextInput source="photo" defaultValue={ImageCloud} />
        )}
        <SelectInput
          source="role"
          defaultValue={2}
          choices={[
            { id: "2", name: 2 },
            { id: "3", name: 3 },
            { id: "4", name: 4 },
          ]}
        />

        <BooleanInput source="active" />
      </SimpleForm>
    </Create>
  );
};

export default CreateUser;
