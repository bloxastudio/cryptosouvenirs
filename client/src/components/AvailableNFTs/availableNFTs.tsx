import { useState } from "react";
import { useSelector } from "react-redux";
import { Stack, Text, Button, Table, Title, Modal } from "@mantine/core";
import { useAvailableNFTs } from "@hooks/useAvailableNFTs";
import { AppState } from "@redux/store";
import Mint from "@components/Mint";

const AvailableNFTs = () => {
  const position = useSelector((state: AppState) => state.data.position);
  const { data, loading, getAvailableNFTs } = useAvailableNFTs({ position });
  const [selectedNFT, setSelectedNFT] = useState<AvailableNFT | null>(null);

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
                <th>{""}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((availableNFT, index) => {
                const { rowKey, latitude, longitude } = availableNFT;
                return (
                  <tr key={index}>
                    <td>{rowKey}</td>
                    <td>{latitude}</td>
                    <td>{longitude}</td>
                    <td>
                      <Button size="sm" variant="light" onClick={() => setSelectedNFT(availableNFT)}>
                        {"Mint"}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      ) : (
        data && <Text>{"No NFTs in you area."}</Text>
      )}
      <Modal opened={!!selectedNFT} onClose={() => setSelectedNFT(null)} title={selectedNFT ? `Mint NFT ${selectedNFT.rowKey}` : ""}>
        {!!selectedNFT && <Mint nft={selectedNFT} onDismiss={() => setSelectedNFT(null)} />}
      </Modal>
    </Stack>
  );
};

export default AvailableNFTs;
