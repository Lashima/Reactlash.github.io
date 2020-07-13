import './App.css';
import {Layout,Header,Content,Drawer}from 'react-mdl';
import React, {useRef,useEffect,useState } from 'react';
import {select, line,curveCardinal} from 'd3';
import BrushChart from "./brush";



function App() {
  const [data, setData] = useState([25,30,45,60,65,75]);
  const onAddDataClick = () =>
    setData([...data, Math.round(Math.random() * 100)]);
    const svgRef=useRef();
    useEffect(()=>{
        const svg=select(svgRef.current);
        const myline=line()
        .x((value,index)=>index*50)
        .y(value=>150-value)
        .curve(curveCardinal);

        svg
        .selectAll("path")
        .data([data])
        .join("path")
        .attr("d",value=>myline(value))
        .attr("fill","none")
        .attr("stroke","blue");
    },[data]);
  return (
    
    
<div className="demo-big-content">
    <Layout>
        <Header title="LASH" scroll>
            
        </Header>
        <Drawer title="LASH">
            
        </Drawer>
        <Content>
        <div className="page-content" />
            <div class="first">
              <h1>Line Graph</h1>
            <svg ref={svgRef}></svg><br/>
        <br/>
        </div>
        <br/>
        <div class="secnd">
          <h1>Using Brush</h1>
        <BrushChart data={data} /><br/>
      <button onClick={onAddDataClick}>Add data</button>
      <button onClick={()=>setData(data.map(value=>value+5))}>Update</button>
        <button onClick={()=>setData(data.filter(value=>value<35))}>Filter</button>
      </div>
        </Content>
    </Layout>
</div>
  )
}
export default App;


