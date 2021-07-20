import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CompraDetailComponent } from './compra-detail.component';

describe('Component Tests', () => {
  describe('Compra Management Detail Component', () => {
    let comp: CompraDetailComponent;
    let fixture: ComponentFixture<CompraDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CompraDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ compra: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CompraDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CompraDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load compra on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.compra).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
