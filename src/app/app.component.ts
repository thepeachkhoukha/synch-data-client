import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observer, Subscription } from 'rxjs';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  private subs: Subscription[] = [];
  localData: any

  constructor(private socketService: SocketService, private productService: ProductService) {}

  ngOnInit(): void {
    this.subs.push(
      this.socketService.getInitialDate().subscribe( (data: any) => { 
        this.localData = data["prods"];
        console.log(data);
        console.log(data["type"]);
      })
    )
    
    this.subs.push(
      this.socketService.getUpdatedData().subscribe((data: any)=> {
        this.localData = data["prods"];
        console.log(data);
        console.log(data["type"]);
      })
    )
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  onDelete(d: Product){
    console.log(d);
    this.productService.deleteProduct(d).subscribe(data => console.log(data));
  }
}

interface ServerResponse {
  prods: any[],
  type?: string
}


