import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { NEVER } from 'rxjs';

import { AuthService } from 'app/services';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: AuthService, useValue: { isLoggedIn: () => NEVER } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
