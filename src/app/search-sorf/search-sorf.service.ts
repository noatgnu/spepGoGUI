import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SearchSorfService {

  constructor(private http: HttpClient) { }

  PostForm(f) {
    console.log(f.value);
    return this.http.post("/request/search-sorf/", f.value, {observe: "response"})
  }
}
