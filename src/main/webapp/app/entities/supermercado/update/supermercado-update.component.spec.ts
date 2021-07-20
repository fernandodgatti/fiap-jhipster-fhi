jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { SupermercadoService } from '../service/supermercado.service';
import { ISupermercado, Supermercado } from '../supermercado.model';

import { SupermercadoUpdateComponent } from './supermercado-update.component';

describe('Component Tests', () => {
  describe('Supermercado Management Update Component', () => {
    let comp: SupermercadoUpdateComponent;
    let fixture: ComponentFixture<SupermercadoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let supermercadoService: SupermercadoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SupermercadoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(SupermercadoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SupermercadoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      supermercadoService = TestBed.inject(SupermercadoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const supermercado: ISupermercado = { id: 456 };

        activatedRoute.data = of({ supermercado });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(supermercado));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Supermercado>>();
        const supermercado = { id: 123 };
        jest.spyOn(supermercadoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ supermercado });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: supermercado }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(supermercadoService.update).toHaveBeenCalledWith(supermercado);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Supermercado>>();
        const supermercado = new Supermercado();
        jest.spyOn(supermercadoService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ supermercado });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: supermercado }));
        saveSubject.complete();

        // THEN
        expect(supermercadoService.create).toHaveBeenCalledWith(supermercado);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Supermercado>>();
        const supermercado = { id: 123 };
        jest.spyOn(supermercadoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ supermercado });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(supermercadoService.update).toHaveBeenCalledWith(supermercado);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
