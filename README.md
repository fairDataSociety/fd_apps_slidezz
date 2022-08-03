# Fair Drive Apps Slideshow

a Slideshow dapp that connects to Fairdrive.



## Installation

1. Clone the repo

2. Go inside the app folder

3. Install dependencies

   ```bash
   yarn
   ```

 4. Run the development server

    ```bash
    yarn dev
    ```

 5. Build and start the server

    ```bash
    yarn build
    yarn start
    ```

    

## Configuration

Create an `.env` file in the root directory and set the following properties:



you can copy the `.env.example` file:

```bash
cp .env.example .env
```



- **NEXT_PUBLIC_BEE_URL** - Address of a bee node
- **NEXT_PUBLIC_BEE_DEBUG_URL** - Address of bee debug API
- **NEXT_PUBLIC_RPC_URL** - Address of RPC provider
- **NEXT_PUBLIC_FDS_REGISTRAR** - FDS registrar contract address
- **NEXT_PUBLIC_ENS_REGISTRY** - ENS Registry contract address
- **NEXT_PUBLIC_PUBLIC_RESOLVER** - Public Resolver contract address



