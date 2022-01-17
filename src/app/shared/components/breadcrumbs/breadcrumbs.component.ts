import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationExtras } from '@angular/router';
import { filter, distinctUntilChanged, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

/**
 * This is used to generate Breadcrumbs for Pages.
 * It uses Routes config to generate the Breadcrumb.
 *
 *
 * It utilze these parts to create Breadcrumb in given order:-
 * (lower in order will take precedence)
 *
 * a) breadcrumb property of Components.
 *
 * b) breadcrumb data property from route snapshot.
 *
 *
 * It skips the routes for which breadcrumb property is missing or null in the above given places.
 *
 *
 * To specify root of breadcrumbs to any route, put `__root=true ` in the route Config data property .
 * @export
 * @class BreadcrumbComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  /**
   * It holds the breadcrumbs
   *
   * @type {BreadCrumb[]}
   * @memberof BreadcrumbComponent
   */
  breadcrumbs: BreadCrumb[] = [];
  /**
   * @ignore
   *
   * @type {Subscription}
   * @memberof BreadcrumbComponent
   */
  subs: Subscription;

  /**
   *Creates an instance of BreadcrumbComponent.
   * @param {ActivatedRoute} activatedRoute
   * @param {Router} router
   * @memberof BreadcrumbComponent
   */
  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  /**
   * This intialize the building of Routes
   *
   * @memberof BreadcrumbComponent
   */
  ngOnInit() {
    this.subs = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe((nEnd: NavigationEnd) => {

      const lastMatchedBredIndex = this.breadcrumbs.findIndex(b => {
        return !nEnd.urlAfterRedirects.startsWith(b.url);
      });

      // console.log(this.activatedRoute, this.breadcrumbs);

      // tslint:disable-next-line: no-bitwise
      if (!~lastMatchedBredIndex) {

        this.breadcrumbs = this.buildBreadcrumb(this.activatedRoute.root, this.breadcrumbs.length ? this.breadcrumbs[this.breadcrumbs.length - 1].url : '/', this.breadcrumbs);
      } else {

        this.breadcrumbs = this.buildBreadcrumb(this.activatedRoute.root, this.breadcrumbs[lastMatchedBredIndex - 1].url, this.breadcrumbs.slice(0, lastMatchedBredIndex));
      }
    });
    // for first time navigation
    if (this.router.navigated) {
      this.breadcrumbs = this.buildBreadcrumb(this.activatedRoute.root);
    }
  }
  findChildRoute(root: ActivatedRoute, url, finalUrl) {
    const path = this.resolvePath(root);
    url = path ? `${url}${path}/` : url;
    if (finalUrl !== url && finalUrl.startsWith(url) && root.firstChild) {
      return this.findChildRoute(root.firstChild, url, finalUrl);
    } else {
      return root;
    }
  }
  /**
   * @ignore
   *
   * @memberof BreadcrumbComponent
   */
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  removeLastSlashes(_url: string) {
    const lastSlashIndexOf = (_u: string) => {
      for (let i = _url.length - 1; i >= 0; i--) {
        if (_url[i] !== '/') {
          return i + 1;
        }
      }
    };
    return _url.substring(0, lastSlashIndexOf(_url));
  }


  /**
   * Used to build breadcrumbs array from RouterState tree
   *
   * This function excludes Breadcrumb of two types of routes
   * a) route which don't have data key breadcrumb or its value is false
   * b) if the current breadcrumbs url and label matches the last route's breadcrumb subsequently
   *
   * @param {ActivatedRoute} route
   * @param {string} [url='']  complete appended url from the root of breadcrumbs
   * @param {BreadCrumb[]} [breadcrumbs=[]] all breadcrumbs from the '__root' of breadcrumb
   * @returns {BreadCrumb[]} new Breadcrumb Array
   * @memberof BreadcrumbComponent
   */
  buildBreadcrumb(route: ActivatedRoute, url = '/', breadcrumbs: BreadCrumb[] = []): BreadCrumb[] {
    if (!route.parent) {
      route = this.findChildRoute(route, '/', url);
    }

    let child: ActivatedRoute;
    if (route.firstChild) {
      child = route.firstChild;
    } else {
      // Get query params if any - always for the last segment.
      if (route.snapshot.queryParamMap.keys.length > 0 && breadcrumbs[breadcrumbs.length - 1]) {
        breadcrumbs[breadcrumbs.length - 1].queryParams = route.snapshot.queryParams;
      }
      // Get fragment if any - always for the last segment.
      if (route.snapshot.fragment && breadcrumbs[breadcrumbs.length - 1]) {
        breadcrumbs[breadcrumbs.length - 1].fragment = route.snapshot.fragment;
      }
      return breadcrumbs;
    }
    // skips the url also
    // if (!this.fetchLabel(child)) {
    // return this.buildBreadcrumb(child, url, breadcrumbs);
    // }

    const label = child.routeConfig ? this.fetchLabel(child) : 'Home';
    const path = child.routeConfig ? this.resolvePath(child) : '';
    const newBreadcrumb: BreadCrumb = {
      label: label,
      url: path ? `${url}${path}/` : url
    };

    // groupLog('Breadcrumb', newBreadcrumb.label, newBreadcrumb.url);


    let newbreadcrumbs: BreadCrumb[] = [];
    const _lastBred = breadcrumbs[breadcrumbs.length - 1];

    // little trick to skip empty routes
    if (
      (child.snapshot.data['breadcrumb'] ||
        (child.component && child.component['breadcrumb'])
      ) &&
      !(_lastBred &&
        // remove last added / to correctly match the url
        this.removeLastSlashes(newBreadcrumb.url) === this.removeLastSlashes(_lastBred.url)
        && newBreadcrumb.label === _lastBred.label
      )
    ) {
      if (child.snapshot.data['__root']) {
        newbreadcrumbs = [newBreadcrumb];
      } else {
        newbreadcrumbs = [...breadcrumbs, newBreadcrumb];
      }
    } else {
      newbreadcrumbs = [...breadcrumbs];
    }
    // console.log(newBreadcrumb);

    // if (child.firstChild) {
    // return this.buildBreadcrumb(route.firstChild, newBreadcrumb.url, newbreadcrumbs);
    // }
    return this.buildBreadcrumb(child, newBreadcrumb.url, newbreadcrumbs);
  }
  openPageWithBreadcrumb($event: MouseEvent, index: number) {
    $event.stopImmediatePropagation();
    $event.stopPropagation();
    $event.preventDefault();

    let navigationExtras: NavigationExtras;
    if (this.breadcrumbs[index].queryParams) {
      navigationExtras = {
        queryParams: this.breadcrumbs[index].queryParams
      };
    }
    if (this.breadcrumbs[index].fragment) {
      if (!navigationExtras) {
        navigationExtras = {};
      }
      navigationExtras.fragment = this.breadcrumbs[index].fragment;
    }

    else {
      if (navigationExtras) {
        this.router.navigate([this.breadcrumbs[index].url], navigationExtras);
      }
      else {
        this.router.navigate([this.breadcrumbs[index].url]);
      }
    }
    return false;
  }
  /**
   * Fetches the Label of BreadCrumb from the places given in Class description
   * @see {@link BreadcrumbComponent} for Place order of breadcrumb lookup
   *
   * @param {ActivatedRoute} route
   * @returns {string} the Label
   * @memberof BreadcrumbComponent
   */
  fetchLabel(route: ActivatedRoute): string {
    let breadcrumbLabel = '';
    if (route.snapshot.data['_root']) {
      breadcrumbLabel = 'Home';
    } else {
      breadcrumbLabel = (route.component ? route.component['breadcrumb'] : route.snapshot.data['breadcrumb']) || route.snapshot.data['breadcrumb'];
    }
    return breadcrumbLabel;
  }

  /**
   * Resolve the path of the route and assign it to url of particular Breadcrumb
   * it uses {@link API#parseUrl} method to create the resolved url as An Url can include
   * route parameter
   *
   * @param {ActivatedRoute} route
   * @returns {string} url for a Breadcrumb
   * @memberof BreadcrumbComponent
   */
  resolvePath(route: ActivatedRoute): string {
    // console.log(this.fetchLabel(route), route.snapshot.url.map(s => s.path).join('/'));
    // return API.parseUrl(route.routeConfig.path, route.snapshot.params)
    return route.snapshot.url.map(s => s.path).join('/');
  }
  serilizeUrl(breadcrumb) {
    return this.router.serializeUrl(this.router.createUrlTree([breadcrumb.url], { fragment: breadcrumb.fragment, queryParams: breadcrumb.queryParams }));
  }
}

/**
 * Breadcrumb interface
 *
 * @export
 * @interface BreadCrumb
 */
export interface BreadCrumb {
  label: string;
  url: string;
  queryParams?: any;
  fragment?: any;
}
