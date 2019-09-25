import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.css']
})
export class ArrayComponent implements OnInit {
  url ='http://168.232.165.184/prueba/array';
  private auxArray:Array<number>;
  private defArray;
  private sortedArray;
  constructor(private http:HttpClient) { }

  ngOnInit() {
  }

  getInfo(){
    this.auxArray=[];
    this.defArray=[];
    this.sortedArray=['loading...'];
    
    
    this.http.get(this.url)
    .subscribe(
      (res)=>{
        console.log(res);
        if (res['success']){
          res['data'].forEach(element => {
            this.auxArray.push(element);
          });
  
          this.defArray = this.separar(this.auxArray);
          this.sortedArray = this.bubble(this.auxArray);
        }else{
          this.defArray=[{
            'number': '--',
            'frec': '--',
            'primera_pos': '--',
            'ultima_pos':'--'
          }];
          this.sortedArray=['null response, please press the button again'];
        }
        

      });
    
    
    
      // this.defArray = this.separar(this.auxArray);
  }

  bubble(array){
    array = array.slice();
    for( let i=0;i<array.length;i++){ 
      for(let j=0;j<array.length-1;j++){
        if(array[j] > array[j+1]){
          [array[j], array[j+1]] =[array[j+1],array[j]];
        }
      }
    }
    return array;
  }

  separar(array:Array<number>){
  
  var objArray = [];

    for (var i=0; i < array.length; i++){
      let contar = {};
      let bandera = true;

      for (let j =0; j<objArray.length; j++){
        let aux = Object.entries(objArray[j]);

        if(aux[0][1] === array[i]){
          contar = objArray[j];
          objArray.splice(j,1);
          bandera = false;
        }else{
          bandera=true;
        }
        if (!bandera) break;        
      }
      

      if (bandera){
        contar['number'] = array[i];
        contar['frec'] = 1;
        contar['primera_pos'] = array.indexOf(array[i]);
        contar['ultima_pos'] = array.lastIndexOf(array[i]);        
      }else{
        contar['frec'] += 1;
      }
      

      objArray.push(contar);

      
    }

    objArray.sort(function(a,b){
      if (a.primera_pos > b.primera_pos) return 1;
      if (a.primera_pos < b.primera_pos) return -1;
      return 0;
    });

    return objArray;
  }

}
