import { Cluster, clusterApiUrl, Connection } from '@solana/web3.js';

export class ConnectionService {
  connection: Connection;
  defaultNetwork:Cluster | undefined = 'devnet';
  selectedNetwork:Cluster | undefined = 'devnet';

  constructor() {
    this.connection = new Connection(clusterApiUrl(this.defaultNetwork), 'confirmed');
    console.log('Connection established with:', this.defaultNetwork);
  }

  selectNetwork(network:Cluster | undefined){
    this.connection = new Connection(clusterApiUrl(network), 'confirmed');
    console.log('Network successfully changed to:', network);
    this.selectedNetwork = network;
    console.log(this.selectedNetwork)

  }

}
