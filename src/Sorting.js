import React from 'react'

function Bubble(props){
  return(
    <div>
      {props.data.map((item,index)=>{
        return(
            <div 
              className="graph-bar" 
              id={'bubble-bar-'+index} 
              key={index} 
              style={{width: (item)+"%"}}></div>
        )
      })}
    </div>
  )
}

function Insertion(props){
  return(
    <div>
      {props.data.map((item,index)=>{
        return(
            <div 
              className="graph-bar" 
              id={'insertion-bar-'+index} 
              key={index} 
              style={{width: (item)+"%"}}></div>
        )
      })}
    </div>
  )
}

function Merge(props){
  return(
    <div>
      {props.data.map((item,index)=>{
        return(
            <div key={'merge-bar-'+index}>
              {index<100 &&
                <div 
                  className="graph-bar" 
                  id={'merge-bar-'+index} 
                  key={'merge-bar-'+index} 
                  style={{width: (item)+"%"}}></div>
              }
            </div>
        )
      })}
    </div>
  )
}

function Quick(props){
  return(
    <div>
      {props.data.map((item,index)=>{
        return(
            <div 
              className="graph-bar" 
              id={'quick-bar-'+index} 
              key={index} 
              style={{width: (item)+"%"}}></div>
        )
      })}
    </div>
  )
}

class Sorting extends React.Component {

  render(){
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Bubble Sort</th>
              <th scope="col">Insertion Sort</th>
              <th scope="col">Merge Sort</th>
              <th scope="col">Quick Sort</th>
              {/* <th scope="col">Heap</th> */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Bubble data={this.props.bubble}/></td> 
              <td><Insertion data={this.props.insertion}/></td>  
              <td><Merge data={this.props.merge}/></td> 
              <td><Quick data={this.props.quick}/></td>                                  
            </tr>
            
          </tbody>
        </table>
      </div>
    );
  }
}

export default Sorting;
