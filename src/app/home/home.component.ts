import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {GetCodonService} from "../get-codon/get-codon.service";
import {Observable} from "rxjs/internal/Observable";
import {UpepCodon} from "../helper/upep-codon";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor() {

  }

  ngOnInit() {

  }

}
