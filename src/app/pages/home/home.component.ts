import { Component, OnInit } from '@angular/core';
import * as solanaWeb3 from '@solana/web3.js';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  

  constructor() { 
    this.getSolana()
  }

  ngOnInit(): void {
  }

  getSolana() {
    console.log(solanaWeb3);
  }

}
