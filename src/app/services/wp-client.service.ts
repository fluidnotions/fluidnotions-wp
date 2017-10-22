import { ConfigureService } from 'ng4-configure/ng4-configure';
import { isNullOrUndefined } from 'util';
import { Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/from';

@Injectable()
export class WpClientService {

  private static parseContentResponse(post: any, featuredImgUrl: string, contentName?: string): ContentItem {
    return new ContentItem(contentName, post["title"]["rendered"], post["content"]["rendered"], featuredImgUrl);
  }


  private baseUrl: string;
  baseRest: string;

  constructor(private http: Http, private configService: ConfigureService) {
    this.baseUrl = `${configService.config.host.PROTOCOL}://${configService.config.host.HOST_NAME}:${configService.config.host.PORT}/${configService.config.host.SUB_DIR}`;
    this.baseRest = `${this.baseUrl}/wp-json/`;
    // this.getContentCategoryIdFromSlug("").subscribe();
  }

  prefixWithBaseUrl(relative: string): string {
    let url = `${this.baseUrl}/${relative}`;
    console.log("url: " + url);
    return url;
  }

  // currently unable to handle mixed some with media some without
  // due to issues rxjs concat
  getContent(req: ContentRequest): Observable<ContentItem[]> {
    console.log("mark: getContent")
    let reqUrl, mediaId;
    if (req.arguments.type === "single") {
      reqUrl = `${this.baseRest}wp/v2/posts/${req.arguments.id}`;
    } else {
      let idStr = String(req.arguments.id);
      reqUrl = `${this.baseRest}wp/v2/posts?categories=${idStr}`;
    }
    return this.http.get(reqUrl)
      .map(response => response.json()).flatMap((posts: any[] | any) => {
        if (!Array.isArray(posts)) {
          posts = [posts];
        }
        if (posts.length > 0) {
          let postsWithMediaId = posts.filter(post => (post["featured_media"] !== 0)) || []
          let postsWithoutMediaId = posts.filter(post => (post["featured_media"] === 0)) || []
          // let postAndMedia = Observable.of([]);
          // either or situation TODO: correct this by combining streams
          if (postsWithMediaId.length > 0) {
            return Observable.forkJoin(
              postsWithMediaId.map((post: any) => {
                return this.http.get(`${this.baseRest}wp/v2/media/${String(post.featured_media)}`)
                  .map((res: any) => {
                    let media: any = res.json();
                    return WpClientService.parseContentResponse(post, media.source_url, req.contentName)
                  })

              })
            );

          } else if (postsWithoutMediaId.length > 0) {
            return Observable.of(postsWithoutMediaId.map(post => {
              return WpClientService.parseContentResponse(post, null, req.contentName)
            }))
          }


        }
        else {
          return Observable.of([]);
        }
      });
  }


  getMenuItems(name: string): Observable<MenuItem[]> {
    return this.http.get(this.baseRest + `fluidnotions/v1/menus/${name}`)
      .map(response => {
        let menu = response.json();
        let ci = menu.items.filter(item => (item["type"] === 'custom'));
        //console.log(JSON.stringify(ci, null, 2));
        return ci;
      });
  }

  getMenus(): Observable<any> {
    return this.http.get(this.baseRest + `fluidnotions/v1/menus/`)
      .map(response => response.json());
  }

  getAllContentItems(): Observable<ContentItem[]> {
    return this.http.get(this.baseRest + "wp/v2/posts")
      .map(response => {
        let posts = response.json();
        console.log(JSON.stringify(posts, null, 2));
        return posts;
      });
  }

  getContentCategoryIdFromSlug(slug: string): Observable<any>{
    return this.http.get(`${this.baseRest}wp/v2/categories?slug=${slug}`)
    .map(response => {
        let cat = response.json();
        console.log(JSON.stringify(cat, null, 2));
        return cat;
      });
  }



}

export class MenuItem {
  constructor(public url: string, public title: string) { }
}

export class ContentItem {
  constructor(public contentName: string, public title: string, public content: string, public featuredImg?: string) { }
}

export class ContentRequest {
  public method: string;
  public arguments: {type: "category" | "single" , slug?: string, id?: number};
  public contentName: string;
}
