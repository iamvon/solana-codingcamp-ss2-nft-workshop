const fs = require("fs");
const idl = require("../target/idl/nft_staking.json");

fs.writeFileSync("config/idl.json", JSON.stringify(idl));
fs.copyFileSync(
  "../target/types/nft_staking.ts",
  "config/nft_staking.ts"
);