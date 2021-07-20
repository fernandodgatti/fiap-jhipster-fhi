jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ISupermercado, Supermercado } from '../supermercado.model';
import { SupermercadoService } from '../service/supermercado.service';

import { SupermercadoRoutingResolveService } from './supermercado-routing-resolve.service';

describe('Service Tests', () => {
  describe('Supermercado routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: SupermercadoRoutingResolveService;
    let service: SupermercadoService;
    let resultSupermercado: ISupermercado | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(SupermercadoRoutingResolveService);
      service = TestBed.inject(SupermercadoService);
      resultSupermercado = undefined;
    });

    describe('resolve', () => {
      it('should return ISupermercado returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSupermercado = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultSupermercado).toEqual({ id: 123 });
      });

      it('should return new ISupermercado if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSupermercado = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultSupermercado).toEqual(new Supermercado());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Supermercado })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSupermercado = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultSupermercado).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
