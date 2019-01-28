import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { OrderItems } from './order-items.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formData: Order;
  orderItems: OrderItems[];
  constructor(private http: HttpClient) { }

  saveOrUpdateOrder() {
    const body = {
      ...this.formData,
      OrderItems: this.orderItems
    };
    return this.http.post(environment.orderApiUrl, body);
    console.log(body);
  }
}
