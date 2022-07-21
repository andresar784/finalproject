import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MainService } from '../mainservice.service';
import { Order } from '../order.model';


@Component({
  selector: 'finalproject-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  originalOrder: Order;
  order: Order;
  editMode: boolean = false;
  

  constructor(private service: MainService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id === undefined || id === null) {
        this.editMode = false;
        return
      }
      this.originalOrder = this.service.getOrder(id);
      if (this.originalOrder === undefined || this.originalOrder === null) {
      return
    }
    this.editMode = true;
    this.order = JSON.parse(JSON.stringify(this.originalOrder))
  })}

  onSubmit(form: NgForm) {
    const value = form.value;
    const newOrder = new Order(null, value.medicine, value.indication);
    if (this.editMode === true) {
      this.service.updateOrder(this.originalOrder, newOrder)
    } else {
      this.service.addOrder(newOrder)
    }
    this.router.navigateByUrl('/')
  }
  onCancel() {
    this.router.navigateByUrl('/')
  }
}
