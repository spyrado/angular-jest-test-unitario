import { Component, OnInit } from '@angular/core';
import { PostsService } from './shared/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers: [
    PostsService
  ]
})
export class PostsComponent implements OnInit {

  pageTitle = 'Posts';

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postsService
      .get()
      .subscribe(
        {
          next: (posts) => console.log(posts),
          error: (error) => console.log(error)
        }
      );
  }

}
