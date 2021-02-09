import { TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthService } from 'app/services';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['isLoggedIn']) },
        { provide: Router, useValue: { navigate: jasmine.createSpy('Router.navigate') } }
      ]
    });
  }));

  beforeEach(() => {
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
