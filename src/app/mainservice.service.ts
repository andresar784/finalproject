import { EventEmitter, Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Order } from './order.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MainService {
  orderListChangedEvent = new Subject<Order[]>();
  orderSelectedEvent = new EventEmitter<Order>();
  orderChangedEvent = new EventEmitter<Order[]>();
  private orders: Order[] = [];
  private ordersUpdated = new Subject<Order[]>();
  

  constructor(private http: HttpClient, private router: Router) { } 

  getOrders(): Order[] {
    this.http.get('http://localhost:3000/')
      .subscribe({
        next: (documents: Order[]) => {
          console.log(documents)
          this.orders = documents;
          //this.maxDocumentId = this.getMaxId();
          this.orders.sort((a, b) => (a.medicine < b.medicine) ? 1 : (a.medicine > b.medicine) ? -1 : 0);
          this.orderListChangedEvent.next(this.orders.slice());
        },
        error: (e) => console.log(e.message),
      }); 
    return null;
  }
  
  getOrder(id: string) {
    return this.orders.find((orders) => orders.id == id)
  }


  deleteOrder(order: Order) {
    if (!order) {
      return;
    }
    const pos = this.orders.findIndex(d => d.id === order.id);
    if (pos < 0) {
      return;
    }
    // delete from database
    this.http.delete('http://localhost:3000/' + order.id)
      .subscribe(
        () => {
          this.orders.splice(pos, 1);
          this.orders.sort((a, b) => a.medicine < b.medicine ? -1 : 0);
          this.orderChangedEvent.next(this.orders.slice());
          //this.sortAndSend();
        }
      );
  }

  getMaxId(): number {
    let maxId = 0;
    for (let doc of this.orders) {
      let currentId = +doc.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addOrder(order: Order) {
    if (!order) {
      return;
    }
    // make sure id of the new Document is empty
    order.id = '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // add to database
    this.http.post<{ medicine: string, orders: Order }>('http://localhost:3000/',
      order,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.orders.push(responseData.orders);
          this.orders.sort((a, b) => a.medicine < b.medicine ? -1 : 0);
          this.orderChangedEvent.next(this.orders.slice());
          //this.sortAndSend();
        }
      );
  }

 updateOrder(originalOrder: Order, newOrder: Order) {
    if (!originalOrder || !newOrder) {
      return;
    }
    const pos = this.orders.findIndex(d => d.id === originalOrder.id);
    if (pos < 0) {
      return;
    }
    // set the id of the new Document to the id of the old Document
    newOrder.id = originalOrder.id;
    // newDocument._id = originalDocument._id;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // update database
    this.http.put('http://localhost:3000/' + originalOrder.id,
      newOrder, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.orders[pos] = newOrder;
          this.orders.sort((a, b) => a.medicine < b.medicine ? -1 : 0);
          this.orderChangedEvent.next(this.orders.slice());
          //this.sortAndSend();
        }
      );
  }

  storeOrder() {
    let ordersToStore = JSON.stringify(this.orders);
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application-json'
    // })
    this.http.put('http://localhost:3000/', ordersToStore,
    {
       headers: new HttpHeaders({'Content-Type': 'application-json'})
    }).subscribe(()=>{
        this.orderListChangedEvent.next(this.orders);
      })
  }
}
