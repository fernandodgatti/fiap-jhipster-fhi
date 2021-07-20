import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SupermercadoDetailComponent } from './supermercado-detail.component';

describe('Component Tests', () => {
  describe('Supermercado Management Detail Component', () => {
    let comp: SupermercadoDetailComponent;
    let fixture: ComponentFixture<SupermercadoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [SupermercadoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ supermercado: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(SupermercadoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SupermercadoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load supermercado on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.supermercado).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
