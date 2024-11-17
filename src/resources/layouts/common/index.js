import { Header } from "@/resources/components";
import { Container } from "@mui/material";

export const CommonLayout = ({ children }) => {
    return (
        <>
            <Container maxWidth="lg">
                <Header />
                {children}
            </Container>
        </>
    );
};
