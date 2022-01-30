import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
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

    // Como testar chamada de serviços dentro de uma metodo
    it('should call postsService.get method', fakeAsync(() => {

      const data = [
        {
            "userId": 1,
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        }
      ];
      const spyPostsServiceGet = jest.spyOn(component['postsService'], 'get').mockReturnValue(of(data));
      const spyTeste = jest.spyOn(component, 'teste');

      component.getPosts();
      tick(); // usamos antes de começarmos a validar os testes
      
      expect(spyPostsServiceGet).toHaveBeenCalled();      
      expect(spyPostsServiceGet).toHaveBeenCalledTimes(1);      

      expect(spyTeste).toHaveBeenCalled();
    }));
  });

});
