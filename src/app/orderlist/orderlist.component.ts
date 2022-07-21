import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MainService } from '../mainservice.service';
import { Order } from '../order.model';

@Component({
  selector: 'finalproject-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  private subscription: Subscription;
  orders: Order[] = [];
  constructor(private service: MainService) { }

  ngOnInit(): void {
    this.service.orderChangedEvent
    .subscribe((
      orders: Order[]) => {
        this.orders = orders;
      }
    )
    this.orders = this.service.getOrders();
    this.subscription = this.service.orderListChangedEvent
    .subscribe((ordersList: Order[]) => {
      this.orders = ordersList;
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
