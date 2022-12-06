import { BN, utils, web3 } from "@project-serum/anchor"
import { STAKE_POOL_SEED, NFT_STAKING_PROGRAM_ID, IDENTIFIER_SEED } from "./constants"

// Find stake pool id
export const findStakePoolId = (
    identifier: BN
) => {
    return web3.PublicKey.findProgramAddressSync(
        [
            utils.bytes.utf8.encode(STAKE_POOL_SEED),
            identifier.toArrayLike(Buffer, "le", 8),
        ],
        NFT_STAKING_PROGRAM_ID
    )
}

// Find identifier id
export const findIdentifierId = () => {
    return web3.PublicKey.findProgramAddressSync(
        [
            utils.bytes.utf8.encode(IDENTIFIER_SEED),
        ],
        NFT_STAKING_PROGRAM_ID
    )
}

// Find 