import { PublicKey } from "@solana/web3.js";
import * as NFT_STAKING_TYPES from "../target/types/nft_staking"

export const NFT_STAKING_PROGRAM_ID = new PublicKey("92Uesmw2wPEL9hHqTLmxSupCjKkr6nadWLUYKzjvQ8mg")
export const IDENTIFIER_SEED = "identifier";
export const STAKE_POOL_SEED = "stake-pool"
export const NFT_STAKING_IDL = NFT_STAKING_TYPES.IDL
export type NFT_STAKING_PROGRAM = NFT_STAKING_TYPES.NftStaking