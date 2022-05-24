# API Server

## Requirements

-   Azurite Table Storage/Docker

## Start in local environment

1. Run `dotnet build` from the _server_ folder.
2. Start [Azurite Emulator (Azure Table Storage)](https://docs.microsoft.com/en-us/azure/storage/common/storage-use-azurite) or run in docker with:
    1. `docker pull mcr.microsoft.com/azure-storage/azurite`
    2. `docker run -p 10002:10002 mcr.microsoft.com/azure-storage/azurite`
3. Start the application `dotnet run --project Cryptosouvenirs`

### OR

1. Start the app with Visual Studio.
