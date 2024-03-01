// components provided by react-admin for building the admin dashboard.
import { Admin, Resource, ShowGuesser } from "react-admin";

// custom data provider used to interact with the backend API or data source.
import { dataProviderX } from "./dataProvider";

// components used to manage users and posts in the admin dashboard.
import { UserList } from "./users";

import { PostList, PostEdit, PostCreate } from "./posts";

// icons imported from the Material-UI library.
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";

// custom dashboard component.
import { Dashboard } from "./Dashboard";

// custom authentication provider.
import { authProvider } from "./authProvider";

// defines the App component as a functional component. It serves as the entry point for the admin dashboard
export const App = () => (
  // <Admin> component is the root component of the admin dashboard and takes several props:
  // authProvider: This prop specifies the authentication provider to use for user authentication.
  // dataProvider: This prop specifies the data provider to use for CRUD operations.
  // dashboard: This prop specifies the custom dashboard component to render in the admin dashboard.

  // two <Resource> components, one for managing "posts" and another for managing "users."
  // name: Specifies the name of the resource, which corresponds to the data entity you want to manage.
  // list, edit, create, and show props specify the components to use for listing, editing, creating, and showing individual items of the resource.
  // icon: Specifies the icon to represent the resource in the sidebar.
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
