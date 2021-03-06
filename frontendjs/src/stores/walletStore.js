import Alpine from 'alpinejs';
import { ethers } from 'ethers';
import { globalStore } from './globalStore';

export let walletStore = {
  name: 'wallet',
  obj: {
    provider: undefined,
    wallet: undefined,
    walletAddress: undefined,
    isConnected: false,

    async connect() {
      try {
        this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
        await this.provider.send('eth_requestAccounts', []);

        this.wallet = this.provider.getSigner();
        this.walletAddress = await this.wallet.getAddress();

        // Now, setup global/constant contracts with this wallet
        Alpine.store(globalStore.name).connect(this.wallet);

        this.isConnected = true;
        console.log('Metamask Connected!');
      } catch (error) {
        console.log(error);
      }
    },

    toggleConnection() {
      if (this.isConnected) {
        this.wallet = undefined;
        this.walletAddress = undefined;
        this.isConnected = false;
      } else {
        this.connect();
      }
    },
  },
};
