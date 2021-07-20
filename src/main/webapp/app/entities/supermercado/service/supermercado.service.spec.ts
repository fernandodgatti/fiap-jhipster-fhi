import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISupermercado, Supermercado } from '../supermercado.model';

import { SupermercadoService } from './supermercado.service';

describe('Service Tests', () => {
  describe('Supermercado Service', () => {
    let service: SupermercadoService;
    let httpMock: HttpTestingController;
    let elemDefault: ISupermercado;
    let expectedResult: ISupermercado | ISupermercado[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(SupermercadoService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nome: 'AAAAAAA',
        cnpj: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Supermercado', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Supermercado()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Supermercado', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nome: 'BBBBBB',
            cnpj: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Supermercado', () => {
        const patchObject = Object.assign(
          {
            cnpj: 'BBBBBB',
          },
          new Supermercado()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Supermercado', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nome: 'BBBBBB',
            cnpj: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Supermercado', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addSupermercadoToCollectionIfMissing', () => {
        it('should add a Supermercado to an empty array', () => {
          const supermercado: ISupermercado = { id: 123 };
          expectedResult = service.addSupermercadoToCollectionIfMissing([], supermercado);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(supermercado);
        });

        it('should not add a Supermercado to an array that contains it', () => {
          const supermercado: ISupermercado = { id: 123 };
          const supermercadoCollection: ISupermercado[] = [
            {
              ...supermercado,
            },
            { id: 456 },
          ];
          expectedResult = service.addSupermercadoToCollectionIfMissing(supermercadoCollection, supermercado);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Supermercado to an array that doesn't contain it", () => {
          const supermercado: ISupermercado = { id: 123 };
          const supermercadoCollection: ISupermercado[] = [{ id: 456 }];
          expectedResult = service.addSupermercadoToCollectionIfMissing(supermercadoCollection, supermercado);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(supermercado);
        });

        it('should add only unique Supermercado to an array', () => {
          const supermercadoArray: ISupermercado[] = [{ id: 123 }, { id: 456 }, { id: 65650 }];
          const supermercadoCollection: ISupermercado[] = [{ id: 123 }];
          expectedResult = service.addSupermercadoToCollectionIfMissing(supermercadoCollection, ...supermercadoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const supermercado: ISupermercado = { id: 123 };
          const supermercado2: ISupermercado = { id: 456 };
          expectedResult = service.addSupermercadoToCollectionIfMissing([], supermercado, supermercado2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(supermercado);
          expect(expectedResult).toContain(supermercado2);
        });

        it('should accept null and undefined values', () => {
          const supermercado: ISupermercado = { id: 123 };
          expectedResult = service.addSupermercadoToCollectionIfMissing([], null, supermercado, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(supermercado);
        });

        it('should return initial array if no Supermercado is added', () => {
          const supermercadoCollection: ISupermercado[] = [{ id: 123 }];
          expectedResult = service.addSupermercadoToCollectionIfMissing(supermercadoCollection, undefined, null);
          expect(expectedResult).toEqual(supermercadoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
