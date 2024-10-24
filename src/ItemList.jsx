import { axiosInstance } from "./App"
import ItemCard from "./ItemCard"
function ItemList() {
    axiosInstance.post("/available", "1")
        .then(res => {
            console.log(res.data);
        })
    return(
        <main>
            <ItemCard image="noimage.jpg" title="パンケーキ" text="どこかで見たことあるようなパンケーキ<br/>１パック５枚" cost="100" id="1"/>
            <ItemCard image="noimage.jpg" title="ワッフル" text="手のひらサイズのワッフル<br/>１パック２枚" cost="100" id="2"/>
            <ItemCard image="noimage.jpg" title="だんご" text="コップに入った一口サイズのだんご<br/>１パック４個" cost="100" id="3"/>
        </main>
    )
}

export default ItemList