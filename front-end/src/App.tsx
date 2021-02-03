import logo from './logo.svg';
import './App.css';
//import {ConnectSearch} from "@trifenix/trifenix-connect-search";
import { TableSearchContainer } from "@trifenix/trifenix-connect-table-container";
import "semantic-ui-css/semantic.min.css";

function App() {

  // var connect = new ConnectSearch("https://search-agro.search.windows.net/",
  // "entities-agro",
  // "7902C1E82BEEDC85AC0E535CF45DFC77");

  
  // var query = TableQueryFilter({
  //   page : 1,
  //   elementsInPage : 10,
  //   pathname : "barracks",
  //   entity : 1,
  //   propIndexName : {1:6},
  //   filter : {}

  // });
  // connect.getEntities(query).then((response) => console.log(response));;

  
  return (
    <TableSearchContainer 
        current={1} 
        connect={{endpoint:"https://search-agro.search.windows.net", 
          key : "7902C1E82BEEDC85AC0E535CF45DFC77",
          index: "entities-agro"
        }} 
        clean={()=>{}}
        elementsInPage={10}
        enumValue={(i,m)=>"enumValue"}
        filter={undefined}
        headerProperty={(h,k)=>"header1"}
        headerRelated={(h)=>"headerEntity"}
        index = {1}
        indexPropNames={{[1]:6}}
        orderItems={[]}
        itemsByPage={{}}
        visible={true}
        total={100}
        snapshot={(s)=>{}}
        rels= {{}}
        load = {false}
        


        
        />
  );
}

export default App;
