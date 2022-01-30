import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PostsComponent } from './posts.component';
import { PostsService } from './shared/services/posts.service';
import { Observable, of } from 'rxjs';
import { GET_POSTS } from './shared/__mocks__/posts.mock';
import { IPost } from './shared/interfaces/posts.interface';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let spyPostsServiceGet: jest.SpyInstance<Observable<IPost[]>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ PostsService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be the string Posts', () => {
    expect(component.pageTitle).toEqual('Posts');
  });

  describe('[method] -> ngOnInit', () => {

    it('should call getPosts method', () => {
      let spyGetPosts =  jest.spyOn(component, 'getPosts');
      component.ngOnInit();
      expect(spyGetPosts).toHaveBeenCalled();
      expect(spyGetPosts).toHaveReturnedTimes(1);
    });

  });

  describe('[method] -> getPosts', () => {

    beforeEach(() => {
      spyPostsServiceGet = jest.spyOn(component['postsService'], 'get').mockReturnValue(of(GET_POSTS));
    });

    // Como testar chamada de serviços dentro de uma metodo
    it('should call postsService.get method', fakeAsync(() => {
      component.getPosts();
      tick(); // usamos antes de começarmos a validar os testes
      expect(spyPostsServiceGet).toHaveBeenCalled();      
      expect(spyPostsServiceGet).toHaveBeenCalledTimes(1);      
    }));

    it('should receive posts from service', fakeAsync (() => {

      expect(component.posts.length).toEqual(0);
      component.getPosts();

      tick();
      
      expect(component.posts.length).toEqual(1);
      expect(component.posts).toEqual(GET_POSTS);
    }));
  });

});
