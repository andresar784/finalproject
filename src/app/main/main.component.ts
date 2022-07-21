import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MainService } from '../mainservice.service';
import { Order } from '../order.model';


@Component({
  selector: 'finalproject-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  private subscription: Subscription;
  orders: Order [] = [];

  constructor(private mainService: MainService) {
    
   }

  ngOnInit(): void {
    this.orders = this.mainService.getOrders();
   
    this.mainService.orderChangedEvent.
    subscribe((orders: Order[]) => {
      this.orders = orders;
    })
    this.subscription = this.mainService.orderListChangedEvent
      .subscribe((finalproject: Order[]) => {
        this.orders = finalproject;
      })
    

      
    // }
    
  }
  
   ngOnDestroy() {
    throw new Error('Function not implemented.');
  }}
