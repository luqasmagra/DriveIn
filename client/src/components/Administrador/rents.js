import * as React from "react";
import {
  BooleanField,
  List,
  Datagrid,
  TextField,
  NumberField,
  Pagination,
  TopToolbar,
  ExportButton,
} from "react-admin";
import { PostFilterSidebarRent } from "./PostFilterSidebarRent";

const PostPagination = () => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100]} />
);

const ListActions = (props) => (
  <TopToolbar>
    <ExportButton />
  </TopToolbar>
);

export const rentsList = () => (
  <List
    aside={<PostFilterSidebarRent />}
    actions={<ListActions />}
    title="List of Rents"
    pagination={<PostPagination />}
  >
    <Datagrid rowClick="edit">
      <NumberField source="id" />
      <TextField source="dateInit" />
      <TextField source="dateFinish" />
      <NumberField source="totalPrice" />
      <TextField source="createdAt" />
      <NumberField source="userId" />
      {/* <TextField source="userName" />
             <EmailField source="userEmail" /> */}
      <NumberField source="vehicleId" />
      {/* <TextField source="vehicle"/> */}
      {/* <ReferenceField source="vehicleId" reference="vehicles" /> */}
      <BooleanField source="active" />
    </Datagrid>
  </List>
);
