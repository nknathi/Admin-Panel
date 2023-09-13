import { Admin, Resource, ShowGuesser } from "react-admin";
import { dataProviderX } from "./dataProvider";
import { UserList } from "./users";
import { PostList, PostEdit, PostCreate } from "./posts";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import { Dashboard } from "./Dashboard";
import { authProvider } from "./authProvider";

export const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProviderX} dashboard={Dashboard}>
    <Resource 
      name="posts" 
      list={PostList} 
      edit={PostEdit} 
      create={PostCreate} 
      icon={PostIcon} 
    />
    <Resource 
      name="users" 
      list={UserList} 
      show={ShowGuesser} 
      recordRepresentation="name" 
      icon={UserIcon} 
    />
  </Admin>
);
