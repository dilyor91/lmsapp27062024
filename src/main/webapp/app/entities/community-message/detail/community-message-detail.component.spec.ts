import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { CommunityMessageDetailComponent } from './community-message-detail.component';

describe('CommunityMessage Management Detail Component', () => {
  let comp: CommunityMessageDetailComponent;
  let fixture: ComponentFixture<CommunityMessageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityMessageDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./community-message-detail.component').then(m => m.CommunityMessageDetailComponent),
              resolve: { communityMessage: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CommunityMessageDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityMessageDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load communityMessage on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CommunityMessageDetailComponent);

      // THEN
      expect(instance.communityMessage()).toEqual(expect.objectContaining({ id: 123 }));
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
