import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class PostsService {

  constructor(private http: HttpClient) { }

  get(id?: number) {
    return this.http.get(`${environment.API_JSON_PLACEHOLDER}/posts${id ? '/'+id : ''}`);
  }
}
