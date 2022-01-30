import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostsServiceStub } from 'src/stubs/stubs.mock';

import { PostsComponent } from './posts.component';
import { PostsService } from './shared/services/posts.service';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let postsService: PostsService;

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

    postsService = TestBed.inject(PostsService);
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
    });

  });

});
