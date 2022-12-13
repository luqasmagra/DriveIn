import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  Pagination,
} from "react-admin";

const PostPagination = () => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100]} />
);

export const commentsList = () => (
  <List title="List of vehicles" pagination={<PostPagination />}>
    <Datagrid rowClick="edit">
      <NumberField source="id" />
      <TextField source="description" />
      <TextField source="userId" />
      <TextField source="vehicleId" />
    </Datagrid>
  </List>
);
