import { useState } from "react";
import { useSelector } from "react-redux";
import { Globe as GlobeIcon, Table as TableIcon } from "tabler-icons-react";
import { Stack, Text, Button, Table, Title, Modal, Container, Group, ActionIcon, Grid, Paper } from "@mantine/core";
import { useAvailableNFTs } from "@hooks/useAvailableNFTs";
import { AppState } from "@redux/store";
import Mint from "@components/Mint";
import MapView from "./MapView/mapView";

const AvailableNFTs = () => {
  const position = useSelector((state: AppState) => state.data.position);
  const { data, loading, getAvailableNFTs } = useAvailableNFTs({ position });
  const [selectedNFT, setSelectedNFT] = useState<AvailableNFT | null>(null);
  const [viewType, setViewType] = useState<ViewType>("map");

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
      {data && (
        <>
          <Grid>
            <Grid.Col span={6}>
              <Title order={2}>{"NFTs in you area"}</Title>
            </Grid.Col>
            <Grid.Col span={6} style={{ display: "flex", justifyContent: "flex-end" }}>
              <ActionIcon
                color={"gray"}
                onClick={() => setViewType((curr) => (curr === "map" ? "table" : "map"))}
                title={viewType === "map" ? "View list" : "View map"}
              >
                {viewType === "map" ? <TableIcon /> : <GlobeIcon />}
              </ActionIcon>
            </Grid.Col>
          </Grid>
        </>
      )}
      {data && data.length ? (
        viewType === "table" ? (
          <>
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
          <div>
            <MapView nfts={data} userPosition={position} />
          </div>
        )
      ) : (
        data && <Text>{"No NFTs in you area."}</Text>
      )}
      <Modal opened={!!selectedNFT} onClose={() => setSelectedNFT(null)} title={selectedNFT ? `Mint NFT ${selectedNFT.rowKey}` : ""}>
        {!!selectedNFT && <Mint nft={selectedNFT} onDismiss={() => setSelectedNFT(null)} />}
      </Modal>
    </Stack>
  );
};

export type ViewType = "map" | "table";

export default AvailableNFTs;
