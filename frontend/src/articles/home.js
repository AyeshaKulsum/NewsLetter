import { useEffect, useState } from "react";
import Base from "../Base";
import { fetchArticlesFromServer } from "../redux/actions/actionCreator";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
    // const [articles, setArticles] = useState([])

    useEffect(() => {
        dispatch(fetchArticlesFromServer())
    }, [])

    const dispatch = useDispatch();

    const articles = useSelector(state => state.articles);
    // console.log('articles', articles)
    // const state = useSelector(state => state);
    // console.log('state', state)
    // const error = useSelector(state => state.user.error_flag);
    // console.log('error', error)
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
                                <span >{article.Content}</span>

                                <div style={{ position: "relative" }}> <span>{article.Title}</span >
                                    <span style={{ position: "absolute", right: "10px", top: "0px" }}>{article.PubDate}</span></div>

                            </div>
                        </div>
                    );
                })}
                {
                    articles.length === 0 && (
                        <div>
                            Please subscribe to view latest articles
                        </div>
                    )
                }
            </div>

        </Base>
    )
}

export default Home;