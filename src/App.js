import React from 'react'
import './App.css';
import Sorting from './Sorting'

class App extends React.Component {
  constructor(){
    super();
    this.data = []
    this.count = 0;
    for(let i=100; i>0; i--)
    {
      this.data.push(Math.floor(Math.random() * 100))      
      // this.data.push(100-i)
    }
    this.state = {
      speed:5,
      bubbleSorted:[...this.data],
      insertionSorted:[...this.data],
      mergeSorted:[...this.data],
      quickSorted:[...this.data],
    }
  }

  componentDidMount = () => {
    // this.qs(this.state.quickSorted)
  }
  
  wait = (ms) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(ms)
      }, ms )
    })
  }  

  comparing = (bar,j,k,color) => {
    document.getElementById(bar+j).style.backgroundColor = color
    document.getElementById(bar+k).style.backgroundColor = color
  }  

  colorAll = (bar,color) => {
    for(let i=0;i<this.data.length;i++)
    {
      document.getElementById(bar+i).style.backgroundColor = color
    }
  }
  
  swap = (items, leftIndex, rightIndex) => {
    this.comparing('quick-bar-',leftIndex,rightIndex,'blue')
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}

partition = async(items, left, right) => {
  return new Promise(async(resolve, reject) => {
    var pivot   = items[Math.floor((right + left) / 2)], //middle element
          i       = left, //left pointer
          j       = right; //right pointer
      while (i <= j) {
          while (items[i] < pivot) {
            i++;
          }
          while (items[j] > pivot) {
            j--;
          }
          if (i <= j) {
              await this.wait(this.state.speed);  
              this.swap(items, i, j); //sawpping two elements
              i++;
              j--;
          }
      }
      resolve(i)
  });
}

quickSort = async(items, left, right) => {
  var index;
    this.colorAll('quick-bar-','white') 
    this.setState({quickSorted:items})
    if (items.length > 1) {
        index = await this.partition(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            this.quickSort(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            this.quickSort(items, index, right);
        }
    }
    this.count++;      
    if(this.count==99){
      this.colorAll('quick-bar-','springgreen')  
    }
    return(items);
}

qs = (array) => {
  this.quickSort(array, 0, array.length - 1)
}

  
  // partition = (array,start,end) => {
  //   let pivot_index = end-1;
  //   let i=0;

  //   while(i!=pivot_index)
  //   {  
  //     // console.log(array,'comparing',array[i],array[pivot_index])    
  //     if(array[i]<array[pivot_index])
  //     {
  //       i++;
  //     } 
  //     else if(array[i]>array[pivot_index])
  //     {
  //       let temp = array[pivot_index]; 
  //       array[pivot_index] = array[i]
  //       array[i] = array[pivot_index-1]
  //       array[pivot_index-1] = temp
  //       pivot_index--;
  //       if(pivot_index==i)break
  //       i=0
  //     }
  //   }
  //   return(pivot_index)
  // }

  // quickSort = async(array,start,end) => 
  // {
  //   let pivot_index = this.partition(array,start,end)
  //   console.log(array,start,end)    
  //   if(start==pivot_index)return
  //   if(start==end)return
  //   this.quickSort(array,start,pivot_index)
  //   this.quickSort(array,pivot_index,end)
  //   console.log(array)
  // }

  split = async(array) => {
    let len = array.length
    let size = 2;

    let i;
    while(size<=array.length)
    {
      for(i=0; i<array.length; i+=size)
      {
        await this.wait(this.state.speed);
        let left = array.slice(i,i+(size/2));
        let right = (i+(size/2)!==array.length) ? array.slice(i+(size/2),i+size) : []
        // if(right.length==0)console.log('No Right')
        this.setState({mergeSorted:array})
        // console.log(left,right)    
        this.mergeSort(left,right,array,i,i+size)
        // console.log(array)        
      }
        size *= 2;
    }
    this.setState({mergeSorted:array.slice(0,len)})
    this.colorAll('merge-bar-','springgreen')
  }

  mergeSort = (left,right,array,start,end) => {
    var merged = [];
    let i=0,j=0,k=0;

    if(!right.length){
      for(let l=0;l<left.length;l++){
        right.push(100)
      }
    }
  
    while(i<left.length && j<right.length)
    {
      if(left[i]<right[j]){
        // console.log('Adding',left[i])
        merged[k] = left[i++]
      }else{
        // console.log('Adding',right[i])
        merged[k] = right[j++]
      }
      k++;
    }
    while(i<left.length)
    {
      // console.log('Only Left',left[i])
      merged[k++]=left[i++];
    }
    while(j<right.length)
    {
      // console.log('Only Right',left[i])
      merged[k++]=right[j++];
    }
    k=0;
    for(let i= start; i<end; i++){
      array[i] = merged[k++]  
    }
  }

  insSort = async(data) => {
    for(let i=0; i<data.length; i++){
      for(let j=0; j<i;j++){
        this.comparing('insertion-bar-',i,j,"blue")
        await this.wait(this.state.speed);
     
        if(data[j]>data[i])
        {
          let temp = data[i];
          for(let counter = i; counter > j; counter--){
            data[counter] = data[counter-1]
          }
          data[j] = temp
        }
        this.comparing('insertion-bar-',i,j,"white")
        this.setState({insertionSorted:data})    
      }      
    }
    this.setState({insertionSorted:data})    
    this.colorAll('insertion-bar-','springgreen')
  }
   
  bblSort = async(arr) => {
    for(var i = 0; i < arr.length; i++){            
      for(var j = 0; j < ( arr.length - i -1 ); j++){
        this.comparing('bubble-bar-',j,j+1,"blue")
        await this.wait(this.state.speed);
        if(arr[j] > arr[j+1]){
          var temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j+1] = temp
        }
        this.comparing('bubble-bar-',j,j+1,"white")
        this.setState({bubbleSorted:arr})
      }
    }
    this.colorAll('bubble-bar-','springgreen')
   }

  sort = () => {
    this.insSort(this.state.insertionSorted);
    this.bblSort(this.state.bubbleSorted);
    this.split(this.state.mergeSorted);
    this.qs(this.state.quickSorted)
  }

  render(){
    return (
      <div className="col">
        <div className="row">
          <div className="col">
            <h1>Sorting Algorithms</h1>
            {/* <div className="input-group mb-3">
              <input type="text" className="form-control" onChange={()=>{}} value={this.state.data} placeholder="Data"/>
              <div className="input-group-append">
                <button className="btn btn-outline-primary" >Randomise</button>
              </div>
            </div> */}

            <button className="btn btn-primary sort-btn" onClick={()=>this.bblSort(this.state.bubbleSorted)}>Bubble Sort</button>
            <button className="btn btn-primary sort-btn" onClick={()=>this.insSort(this.state.insertionSorted)}>Insertion Sort</button>
            <button className="btn btn-primary sort-btn" onClick={()=>this.split(this.state.mergeSorted)}>Merge Sort</button>
            <button className="btn btn-primary sort-btn" onClick={()=>this.qs(this.state.quickSorted)}>Quick Sort</button>
          
            <button className="btn btn-primary sort-btn" onClick={this.sort}>Sort</button>

            <div id="process"></div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Sorting
              length={this.data.length}
              bubble={this.state.bubbleSorted}
              insertion={this.state.insertionSorted}
              merge={this.state.mergeSorted}
              quick={this.state.quickSorted}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
