// components and functions are used to define and customize the behavior of your admin panel
import { 
    List, 
    Datagrid, 
    TextField, 
    ReferenceField, 
    EditButton,
    Edit,
    Create,
    SimpleForm, 
    ReferenceInput,
    TextInput,
    useRecordContext,
} from "react-admin";

// array that defines filters that can be applied to the list of posts. 
// In this case, it includes two filter components
const postFilters = [
    // a text input field labeled "Search," which is always visible.
    <TextInput source="q" label="Search" alwaysOn />,
    // Reference input field labeled "User" that allows you to filter posts by the user they are associated with. 
    // It references the "users" resource
    <ReferenceInput source="userId" label="User" reference="users" />
];

// functional component that defines how the list of posts should be displayed
export const PostList = () => (
    // uses the <List> component from react-admin and specifies the filters to be applied (defined in postFilters).
    // uses a <Datagrid> component to display the list of posts in a tabular format.
    // Each row in the datagrid includes fields like "id," "userId," "title," and an "Edit" button.
    // ReferenceField: used to display the "userId" as a reference, and it is configured to link to the user's details page.
    <List filters={postFilters}>
        <Datagrid>
            <TextField source="id" />
            <ReferenceField source="userId" reference="users" link="show" />
            <TextField source="title" />
            <EditButton />
        </Datagrid>
    </List>
);

// functional component that displays the title of a post. 
const PostTitle = () => {
    // It uses the useRecordContext hook to access the current record's data,
    // specifically the "title" field.
    const record = useRecordContext();
    // title is displayed as "Post [title]" if a record is available; otherwise, it displays an empty string.
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

// component that defines the form for editing a post
export const PostEdit = () => (
    // uses the <Edit> component from react-admin and provides a custom title component (<PostTitle />).
    // input fields for "id," "userId," "title," and "body."
    // These fields are configured using <TextInput> and <ReferenceInput> components.
    <Edit title={<PostTitle/>}>
        <SimpleForm>
            <TextInput source="id" />
            <ReferenceInput source="userId" reference="users" />
            <TextInput source="title" />
            <TextInput source="body" multiline rows={5}/>
        </SimpleForm>
    </Edit>
);

// PostCreate is similar to PostEdit but is used for creating new posts
export const PostCreate = () => (
    // uses the <Create> component and includes input fields for "id," "userId," "title," and "body."
    <Create>
        <SimpleForm>
            <TextInput source="id" />
            <ReferenceInput source="userId" reference="users" />
            <TextInput source="title" />
            <TextInput source="body" multiline rows={5}/>
        </SimpleForm>
    </Create>
);