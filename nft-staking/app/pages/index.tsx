import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic';
import { MyNfts } from '../src/components/MyNfts';

const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Solana NFT Staking</title>
        <meta name="description" content="Solana NFT Staking" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.walletButtons}>
          <WalletMultiButtonDynamic />
          <MyNfts />
        </div>
      </main>
    </div>
  )
}
