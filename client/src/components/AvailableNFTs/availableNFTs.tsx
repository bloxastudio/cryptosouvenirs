import React from "react";
import { useSelector } from "react-redux";
import { Stack, Text, Button, Table, Title } from "@mantine/core";
import { useAvailableNFTs } from "@hooks/useAvailableNFTs";
import { AppState } from "@redux/store";

const AvailableNFTs = () => {
  const position = useSelector((state: AppState) => state.data.position);
  const { data, loading, getAvailableNFTs } = useAvailableNFTs({ position });

  if (!position) {
    return null;
  }

  return (
    <Stack mt={"lg"}>
      {position && !data && (
        <Button
          onClick={getAvailableNFTs}
          size="lg"
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan" }}
          loading={loading}
          loaderPosition={"left"}
          style={{ display: data && !loading ? "none" : undefined }}
        >
          {"Show available NFTs!"}
        </Button>
      )}
      {data && data.length ? (
        <>
          <Title order={2}>{"NFTs in you area"}</Title>
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>{"Id"}</th>
                <th>{"Latitude"}</th>
                <th>{"Longitude"}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((element, index) => (
                <tr key={index}>
                  <td>{element.id}</td>
                  <td>{element.latitude}</td>
                  <td>{element.longitude}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        data && <Text>{"No NFTs in you area."}</Text>
      )}
    </Stack>
  );
};

export default AvailableNFTs;
