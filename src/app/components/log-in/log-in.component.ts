import { ChangeDetectionStrategy, Component, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IOktaTokens } from '@okta/okta-signin-widget';

import { OktaService } from 'app/services/okta.service';

@Component({
  selector: 'app-log-in',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogInComponent implements OnInit, OnDestroy {

  constructor(
    private dialogRef: MatDialogRef<LogInComponent, IOktaTokens>,
    private elementRef: ElementRef,
    private ngZone: NgZone,
    private oktaService: OktaService
  ) { }

  ngOnInit(): void {
    this.oktaService.widget.renderEl(
      { el: this.elementRef.nativeElement },
      response => this.ngZone.run(() => this.dialogRef.close(response))
    );
  }

  ngOnDestroy(): void {
    this.oktaService.widget.remove();
  }
}
