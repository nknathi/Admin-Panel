import { useRecordContext } from "react-admin";
import { Link } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

// defines a functional React component called MyUrlField
const MyUrlField = ({ source }: { source: string }) => {
    // variable record is declared, which is assigned the result of the useRecordContext() hook
    const record = useRecordContext();

    // begins the component's rendering logic.
    // It uses a ternary conditional (record ? ... : null) to check if the record variable holds a truthy value
    return record ? (
        // renders the following JSX 
        <Link href={record[source]} sx={{ textDecoration: "none" }}>
            {record[source]}
            <LaunchIcon sx={{ fontSize: 15, ml: 1}} />
        </Link>
    ) : null;
};

export default MyUrlField;