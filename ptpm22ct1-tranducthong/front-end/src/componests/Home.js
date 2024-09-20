import '../CSS/Home.css';

let imgUrl = "https://th.bing.com/th?q=Ve+Doraemon&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-WW&cc=VN&setlang=en&adlt=moderate&t=1&mw=247";

function Small_view({img_url, title_name}){
    return(<div className="box-small">
        <div className="box-img small">
            <img src={img_url} alt="Image"/>
        </div>
        <div className="title small">{title_name}</div>
    </div>);
}

function Big_view({img_url, title_name, content, type, date_update}){
    return(<div className='box-big'>
        <div className="box-img-big">
            <img src={img_url} alt="Image"/>
        </div>
        <div className='box-content'>
            <div className="type">{type}</div>
            <div className="title-big">{title_name}</div>
            <div className="content">{content}</div>
            <div className='date-update'>{date_update}</div>
        </div>
    </div>);
}

export default function Home(){
    return(<>
        <Big_view 
        img_url={imgUrl}
        title_name={"Doraemon"}
        content={"afjkdsfgsdfgsdfgsdgsfgahfjkahfkahfkhjakldhjklhklahfklahs"
        +"fjakljfaksfgfsdfggsdgdfsgdsfgsdggsdfgdsgdsgdsfgasfasfasfadsfasfljfklajsfklajkljasdfkljasklfjaklsf"}
        type={"HoidanIT"}
        date_update={'20/09/2024'}/>
    </>);
}