import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { CustomerService } from 'src/app/shared/customer.service';
import { Customer } from 'src/app/shared/customer.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: []
})
export class OrderComponent implements OnInit {
  customerList: Customer[];
  isValid = true;

  constructor(private service: OrderService,
    private dialog: MatDialog,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.resetForm();

    this.customerService.getCustomerList().then(apiCustomers => {
      this.customerList = apiCustomers as Customer[];
      console.log(this.service.formData.CustomerId);
    });
  }
  resetForm(form?: NgForm) {
    if (form = null) {
      form.resetForm();
    }
    this.service.formData = {
      OrderId: null,
      OrderNo: Math.floor(100000 + Math.random() * 900000).toString(),
      CustomerId: '0',
      PMethod: '',
      GTotal: 0
    };
    this.service.orderItems = [];
  }

  AddOrEditOrder(orderItemIndex, orderid) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {orderItemIndex, orderid};
    this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed().subscribe(res => {
      this.updateGrandTotal();
    });
  }
  onDeleteOrderItem(orderItemId: number, i: number) {
    this.service.orderItems.splice(i, 1);
    this.updateGrandTotal();
  }

  updateGrandTotal() {
    this.service.formData.GTotal = this.service.orderItems.reduce((prev, curr) => {
      return prev + curr.Total;
    }, 0);
    this.service.formData.GTotal = parseFloat((this.service.formData.GTotal.toFixed(2)));
  }

  validateForm() {
    this.isValid = true;
    if (this.service.formData.CustomerId === '0') {
      console.log(this.service.formData.CustomerId);
      this.isValid = false;
    } else if (this.service.orderItems.length === 0) {
      this.isValid = false;
    } else {
      return this.isValid;
    }
  }

  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.service.saveOrUpdateOrder().subscribe(res => {
        console.log(res);
        this.resetForm();
      });
    }
  }
}
