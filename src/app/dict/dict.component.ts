import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dict',
  templateUrl: './dict.component.html',
  styleUrls: ['./dict.component.css']
})
export class DictComponent implements OnInit {
  url='http://168.232.165.184/prueba/dict';
  private paraTabla=[];
  private array = [];
  private suma
  constructor(private http:HttpClient) { }

  ngOnInit() {
  }
  getInfo(){
    this.http.get(this.url)
    .subscribe(
      (res)=>{

        res['data'].forEach(element => {
          //aca separar en una clase custom con los valores paragraph, number, hasCR
          this.array.push(element);
        });

        this.paraTabla= this.separar(this.array);
      }
    );

  }

  separar(arr){
    
    let todo=[];
    console.log('haha');
    for (let i =0 ; i < arr.length ; i++){
      let auxString:String='';
      let res={};
      auxString = arr[i]['paragraph'];
      auxString = auxString.toLowerCase();
      console.log(auxString);
      

      auxString.split('').forEach(e => res[e] = res[e] ? res[e]+1 : 1 ) ;

      // auxString.split('').forEach(e => res[e] = (res[e] || 0)+1);
      res['contador'] = this.sumarChars(res);
      todo.push(res);

      
    }
    return todo;

  }
  sumarChars(tabla){
    let contador=0;
    Object.keys(tabla).forEach(element => {
      if (/[a-z]/.test(element)){
        contador += tabla[element];
      }
    });
    return contador;
  }

}
