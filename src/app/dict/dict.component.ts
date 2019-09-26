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
  private suma;
  constructor(private http:HttpClient) { }

  ngOnInit() {
  }
  getInfo(){
    //get endPoint data
    this.http.get(this.url)
    .subscribe(
      (res)=>{

        res['data'].forEach(element => {
          //fill array with data
          this.array.push(element);
        });
        //procesed object's array to show on front-end
        this.paraTabla= this.separar(this.array);
      }
    );

  }

  separar(arr){
    let todo=[];

    for (let i =0 ; i < arr.length ; i++){
      let auxString:String='';
      let res={};
      //get the paragraph data and make it lowecase
      auxString = arr[i]['paragraph'];
      auxString = auxString.toLowerCase();
      //split and fill object -> letter as a key and frecuency as a value
      auxString.split('').forEach(e => res[e] = res[e] ? res[e]+1 : 1 ) ;
      //acumulate frecuency for this paragraph
      res['contador'] = this.sumarChars(res);
      todo.push(res);

      
    }
    return todo;

  }
  sumarChars(tabla){
    let contador=0;
    // cycle the keys of the object's array
    Object.keys(tabla).forEach(element => {
      //find lowercase character and acumulate frecuency 
      if (/[a-z]/.test(element)){
        contador += tabla[element];
      }
    });
    return contador;
  }

}
