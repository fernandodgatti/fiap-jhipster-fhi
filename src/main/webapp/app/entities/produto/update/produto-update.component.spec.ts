jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ProdutoService } from '../service/produto.service';
import { IProduto, Produto } from '../produto.model';
import { ICompra } from 'app/entities/compra/compra.model';
import { CompraService } from 'app/entities/compra/service/compra.service';
import { ISupermercado } from 'app/entities/supermercado/supermercado.model';
import { SupermercadoService } from 'app/entities/supermercado/service/supermercado.service';

import { ProdutoUpdateComponent } from './produto-update.component';

describe('Component Tests', () => {
  describe('Produto Management Update Component', () => {
    let comp: ProdutoUpdateComponent;
    let fixture: ComponentFixture<ProdutoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let produtoService: ProdutoService;
    let compraService: CompraService;
    let supermercadoService: SupermercadoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ProdutoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ProdutoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProdutoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      produtoService = TestBed.inject(ProdutoService);
      compraService = TestBed.inject(CompraService);
      supermercadoService = TestBed.inject(SupermercadoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Compra query and add missing value', () => {
        const produto: IProduto = { id: 456 };
        const compras: ICompra[] = [{ id: 60434 }];
        produto.compras = compras;

        const compraCollection: ICompra[] = [{ id: 62643 }];
        jest.spyOn(compraService, 'query').mockReturnValue(of(new HttpResponse({ body: compraCollection })));
        const additionalCompras = [...compras];
        const expectedCollection: ICompra[] = [...additionalCompras, ...compraCollection];
        jest.spyOn(compraService, 'addCompraToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ produto });
        comp.ngOnInit();

        expect(compraService.query).toHaveBeenCalled();
        expect(compraService.addCompraToCollectionIfMissing).toHaveBeenCalledWith(compraCollection, ...additionalCompras);
        expect(comp.comprasSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Supermercado query and add missing value', () => {
        const produto: IProduto = { id: 456 };
        const supermercados: ISupermercado[] = [{ id: 60202 }];
        produto.supermercados = supermercados;

        const supermercadoCollection: ISupermercado[] = [{ id: 47165 }];
        jest.spyOn(supermercadoService, 'query').mockReturnValue(of(new HttpResponse({ body: supermercadoCollection })));
        const additionalSupermercados = [...supermercados];
        const expectedCollection: ISupermercado[] = [...additionalSupermercados, ...supermercadoCollection];
        jest.spyOn(supermercadoService, 'addSupermercadoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ produto });
        comp.ngOnInit();

        expect(supermercadoService.query).toHaveBeenCalled();
        expect(supermercadoService.addSupermercadoToCollectionIfMissing).toHaveBeenCalledWith(
          supermercadoCollection,
          ...additionalSupermercados
        );
        expect(comp.supermercadosSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const produto: IProduto = { id: 456 };
        const compras: ICompra = { id: 10820 };
        produto.compras = [compras];
        const supermercados: ISupermercado = { id: 83037 };
        produto.supermercados = [supermercados];

        activatedRoute.data = of({ produto });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(produto));
        expect(comp.comprasSharedCollection).toContain(compras);
        expect(comp.supermercadosSharedCollection).toContain(supermercados);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Produto>>();
        const produto = { id: 123 };
        jest.spyOn(produtoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ produto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: produto }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(produtoService.update).toHaveBeenCalledWith(produto);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Produto>>();
        const produto = new Produto();
        jest.spyOn(produtoService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ produto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: produto }));
        saveSubject.complete();

        // THEN
        expect(produtoService.create).toHaveBeenCalledWith(produto);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Produto>>();
        const produto = { id: 123 };
        jest.spyOn(produtoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ produto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(produtoService.update).toHaveBeenCalledWith(produto);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackCompraById', () => {
        it('Should return tracked Compra primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCompraById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackSupermercadoById', () => {
        it('Should return tracked Supermercado primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackSupermercadoById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });

    describe('Getting selected relationships', () => {
      describe('getSelectedCompra', () => {
        it('Should return option if no Compra is selected', () => {
          const option = { id: 123 };
          const result = comp.getSelectedCompra(option);
          expect(result === option).toEqual(true);
        });

        it('Should return selected Compra for according option', () => {
          const option = { id: 123 };
          const selected = { id: 123 };
          const selected2 = { id: 456 };
          const result = comp.getSelectedCompra(option, [selected2, selected]);
          expect(result === selected).toEqual(true);
          expect(result === selected2).toEqual(false);
          expect(result === option).toEqual(false);
        });

        it('Should return option if this Compra is not selected', () => {
          const option = { id: 123 };
          const selected = { id: 456 };
          const result = comp.getSelectedCompra(option, [selected]);
          expect(result === option).toEqual(true);
          expect(result === selected).toEqual(false);
        });
      });

      describe('getSelectedSupermercado', () => {
        it('Should return option if no Supermercado is selected', () => {
          const option = { id: 123 };
          const result = comp.getSelectedSupermercado(option);
          expect(result === option).toEqual(true);
        });

        it('Should return selected Supermercado for according option', () => {
          const option = { id: 123 };
          const selected = { id: 123 };
          const selected2 = { id: 456 };
          const result = comp.getSelectedSupermercado(option, [selected2, selected]);
          expect(result === selected).toEqual(true);
          expect(result === selected2).toEqual(false);
          expect(result === option).toEqual(false);
        });

        it('Should return option if this Supermercado is not selected', () => {
          const option = { id: 123 };
          const selected = { id: 456 };
          const result = comp.getSelectedSupermercado(option, [selected]);
          expect(result === option).toEqual(true);
          expect(result === selected).toEqual(false);
        });
      });
    });
  });
});
