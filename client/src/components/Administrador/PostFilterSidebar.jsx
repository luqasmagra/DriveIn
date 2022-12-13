import { FilterLiveSearch, FilterList, FilterListItem } from "react-admin";
import { Card, CardContent } from "@mui/material";

import CategoryIcon from "@mui/icons-material/LocalOffer";

export const PostFilterSidebar = () => (
  <Card sx={{ order: -1, mr: 2, mt: 8, width: 200 }}>
    <CardContent>
      <label>Name</label>
      <FilterLiveSearch />

      <FilterList label="Category" icon={<CategoryIcon />}>
        <FilterListItem label="No activos" value={{ category: "noActives" }} />
      </FilterList>
    </CardContent>
  </Card>
);
