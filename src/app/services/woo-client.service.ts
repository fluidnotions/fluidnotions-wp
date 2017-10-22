import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';

@Injectable()
export class WooClientService {

   WooCommerce: any;

  constructor() {
    
    this.WooCommerce = WC({
      url: "http://localhost:8080/wordpress/",
      consumerKey: "ck_766810a67312c669ac445c3d45602664219f4450",
      consumerSecret: "cs_10fabd464bdba04b3e385aa3da4b2527ecfb1d34"
    });
  }

  initialize(){
    return this.WooCommerce;
  }

}
