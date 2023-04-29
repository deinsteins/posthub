import { Alert, AlertIcon } from "@chakra-ui/react";

export const CreateAlert = ({ message = "" }) => {
    return (
        <Alert mt={4} status='success'>
            <AlertIcon />
            {message}
        </Alert>
    )
}