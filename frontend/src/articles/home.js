import { useEffect, useState } from "react";
import Base from "../Base";
import { fetchAllArticlesOfUser } from "./helper/articlehelper";


const Home = () => {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetchAllArticlesOfUser().then(async articles => {
            setArticles(await articles.json())
            console.log(articles);
        }).catch(err => console.log(err))
    }, [])
    return (
        <Base title="Articles" >
            <div className="row">

                {articles && articles.map((article, index) => {
                    return (
                        <div key={index} onClick={() => {
                            // window.location.href = article.article_link 
                            window.open(article.article_link, '_blank').focus();

                        }} className="card col-md-auto  offset-md-1 my-2 border border-success">

                            <div className="card-body">
                                <h3 className="card-title">{article.article_title}</h3>
                                <div style={{ position: "relative" }}> <span>{article.Author}</span >
                                    <span style={{ position: "absolute", right: "10px", top: "0px" }}>{article.PubDate}</span></div>

                            </div>
                        </div>
                    );
                })}
            </div>

        </Base>
    )
}

export default Home;