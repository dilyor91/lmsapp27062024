import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { WikiPageDetailComponent } from './wiki-page-detail.component';

describe('WikiPage Management Detail Component', () => {
  let comp: WikiPageDetailComponent;
  let fixture: ComponentFixture<WikiPageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WikiPageDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: WikiPageDetailComponent,
              resolve: { wikiPage: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(WikiPageDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiPageDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load wikiPage on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', WikiPageDetailComponent);

      // THEN
      expect(instance.wikiPage()).toEqual(expect.objectContaining({ id: 123 }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
