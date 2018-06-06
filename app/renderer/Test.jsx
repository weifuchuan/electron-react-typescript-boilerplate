import React from 'react'; 
import { Button } from "antd";

export default class Test extends React.Component{
  render() {
    return (
      <div>
        <Button onClick={()=>console.log("FUCK")}>FUCK</Button>
      </div>
    );
  }
}