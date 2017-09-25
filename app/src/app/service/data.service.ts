import {Injectable} from '@angular/core';
import {VPNClient} from "../model/vpn.client";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";

import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {

  private vpnClientUrl = '/api/?json=true';

  constructor(private http: Http) {
  }

  public getVPNClients(): Observable<VPNClient[]> {
    return this.http.get(this.vpnClientUrl)
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
