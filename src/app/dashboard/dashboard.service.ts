import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { config } from 'src/config/config';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private usersubject = new Subject<boolean>();
  private kotsubject = new Subject<boolean>();
  private tablesubject = new Subject<boolean>();
  private othersubject = new Subject<boolean>();
  private allsubject = new Subject<boolean>();
  bill: any;
  cart: any[];
  constructor(private http: HttpClient) {
    this.cart = [];
  }
  showk(event: any) {
    this.kotsubject.next(event);
  }
  kevents$(): Observable<boolean> {
    return this.kotsubject.asObservable();
  }
  showt(event: any) {
    this.tablesubject.next(event);
  }
  tevents$(): Observable<boolean> {
    return this.tablesubject;
  }
  showall(event: any) {
    this.allsubject.next(event);
  }
  allevents$(): Observable<boolean> {
    return this.allsubject.asObservable();
  }
  showo(event: any) {
    this.othersubject.next(event);
  }

  oevents$(): Observable<any> {
    return this.othersubject.asObservable();
  }
  setCart(cart: any) {
    this.cart = cart;
  }
  getCart() {
    return this.cart;
  }
  addToCart(order: any) {
    this.cart.push(order);
  }
  emptyCart() {
    this.cart = [];
  }
  createUser(user: any): Observable<any> {
    return this.http.post<any>(config.serverUrl + 'users', user, {
      observe: 'response',
    });
  }
  getUser(id: any): Observable<any> {
    return this.http.get<any>(config.serverUrl + 'users/' + id, {
      observe: 'response',
    });
  }
  getAllUsers(offset: any): Observable<any> {
    return this.http.get<any>(config.serverUrl + 'users?offset=' + offset, {
      observe: 'response',
    });
  }
  updateuser(user: any): Observable<any> {
    return this.http.put<any>(config.serverUrl + 'users/update', user, {
      observe: 'response',
    });
  }
  deleteUser(id: any): Observable<any> {
    return this.http.delete<any>(config.serverUrl + 'users/' + id, {
      observe: 'response',
    });
  }
  getAll(offset: any, user: any): Observable<any> {
    return this.http.get<any>(
      config.serverUrl + 'customer-order/' + offset + '/' + user,
      {
        observe: 'response',
      }
    );
  }
  getAllOrders(offset: any, user: any): Observable<any> {
    return this.http.get<any>(
      config.serverUrl + 'customer-order?offset=' + offset + '&user=' + user,
      {
        observe: 'response',
      }
    );
  }
  getOrderById(id: any): Observable<any> {
    return this.http.get<any>(config.serverUrl + 'customer-order/' + id, {
      observe: 'response',
    });
  }
  UpdateOrder(data: any): Observable<any> {
    return this.http.patch<any>(
      config.serverUrl + 'customer-order/update-order/' + data._id,
      data,
      {
        observe: 'response',
      }
    );
  }
  UpdateOrderStatus(data: any): Observable<any> {
    return this.http.patch<any>(
      config.serverUrl + 'customer-order/update-status/' + data._id,
      data,
      {
        observe: 'response',
      }
    );
  }
  update(event: any) {
    this.usersubject.next(event);
  }

  get events$() {
    return this.usersubject.asObservable();
  }
  uploadPfp(id: any, image: any): Observable<any> {
    const formData = new FormData();
    formData.append('photo', image);
    return this.http.post<any>(config.serverUrl + 'users/' + id, formData, {
      observe: 'response',
    });
  }
  createCategory(
    id: any,
    name: any,
    image: any,
    description: any,
    cuisine: any
  ): Observable<any> {
    const formData = new FormData();
    formData.append('photo', image);
    return this.http.post<any>(
      config.serverUrl +
      'users/category/' +
      id +
      '/' +
      name +
      '/' +
      description +
      '/' +
      cuisine,
      formData,
      {
        observe: 'response',
      }
    );
  }
  createOffer(
    id: any,
    name: any,
    image: any,
    description: any,
    price: any,
    items: any
  ): Observable<any> {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('items', JSON.stringify(items));
    formData.append('photo', image);
    return this.http.post<any>(
      config.serverUrl +
      'users/createoffer',
      formData,
      {
        observe: 'response',
      }
    );
  }
  updateCategory(category: any, image: any): Observable<any> {
    const formData = new FormData();
    if (image !== null || image !== undefined) {
      formData.append('photo', image);
    }
    formData.append('category', JSON.stringify(category));
    return this.http.put<any>(
      config.serverUrl +
      'users/category/' +
      category._id +
      '/' +
      category.name +
      '/' +
      category.description +
      '/' +
      category.cuisine,
      formData,
      {
        observe: 'response',
      }
    );
  }
  updateOffer(offer: any, image: any): Observable<any> {
    const formData = new FormData();
    if (image !== null || image !== undefined) {
      formData.append('photo', image);
    }
    formData.append('items', JSON.stringify(offer.items));
    formData.append('name', offer.name);
    formData.append('description', offer.description);
    formData.append('price', offer.price);
    formData.append('id', offer._id);
    return this.http.put<any>(
      config.serverUrl +
      'users/updateoffer',
      formData,
      {
        observe: 'response',
      }
    );
  }
  deleteCategory(userid: any, categoryid: any): Observable<any> {
    return this.http.get<any>(
      config.serverUrl + 'users/deletecategory/' + userid + '/' + categoryid,
      {
        observe: 'response',
      }
    );
  }
  createItem(
    id: any,
    name: any,
    price: any,
    category: any,
    configuration: any,
    image: any,
    addon: any,
    description: any
  ): Observable<any> {
    const formData = new FormData();
    formData.append('photo', image);
    formData.append('id', id);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('config', JSON.stringify(configuration));
    formData.append('addon', JSON.stringify(addon));
    formData.append('description', description);
    return this.http.post<any>(
      config.serverUrl + 'users/insertuseritem/' + id,
      formData,
      {
        observe: 'response',
      }
    );
  }
  updateItemWithPic(
    id: any,
    name: any,
    price: any,
    category: any,
    configg: any,
    addons: any,
    upload: any,
    description: any
  ): Observable<any> {
    const formData = new FormData();
    formData.append('photo', upload);
    formData.append('_id', id);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('config', JSON.stringify(configg));
    formData.append('addons', JSON.stringify(addons));
    return this.http.post<any>(
      config.serverUrl + 'users/updatepictureitemroute',
      formData,
      {
        observe: 'response',
      }
    );
  }
  updateItem(item: any): Observable<any> {
    return this.http.post<any>(
      config.serverUrl + 'users/updateitemrouter',
      item,
      {
        observe: 'response',
      }
    );
  }
  getalldata(id: any): Observable<any> {
    return this.http.get<any>(config.serverUrl + 'users/insertuseritem/' + id, {
      observe: 'response',
    });
  }
  deleteItem(id: any, categoryid: any): Observable<any> {
    return this.http.get<any>(
      config.serverUrl + 'users/deleteuseritem/' + id + '/' + categoryid,
      {
        observe: 'response',
      }
    );
  }
  getAllUserData(): Observable<any> {
    return this.http.get<any>(config.serverUrl + 'users/search', {
      observe: 'response',
    });
  }
  getOrdersById(id: any): Observable<any> {
    return this.http.get<any>(
      config.serverUrl + 'customer-order/orderinfo/' + id,
      {
        observe: 'response',
      }
    );
  }
  getOtherOrdersById(id: any): Observable<any> {
    return this.http.get<any>(
      config.serverUrl + 'customer-order/otherorders/' + id,
      {
        observe: 'response',
      }
    );
  }
  itemInfo(itemid: any): Observable<any> {
    return this.http.get<any>(config.serverUrl + 'item/' + itemid, {
      observe: 'response',
    });
  }
  completeorder(order: any): Observable<any> {
    // order.socketid = localStorage.getItem('socketid');
    return this.http.post<any>(
      config.serverUrl + 'customer-order/completeorder',
      order,
      {
        observe: 'response',
      }
    );
  }
  getorderattable(tableno: any): Observable<any> {
    return this.http.post<any>(
      config.serverUrl + 'customer-order/checktable',
      { tableno: tableno, user: localStorage.getItem('id') },
      {
        observe: 'response',
      }
    );
  }
  getorderatroom(roomno: any): Observable<any> {
    return this.http.post<any>(
      config.serverUrl + 'customer-order/checkroom',
      { roomno: roomno, user: localStorage.getItem('id') },
      {
        observe: 'response',
      }
    );
  }
  getCurrentBill() {
    return this.bill;
  }
  setCurrentBill(bill: any) {
    this.bill = bill;
  }
  bulkUpload(id: any, file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(
      config.serverUrl + 'users/bulkupload/' + id,
      formData,
      {
        observe: 'response',
      }
    );
  }
  updatesocketid(userId: any, socketId: any) {
    return this.http.get<any>(
      config.serverUrl + 'users/setsocketid/' + userId + '/' + socketId,
      {
        observe: 'response',
      }
    );
  }
  search(name: any): Observable<any> {
    return this.http.get<any>(
      config.serverUrl +
      'customer-order/searchitems/' +
      localStorage.getItem('id') +
      '/' +
      name,
      {
        observe: 'response',
      }
    );
  }
  searchuser(name: any): Observable<any> {
    return this.http.get<any>(
      config.serverUrl +
      'users/query/' + name,
      {
        observe: 'response',
      }
    );
  }
  roomstatus(user: any, room: any, status: any): Observable<any> {
    return this.http.post<any>(
      config.serverUrl +
      'room/status', {
      user: user,
      room: room,
      status: status
    },
      {
        observe: 'response',
      }
    );
  }
  roomstatusupdate(roomid: any, status: any): Observable<any> {
    return this.http.put<any>(
      config.serverUrl +
      'room/status', {
      roomid: roomid,
      status: status
    },
      {
        observe: 'response',
      }
    );
  }
  getroomstatus(user: any, room: any): Observable<any> {
    return this.http.get<any>(
      config.serverUrl +
      'room/status?user=' + user + '&room=' + room,
      {
        observe: 'response',
      }
    );
  }
  rooms(user: any): Observable<any> {
    return this.http.get<any>(
      config.serverUrl +
      'room/' + user,
      {
        observe: 'response',
      }
    );
  }
  roomorders(user: any): Observable<any> {
    return this.http.get<any>(
      config.serverUrl +
      'room/orders/' + user,
      {
        observe: 'response',
      }
    );
  }
  bestselling(itemid: any, status: any): Observable<any> {
    return this.http.post<any>(
      config.serverUrl + 'customer-order/changebestsellingstatus',
      {
        itemid: itemid,
        status: status
      },
      {
        observe: 'response',
      }
    );
  }
  loadoffers(id: any): Observable<any> {
    return this.http.get<any>(
      config.serverUrl + 'users/getoffers/' + id,
      {
        observe: 'response',
      }
    );
  }
}
