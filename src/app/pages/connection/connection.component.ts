import { Component, OnInit } from '@angular/core';
import { Keypair, PublicKey } from '@solana/web3.js';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css'],
})
export class ConnectionComponent implements OnInit {
  keypair!: Keypair;
  pubKey!: PublicKey;
  secretKey!: Uint8Array;
  withSecret!: string;

  constructor() {}

  ngOnInit(): void {}

  async generateKeypair(): Promise<void> {
    this.keypair = Keypair.generate();
    this.secretKey = this.keypair.secretKey;
    this.pubKey = await this.keypair.publicKey;
  }

  generateKeypairWithSecret(): void {
    this.withSecret = 'Not working!';
  }
}
