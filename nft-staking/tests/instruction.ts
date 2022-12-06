import { AnchorProvider, Program, Wallet } from "@project-serum/anchor";
import { Connection, PublicKey, SystemProgram, TransactionInstruction } from "@solana/web3.js";
import { NFT_STAKING_PROGRAM_ID, STAKE_POOL_SEED, NFT_STAKING_PROGRAM, NFT_STAKING_IDL } from "./constants";

export const initPoolIdentifier = async (
    connection: Connection,
    wallet: Wallet,
    params: {
        identifierId: PublicKey
    }
): Promise<TransactionInstruction> => {
    const provider = new AnchorProvider(connection, wallet, {})
    const nftStakingProgram = new Program<NFT_STAKING_PROGRAM>(
        NFT_STAKING_IDL,
        NFT_STAKING_PROGRAM_ID,
        provider
    )
    return nftStakingProgram.methods.initIdentifier().accounts({
        identifier: params.identifierId,
        payer: wallet.publicKey,
        systemProgram: SystemProgram.programId
    }).instruction()
}

export const initStakePool = async (
    connection: Connection,
    wallet: Wallet,
    params: {
        identifierId: PublicKey,
        stakePoolId: PublicKey
    }
): Promise<TransactionInstruction> => {
    const provider = new AnchorProvider(connection, wallet, {})
    const nftStakingProgram = new Program<NFT_STAKING_PROGRAM>(
        NFT_STAKING_IDL,
        NFT_STAKING_PROGRAM_ID,
        provider
    )

    return nftStakingProgram.methods.initStakePool().accounts({
        stakePool: params.stakePoolId,
        payer: wallet.publicKey,
        identifier: params.identifierId,
        systemProgram: SystemProgram.programId
    }).instruction()
}