import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { CommunityTagDetailComponent } from './community-tag-detail.component';

describe('CommunityTag Management Detail Component', () => {
  let comp: CommunityTagDetailComponent;
  let fixture: ComponentFixture<CommunityTagDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityTagDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./community-tag-detail.component').then(m => m.CommunityTagDetailComponent),
              resolve: { communityTag: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CommunityTagDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityTagDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load communityTag on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CommunityTagDetailComponent);

      // THEN
      expect(instance.communityTag()).toEqual(expect.objectContaining({ id: 123 }));
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
