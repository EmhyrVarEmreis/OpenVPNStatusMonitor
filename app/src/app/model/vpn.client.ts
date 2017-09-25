export class VPNClient {
  constructor(public name: String,
              public ipVirtual: String,
              public ipReal: String,
              public lastRefresh: Date,
              public connectedSince: Date,
              public byteRecived: Number) {
  }
}
