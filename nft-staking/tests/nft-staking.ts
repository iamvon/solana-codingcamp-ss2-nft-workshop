import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { clusterApiUrl, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction, LAMPORTS_PER_SOL, Connection } from "@solana/web3.js";
import { BN } from "bn.js";
import { getAssociatedTokenAddress, getOrCreateAssociatedTokenAccount, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { NftStaking } from "../target/types/nft_staking";
const fs = require("fs");
import { findIdentifierId, findStakePoolId } from "./pda"

describe("nft-staking", () => {
  let newAnchorProvider = anchor.AnchorProvider.env()
  newAnchorProvider.opts.skipPreflight = true
  anchor.setProvider(newAnchorProvider);
  const connection = new anchor.web3.Connection(clusterApiUrl("devnet"), "confirmed")
  const program = anchor.workspace.NftStaking as Program<NftStaking>;
  const staker = getWalletFromFile("/Users/tuanpm/codingcamp/staker.json")

  it("Stake NFT", async () => {
    let stakerBalance = await connection.getBalance(staker.publicKey, 'confirmed');
    console.log("Staker wallet:", staker.publicKey.toBase58())
    console.log("Balance staker wallet:", stakerBalance / LAMPORTS_PER_SOL)

    const latestBlockhash = await connection.getLatestBlockhash("confirmed")

    let identifierId = findIdentifierId()
    console.log("identifierId:", identifierId[0].toBase58())

    let isPdaExisted = await checkPdaExisted(identifierId[0], connection)
    if (isPdaExisted) {
      console.log("Identifier Pda existed")
    } else {
      console.log("Pda not existed")
      // Init pool identifier tx
      let initIdentifierIx = await program.methods.initIdentifier().accounts({
        identifier: identifierId[0],
        payer: staker.publicKey,
        systemProgram: SystemProgram.programId
      }).instruction()

      const tx1 = new Transaction()
      tx1.add(initIdentifierIx)

      tx1.recentBlockhash = latestBlockhash.blockhash
      tx1.feePayer = staker.publicKey

      const tx1Id = await sendAndConfirmTransaction(connection, tx1, [staker.payer])
      console.log("initIdentifier signature:", tx1Id);
    }

    // Init stake pool tx
    let poolIdentifierData = await program.account.identifier.fetch(identifierId[0])
    let identifier = poolIdentifierData?.count || new anchor.BN(1)
    console.log("identifier count:", poolIdentifierData?.count);
    let stakePoolId = findStakePoolId(identifier)
    console.log("stakePoolId:", stakePoolId[0].toBase58())
    let initStakePoolIx = await program.methods.initStakePool().accounts({
      stakePool: stakePoolId[0],
      payer: staker.publicKey,
      identifier: identifierId[0],
      systemProgram: SystemProgram.programId
    }).instruction()

    const tx2 = new Transaction()
    tx2.add(initStakePoolIx)
    tx2.recentBlockhash = latestBlockhash.blockhash
    tx2.feePayer = staker.publicKey

    const tx2Id = await sendAndConfirmTransaction(connection, tx2, [staker.payer])
    console.log("initStakePool signature:", tx2Id);

    // Stake NFT tx
    let nftOriginalMint = new PublicKey("GTz7kgWB41V4pVzdFNvN83iEQf4zLpAvdQhLNHMkwR1t")
    let stakerOriginalMintAta = await getAssociatedTokenAddress(nftOriginalMint, staker.publicKey)
    let stakePoolOriginalMintAta = await getOrCreateAssociatedTokenAccount(connection, staker.payer, nftOriginalMint, stakePoolId[0], true)
    console.log("stakePoolOriginalMintAta:", stakePoolOriginalMintAta.address.toBase58())
    let stakeNftIx = await program.methods.stake(new anchor.BN(1)).accounts({
      stakePool: stakePoolId[0],
      stakePoolOriginalMintAta: stakePoolOriginalMintAta.address,
      originalMint: nftOriginalMint,
      user: staker.publicKey,
      userOriginalMintAta: stakerOriginalMintAta,
      tokenProgram: TOKEN_PROGRAM_ID
    }).instruction()

    const tx3 = new Transaction()
    tx3.add(stakeNftIx)
    tx3.recentBlockhash = latestBlockhash.blockhash
    tx3.feePayer = staker.publicKey

    const tx3Id = await sendAndConfirmTransaction(connection, tx3, [staker.payer])
    console.log("stakeNft signature:", tx3Id);

    // Unstake NFT tx
    let unstakeNftIx = await program.methods.unstake().accounts({
      stakePool: stakePoolId[0],
      stakePoolOriginalMintAta: stakePoolOriginalMintAta.address,
      originalMint: nftOriginalMint,
      user: staker.publicKey,
      userOriginalMintAta: stakerOriginalMintAta,
      tokenProgram: TOKEN_PROGRAM_ID,
      identifier: identifierId[0],
    }).instruction()

    const tx4 = new Transaction()
    tx4.add(unstakeNftIx)
    tx4.recentBlockhash = latestBlockhash.blockhash
    tx4.feePayer = staker.publicKey

    const tx4Id = await sendAndConfirmTransaction(connection, tx4, [staker.payer])
    console.log("unstakeNft signature:", tx4Id);
  });
});

function getWalletFromFile(file: string): anchor.Wallet {
  let secretKeyString = fs.readFileSync(file);
  const secretKey = Uint8Array.from(JSON.parse(secretKeyString))
  return new anchor.Wallet(anchor.web3.Keypair.fromSecretKey(secretKey))
}

const checkPdaExisted = async (pda: PublicKey, connection: Connection) => {
  let pdaBalance = await connection.getBalance(pda)
  if (pdaBalance <= 0) {
    return false
  } else return true
}