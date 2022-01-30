import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { IPost } from '../interfaces/posts.interface';

@Injectable()
export class PostsService {

  constructor(private http: HttpClient) { }

  get(id?: number) {
    return this.http.get<IPost[]>(`${environment.API_JSON_PLACEHOLDER}/posts${id ? '/'+id : ''}`);
  }
}
