import { useMediaQuery, Theme } from "@mui/material";
import { List, Datagrid, TextField, EmailField, SimpleList } from "react-admin";
import MyUrlField from "./MyUrlField";

// functional component defined using an arrow function. It doesn't take any props as arguments.
export const UserList = () => {
    // uses the useMediaQuery hook to determine whether the screen size is considered "small" according to the specified theme breakpoints
    // result of this check is stored in the isSmall variable.
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    // component then conditionally renders different UI components based on the value of isSmall
    return (
        // both the <SimpleList> and <Datagrid> components are wrapped in a <List> component, which is used for overall styling and layout purposes.
        <List>
            {isSmall ? ( // renders a <SimpleList> component. This component displays user data in a simple list format, showing the user's name, username, and email.
                <SimpleList 
                    primaryText={(record) => record.name}
                    secondaryText={(record) => record.username}
                    tertiaryText={(record) => record.email}
                />
            ) : ( // renders a <Datagrid> component. This component displays user data in a tabular format with several fields, including ID, name, email, phone, website, and company name.   
                <Datagrid rowClick="show">
                    <TextField source="id" />
                    <TextField source="name" />
                    <EmailField source="email" />
                    <TextField source="phone" />
                    <MyUrlField source="website" />
                    <TextField source="company.name" />
                </Datagrid>
            )}
        </List>
    );    
};