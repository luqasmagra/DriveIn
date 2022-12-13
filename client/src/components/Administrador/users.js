import * as React from "react";
import {
  List,
  Datagrid,
  ImageField,
  BooleanField,
  TextField,
  EmailField,
  NumberField,
  Pagination,
  TopToolbar,
  ExportButton,
  CreateButton,
} from "react-admin";
import { PostFilterSidebar } from "./PostFilterSidebar";

const PostPagination = () => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100]} />
);

const ListActions = (props) => (
  <TopToolbar>
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const UserList = () => (
  <List
    aside={<PostFilterSidebar />}
    actions={<ListActions />}
    title="List of Users"
    pagination={<PostPagination />}
  >
    <Datagrid rowClick="edit">
      <NumberField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <NumberField source="whatsapp" />
      <TextField source="password" />
      <ImageField source="photo" />
      <NumberField source="role" />
      <BooleanField source="active" />
    </Datagrid>
  </List>
);
