import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../order.model';

@Component({
  selector: 'finalproject-orderitem',
  templateUrl: './orderitem.component.html',
  styleUrls: ['./orderitem.component.css']
})
export class OrderitemComponent implements OnInit {
  @Input() orders: Order;

  constructor() { }

  ngOnInit(): void {
  }

}
