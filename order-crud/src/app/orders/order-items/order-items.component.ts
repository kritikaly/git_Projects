import { Component, OnInit, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OrderItems } from 'src/app/shared/order-items.model';
import { ItemService } from 'src/app/shared/item.service';
import { Item } from 'src/app/shared/item.model';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {
formData: OrderItems;
itemList: Item[];
isValid = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemsComponent>,
    private itemService: ItemService,
    private orderService: OrderService) { }

  ngOnInit() {

    // this.itemService.getItemList().then(res => {
    //   this.itemList = res as Item[];
    //   console.log(this.itemList);
    // });
    this.data = this.itemService.getPosts().subscribe(Items => {
      this.itemList = Items as Item[];
      console.log(Items);
    });
    if (this.data.orderItemIndex == null) {
      this.formData = {
        OrderItemId: null,
        OrderId: this.data.OrderId,
        ItemId: 0,
        ItemName: '',
        Price: '0',
        Quantity: 0,
        Total: 0
      };
    } else {
      this.formData = Object.assign({}, this.orderService.orderItems[this.data.orderItemIndex]);
    }
  }

  updatePrice(crtl) {
    if (crtl.selectedIndex === 0) {
      this.formData.Price = '0';
      this.formData.ItemName = '';
    } else {
      this.formData.Price = this.itemList[crtl.selectedIndex - 1].Price;
      this.formData.ItemName = this.itemList[crtl.selectedIndex - 1].Food;
      // this.formData.Quantity = 1;
    }
    this.updateTotal();
  }

  updateTotal() {
    this.formData.Total = parseFloat((this.formData.Quantity * Number(this.formData.Price)).toFixed(2));
  }

  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      if (this.data.orderItemIndex == null) {
        this.orderService.orderItems.push(form.value);
      } else {
        this.orderService.orderItems[this.data.orderItemIndex] = form.value;
      }
      this.dialogRef.close();
    }
  }

  validateForm(formData: OrderItems) {
    this.isValid = true;
    if (formData.ItemId === 0) {
      this.isValid = false;
    } else if (formData.Quantity === 0) {
      this.isValid = false;
    } else {
      return this.isValid;
    }
  }
}
