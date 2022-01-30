import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PostsComponent } from './posts.component';
import { PostsService } from './shared/services/posts.service';
import { of } from 'rxjs';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let service: PostsService;
  let httpController: HttpTestingController;

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
      service = TestBed.inject(PostsService);
    });
    
    it('PostsService should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should call postsService.get method', async () => {

      const spyPostsServiceGet = jest.spyOn(component['postsService'], 'get');

      component.getPosts();
      fixture.detectChanges();
      
      expect(spyPostsServiceGet).toHaveBeenCalled();      
      expect(spyPostsServiceGet).toHaveBeenCalledTimes(1);      
    });
  });

});
