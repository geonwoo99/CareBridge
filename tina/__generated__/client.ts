import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ cacheDir: '/Users/gogeon-u/Carebridge/tina/__generated__/.cache/1780543359673', url: 'http://localhost:4001/graphql', token: '', queries,  });
export default client;
  