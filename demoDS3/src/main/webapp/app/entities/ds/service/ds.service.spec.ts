import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDS } from '../ds.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../ds.test-samples';

import { DSService } from './ds.service';

const requireRestSample: IDS = {
  ...sampleWithRequiredData,
};

describe('DS Service', () => {
  let service: DSService;
  let httpMock: HttpTestingController;
  let expectedResult: IDS | IDS[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DSService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DS', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    describe('addDSToCollectionIfMissing', () => {
      it('should add a DS to an empty array', () => {
        const dS: IDS = sampleWithRequiredData;
        expectedResult = service.addDSToCollectionIfMissing([], dS);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dS);
      });

      it('should not add a DS to an array that contains it', () => {
        const dS: IDS = sampleWithRequiredData;
        const dSCollection: IDS[] = [
          {
            ...dS,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDSToCollectionIfMissing(dSCollection, dS);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DS to an array that doesn't contain it", () => {
        const dS: IDS = sampleWithRequiredData;
        const dSCollection: IDS[] = [sampleWithPartialData];
        expectedResult = service.addDSToCollectionIfMissing(dSCollection, dS);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dS);
      });

      it('should add only unique DS to an array', () => {
        const dSArray: IDS[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const dSCollection: IDS[] = [sampleWithRequiredData];
        expectedResult = service.addDSToCollectionIfMissing(dSCollection, ...dSArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const dS: IDS = sampleWithRequiredData;
        const dS2: IDS = sampleWithPartialData;
        expectedResult = service.addDSToCollectionIfMissing([], dS, dS2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dS);
        expect(expectedResult).toContain(dS2);
      });

      it('should accept null and undefined values', () => {
        const dS: IDS = sampleWithRequiredData;
        expectedResult = service.addDSToCollectionIfMissing([], null, dS, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dS);
      });

      it('should return initial array if no DS is added', () => {
        const dSCollection: IDS[] = [sampleWithRequiredData];
        expectedResult = service.addDSToCollectionIfMissing(dSCollection, undefined, null);
        expect(expectedResult).toEqual(dSCollection);
      });
    });

    describe('compareDS', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDS(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDS(entity1, entity2);
        const compareResult2 = service.compareDS(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDS(entity1, entity2);
        const compareResult2 = service.compareDS(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDS(entity1, entity2);
        const compareResult2 = service.compareDS(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
