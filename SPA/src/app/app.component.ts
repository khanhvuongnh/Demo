import { Component, OnInit } from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationEnd,
  NavigationStart,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { IconSetService } from '@coreui/icons-angular';
import { cilUser } from '@coreui/icons';
import { NgxSpinnerService } from 'ngx-spinner';
import '@utilities/extension-methods';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  templateUrl: './app.component.html',
  providers: [IconSetService],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    public iconSet: IconSetService,
    private spinnerService: NgxSpinnerService) {
    iconSet.icons = { cilUser };
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      this.navigationInterceptor(evt);
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  navigationInterceptor(e: RouterEvent) {
    if (e instanceof NavigationStart) {
      this.spinnerService.show();
    }

    if (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError) {
      this.spinnerService.hide();
    }
  }
}
