 import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class EncrDecrService {
  constructor() { }
  public key="123456$#@$^@1ERF";
 
  //The set method is use for encrypt the value.
  set(value){
  	if(value){
		    var key = CryptoJS.enc.Utf8.parse(this.key);
		    var iv = CryptoJS.enc.Utf8.parse(this.key);
		    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
		    {
		        keySize: 128 / 8,
		        iv: iv,
		        mode: CryptoJS.mode.CBC,
		        padding: CryptoJS.pad.Pkcs7
		    });

		    return encrypted.toString();
	} else {
		return null;
	}
  }

  //The get method is use for decrypt the value.
  get(value){
  	if(value){
		    var key = CryptoJS.enc.Utf8.parse(this.key);
		    var iv = CryptoJS.enc.Utf8.parse(this.key);
		    var decrypted = CryptoJS.AES.decrypt(value, key, {
		        keySize: 128 / 8,
		        iv: iv,
		        mode: CryptoJS.mode.CBC,
		        padding: CryptoJS.pad.Pkcs7
		    });

		    return decrypted.toString(CryptoJS.enc.Utf8);
  		}else {
  			return null;
  		}
  }
}