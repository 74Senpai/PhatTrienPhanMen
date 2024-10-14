import './CSS/Home.css';

let imgUrl = "https://cdn-blog.28tech.com.vn/thumbs/c%20tutorial/l%C3%A0m%20quen/b%C3%A0i%201/5_thumb_350.png";

function Small_view({img_url, title_name}){
    return(<div className="box-small">
        <div className="box-img small">
            <img src={img_url} alt="Image"/>
        </div>
        <div className="title small text-hover">{title_name}</div>
    </div>);
}

function Big_view({img_url, title_name, content, type, date_update}){
    return(<div className='box-big'>
        <div className="box-img-big img-blur">
            <img src={img_url} alt="Image"/>
        </div>
        <div className='box-content'>
            <div className="type type-hover" >{type}</div>
            <div className="title-big text-hover">{title_name}</div>
            <div className="content">{content}</div>
            <div className='date-update'>{date_update}</div>
        </div>
    </div>);
}

function ABlog({title_name, img_url, type, date_update, templ}){
   const htmls = <div className='date-up-blog'>{date_update}</div>
    return(
        <div className='blog'>
            <div className='image-blog img-blur'>
                <img src={img_url} alt="Image"/>
            </div>
            <div className='box'> 
                <div className='type-blog type-hover'>
                    {type}  
                </div>
                {templ ==1  ? htmls: ''}
                <div className='title-blog text-hover'>{title_name}</div>
                {templ == 2  ? htmls: ''}
            </div>
        </div>
    );
}

function TopContents(){
    let smallView = [];
    for (let i = 0; i < 4; i++) {
    smallView.push(<Small_view img_url={imgUrl} title_name={"Test" + i} key={i} />);
    }

    const strContent = "Test".repeat(100);
    let bigView = [];
    bigView.push(<Big_view img_url={imgUrl} title_name={"Test" + 1} type={"Test" + 1} content={strContent} key={1} date_update={"20/10/2024"}/>);
    bigView.push(<Big_view img_url={imgUrl} title_name={"Test" + 2} type={"Test" + 2} content={strContent} key={2} date_update={"20/10/2024"}/>);
    return(<>
        <div className='top-contents'>
            <div className='small-view col'>
                {smallView}
            </div>
            <div className='big-view col'>
                {bigView}
            </div>
        </div>
    </>);
}


export function ContentsByType({title_name, type_API, templ = 1}){
    if(templ == 1){
        return(
            <div className='contents-by-type templ1'>
                <div className='type-title'>{title_name}</div>
                <ABlog img_url={imgUrl}
                    title_name={"Lap Trinh voi C"}
                    type={'Lap trinh C'}
                    date_update={'20/09/2024'}
                    templ={1}/>
                <ABlog img_url={imgUrl}
                    title_name={"Lap Trinh voi C"}
                    type={'Lap trinh C'}
                    date_update={'20/09/2024'}
                    templ={1}/>
                <ABlog img_url={imgUrl}
                    title_name={"Lap Trinh voi C"}
                    type={'Lap trinh C'}
                    date_update={'20/09/2024'}
                    templ={1}/>
                <ABlog img_url={imgUrl}
                    title_name={"Lap Trinh voi C"}
                    type={'Lap trinh C'}
                    date_update={'20/09/2024'}
                    templ={1}/>
            </div>
        );
    }

    return(
        <div className='contents-by-type templ2'>
            <div className='type-title'>{title_name}</div>
            <ABlog img_url={imgUrl}
                title_name={"Lap Trinh voi C"}
                type={'Lap trinh C'}
                date_update={'20/09/2024'}
                templ={2}/>
            <ABlog img_url={imgUrl}
                title_name={"Lap Trinh voi C"}
                type={'Lap trinh C'}
                date_update={'20/09/2024'}
                templ={2}/>
            <ABlog img_url={imgUrl}
                title_name={"Lap Trinh voi C"}
                type={'Lap trinh C'}
                date_update={'20/09/2024'}
                templ={2}/>
            <ABlog img_url={imgUrl}
                title_name={"Lap Trinh voi C"}
                type={'Lap trinh C'}
                date_update={'20/09/2024'}
                templ={2}/>
            <ABlog img_url={imgUrl}
                title_name={"Lap Trinh voi C"}
                type={'Lap trinh C'}
                date_update={'20/09/2024'}
                templ={2}/>
            <ABlog img_url={imgUrl}
                title_name={"Lap Trinh voi C"}
                type={'Lap trinh C'}
                date_update={'20/09/2024'}
                templ={2}/>
        </div>
    );
}

function AllType(){
    let smallView = [];
    for (let i = 0; i < 10; i++) {
    smallView.push(<Small_view img_url={imgUrl} title_name={"Test" + i} key={i} />);
    }
    return(
        <div className='all-type'>
            <div className='type-title'>Tat ca chu de</div>
            <div className='box-type'>
                {smallView}
            </div>
        </div>
    );
}

export default function Home(){
    return(<>
        <div className='color-bg'>
            <TopContents />
        </div>
        <ContentsByType title_name={"Lap Trinh C"} templ={1}/>
        <div className='color-bg'>
            <ContentsByType title_name={"Lap Trinh C++"} templ={2}/>
        </div>
        <AllType />
    </>);
}