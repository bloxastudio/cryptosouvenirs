import "react";
import { AppShell, Text, Header, MantineProvider, Container } from "@mantine/core";
import "./App.css";

function App() {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <AppShell
        header={
          <Header height={60} p="xs">
            <Text size="xl" color={"indigo"}>
              {"Cryptosouvenirs"}
            </Text>
          </Header>
        }
        styles={(theme) => ({
          main: {
            minHeight: `calc(100vh - 60px)`,
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
            color: theme.colorScheme === "dark" ? theme.colors.gray[0] : theme.colors.gray[8],
          },
        })}
      >
        <Container>{"Hello Dear World"}</Container>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
