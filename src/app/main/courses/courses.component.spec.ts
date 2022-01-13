import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesComponent } from './courses.component';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let span: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    span = fixture.nativeElement.querySelector('span');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setMessage printing "Hello there" in span tag', () => {
    component.setMessage("Hello there");
    fixture.detectChanges();
    expect(span.textContent).toBe(component.message);
  });

  it('setMessage printing "See you soon" in span tag', () => {
    component.setMessage("See you soon");
    fixture.detectChanges();
    expect(span.textContent).toBe(component.message);
  })
});
