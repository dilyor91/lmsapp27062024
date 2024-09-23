import { TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IAnnouncementStudentRead } from '../announcement-student-read.model';
import { AnnouncementStudentReadService } from '../service/announcement-student-read.service';

import announcementStudentReadResolve from './announcement-student-read-routing-resolve.service';

describe('AnnouncementStudentRead routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: AnnouncementStudentReadService;
  let resultAnnouncementStudentRead: IAnnouncementStudentRead | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    service = TestBed.inject(AnnouncementStudentReadService);
    resultAnnouncementStudentRead = undefined;
  });

  describe('resolve', () => {
    it('should return IAnnouncementStudentRead returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        announcementStudentReadResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultAnnouncementStudentRead = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultAnnouncementStudentRead).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        announcementStudentReadResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultAnnouncementStudentRead = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toHaveBeenCalled();
      expect(resultAnnouncementStudentRead).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IAnnouncementStudentRead>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        announcementStudentReadResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultAnnouncementStudentRead = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultAnnouncementStudentRead).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
