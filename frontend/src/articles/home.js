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

                        }} className="card my-2 ml-1 mx-1 border border-success">
                            {/* col-md-3  offset-md-1 my-2  */}
                            <div className="card-body">
                                <h3 className="card-title">{article.article_title}</h3>
                                <span >{article.ContentSnippet}</span>

                                <div style={{ position: "relative" }}> <span>{article.Title}</span >
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