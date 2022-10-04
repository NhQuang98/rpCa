import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DSDetailComponent } from './ds-detail.component';

describe('DS Management Detail Component', () => {
  let comp: DSDetailComponent;
  let fixture: ComponentFixture<DSDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DSDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ dS: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DSDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DSDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load dS on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.dS).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
