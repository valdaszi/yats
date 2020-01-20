import { Component, OnInit, OnDestroy } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router'
import { Subscription, merge } from 'rxjs'
import { filter, map, switchMap } from 'rxjs/operators'

import { TranslateService } from '@ngx-translate/core'

import { Logger, I18nService } from '@app/core'
import { IconService } from '@app/core/services/icon.service'
import { environment } from '@environments/environment'

const log = new Logger('App')

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'YATS'

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translateService: TranslateService,
    private i18nService: I18nService,
    private iconService: IconService
  ) { }

  ngOnInit() {
    // Setup logger - disable debug and info logs in production
    if (environment.production) {
      Logger.enableProductionMode()
    }

    log.debug('init')

    // Load icons
    this.iconService.registerIcons()

    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages)

    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd))

    // Change page title on navigation or language change, based on route data
    merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute
          while (route.firstChild) {
            route = route.firstChild
          }
          return route
        }),
        filter(route => route.outlet === 'primary'),
        switchMap(route => route.data),
        // untilDestroyed(this)
      )
      .subscribe(event => {
        const title = event.title
        if (title) {
          this.titleService.setTitle(this.translateService.instant(title))
        }
      })
  }

  ngOnDestroy() {
    this.i18nService.destroy()
  }
}
