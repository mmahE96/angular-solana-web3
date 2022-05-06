import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  Connection,
  RpcResponseAndContext,
  SignatureResult,
} from '@solana/web3.js';

@Component({
  selector: 'app-airdrop',
  templateUrl: './airdrop.component.html',
  styleUrls: ['./airdrop.component.css'],
})
export class AirdropComponent implements OnInit {
  airdropPublic: string = '';
  airdropAmount: string = '';
  confirmation!: RpcResponseAndContext<SignatureResult>;
  @Input() connection!: Connection;

  constructor() {}

  ngOnInit(): void {}

  async onSubmitAirdrop(form: NgForm) {
    console.log(form);
    console.log(
      'Airdrop form subbmited! Entering two values to activateAIRDROP:',
      form.form.value.publicKey,
      LAMPORTS_PER_SOL
    );

    this.airdropPublic = form.form.value.publicKey;
    this.airdropAmount = form.form.value.amount;
    console.log(
      'Just checking type of form.form.value.publicKey',
      form.form.value.publicKey
    );

    //function belowe works with form.form.value.publicKey as first parameter, trying values from input

    //if you want to use address from input, you must create PublicKey object from it,
    //and then you can use that object in component
    let pubk = new PublicKey(form.value.publicKey);
    console.log(pubk);
    await this.activateAirdrop(pubk);
  }

  async activateAirdrop(publicKey: PublicKey) {
    console.log(
      'Airdrop function activated with value.publicKey and amount' +
        'RequestAirDrop activated with:',
      publicKey,
      100
    );
    console.log(this.connection);
    let airdropSignature = await this.connection.requestAirdrop(
      publicKey,
      LAMPORTS_PER_SOL
    );

    console.log('Procceding to the confirmTransaction with airdropSignature!');

    this.confirmation = await this.connection.confirmTransaction(
      airdropSignature
    );
    console.log('Confirming airdrop:', this.confirmation);
  }
}
