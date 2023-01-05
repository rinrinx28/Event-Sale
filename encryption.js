var CryptoJS = require("crypto-js");
require("dotenv").config();

//TODO ———————————————[Config SecretKey]———————————————
var secretkey = process.env.secretkey;
var secretkeyHash = CryptoJS.SHA256(secretkey).toString(CryptoJS.enc.Hex);
//TODO ————————————————————————————————————————————————

var string =
  "U2FsdGVkX1/WCIC9QAXRPxuGCDV7ETnuIbZwZHQSNB4hIhKBv7PM3sa7fCIVKrDGcTK7+p8Eb8yQPC3WxugKh4CPMIrqwBvJjMkDmsGKxFnn0gYQieKysOVbaMiTfdmiGiqmoRZlf2IJEonwP5i5jPwElbbI5PqI0X6SC7r4YqHQKmSuiTrMUFvGPZnY9X0nZQH0WoYZsaXJfyYbEIULS4okWbpZ1sZ1dA4/UMxIyHWVjm6pWqlLYMYKOVPIWjEFjwaOL+ZB94O6a9RbccybdHq+vEREdy3z6UyqblgXF0nnWHyzpveJC6ztK0MH2YAt1aaJBC6vQosvDD9mvyGvE6kuL/Q0AHO8YK3136zQ91/2qPXX7LMJEq2+iV2QjrqXRoKoz4U60ROBv4dbPczYir/a1PcuoQr5Mn+4zQcT3c9zj35Lq6h2nAh3wTFQFKeJqcUSiY/vqvKuJTJyd+udP4a+VuFlq204cy8b9oc7u81Vlttn8pyApGn5VwhfQVHi65V1KPWmv0ihMOy7ILRDuHXxM76TPGlthSsar1s2tlYj2OWfo1MYHZqhLFmCpUqNaluysh9c2m6piddoWcET3EnfwtHRWgqUdpUtt/0m39TuYIHXvG4oak+asualRtDtHZdVu/Q4oytQpBumkePWuQ==";

console.log(
  JSON.parse(
    CryptoJS.AES.decrypt(string, secretkeyHash).toString(CryptoJS.enc.Utf8),
  ),
);

var uri = "https://ipfs.io/ipfs/";

var string2 = "ipfs://QmZD3Z7HD2hZZty2PVUG7Fn5zHFdrmTc5pSEPzqf88ozjs/813.png";

var check = uri + string2.split("/").slice(2).join("/");

console.log(check);
