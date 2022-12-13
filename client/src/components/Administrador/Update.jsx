import { Edit, SimpleForm, TextInput, BooleanInput } from "react-admin";

const validateCreation = (values) => {
  const errors = {};
  return errors;
};

export const Updates = () => (
  <Edit title="Edit a User">
    <SimpleForm validate={validateCreation}>
      <TextInput disabled label="Id" source="id" />
      <TextInput disabled source="name" />
      <TextInput disabled source="lastName" />
      <TextInput disabled source="email" />
      {/* <ImageInput source = "photo"/> */}
      {/* <NumberInput source="whatsapp" />
              <TextInput source="password" />
              <input type="file" onChange={imageCloudChangeHandler}></input>
              <TextInput source="photo" value={ImageCloud}/>
              <SelectInput source="role" defaultValue={1} choices={[
               { id: "1", name: 1 },
               { id: "2", name: 2},
               { id: "3", name: 3},
               { id: "4", name: 4}
            ]} /> */}
      <BooleanInput source="active" />
    </SimpleForm>
  </Edit>
);
