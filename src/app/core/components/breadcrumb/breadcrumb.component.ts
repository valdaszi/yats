import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET } from '@angular/router'
import { filter, distinctUntilChanged, map, subscribeOn } from 'rxjs/operators'

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb'

  public breadcrumbs: Breadcrumb[]

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.getBreadcrumbs(this.activatedRoute.root)
        if (this.breadcrumbs && this.breadcrumbs.length > 0) {
          delete this.breadcrumbs[this.breadcrumbs.length - 1].url
        }
      })
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {

    // get the child routes
    const children: ActivatedRoute[] = route.children

    // return if there are no more children
    if (children.length === 0) {
      return breadcrumbs
    }

    // iterate over each children
    for (const child of children) {
      // verify primary route
      if (child.outlet !== PRIMARY_OUTLET || child.snapshot.url.length === 0) {
        continue
      }

      // verify the custom data property "breadcrumb" is specified on the route and has value
      if (!child.snapshot.data.hasOwnProperty(BreadcrumbComponent.ROUTE_DATA_BREADCRUMB) ||
            !child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_BREADCRUMB]) {
        return this.getBreadcrumbs(child, url, breadcrumbs)
      }

      // get the route's URL segment
      const routeURL = child.snapshot.url.map(segment => segment.path).join('/')

      // append route URL to URL
      url += `/${routeURL}`

      // add breadcrumb
      const breadcrumb: Breadcrumb = {
        label: child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_BREADCRUMB],
        url
      }
      breadcrumbs.push(breadcrumb)

      // recursive
      return this.getBreadcrumbs(child, url, breadcrumbs)
    }
    return breadcrumbs
  }
}

export interface Breadcrumb {
  label: string
  url: string
}
