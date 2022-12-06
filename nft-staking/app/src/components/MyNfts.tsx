import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Metaplex, Metadata } from '@metaplex-foundation/js';
import { GetImageFromNftUri } from '../../utils';

export const MyNfts: FC = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    const [nfts, setNfts] = useState([])
    const [nftImages, setNftImages] = useState<string[]>([])
    const onClick = useCallback(async () => {
        if (!publicKey) throw new WalletNotConnectedError();
        const metaplex = new Metaplex(connection);
        console.log("publicKey:", publicKey)
        const myNfts = await metaplex.nfts().findAllByOwner({
            owner: publicKey
        });
        console.log("myNfts:", myNfts)
        setNfts(myNfts)
    }, [publicKey, connection]);

    useEffect(() => {

        if (nfts) {
            let nftImgs = nfts.map(async (nft: Metadata) => {
                return await GetImageFromNftUri(nft?.uri)
            })

            Promise.all(nftImgs).then((val) => {
                setNftImages(val)

            }
            )
        }
    }, [nfts])

    return (
        <div>
            <button onClick={onClick} disabled={!publicKey}>
                Show NFTs
            </button>
            <>
                {nfts && nftImages.length != 0 && nfts.map((nft: Metadata, idx) =>
                    <>
                        <h1>{nft.name}</h1>
                        <img
                            src={nft?.json?.image || nftImages[idx]}
                            width="128px"
                            alt="NFT image"
                        />
                    </>
                )
                }
            </>
        </div>
    );
};