import { useEffect, useState } from "react";
import Base from "../base";
import { fetchArticlesFromServer } from "../redux/actions/actionCreator";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
    const [query, setQuery] = useState('')
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchArticlesFromServer())
    }, [])


    const handleChange = () => (event) => {
        setQuery(event.target.value)
    }

    const onSubmit = (event) => {
        try {
            event.preventDefault();
            dispatch(fetchArticlesFromServer(query))
        } catch (err) {
            dispatch(fetchErrorMessage('some error'));
        }
    }

    const searchForm = () => {
        return (
            <div className="container align-center">
                <form onSubmit={onSubmit}>
                    <div className="form-group row">
                        <input type="text" onChange={
                            handleChange()
                        } className=" form-control my-2 col-8" placeholder="URL here" value={query} name="query" />
                        <button className="btn btn-success offset-sm-5 align-center col-2">Search</button>
                    </div>
                </form>
            </div>)
    }
    const articles = useSelector(state => state.articles);
    return (
        <Base title="Articles" data-testid="home-1">
            <div>{searchForm()}</div>
            <div className="row">
                {articles && articles.map((article, index) => {
                    return (
                        <div key={index} onClick={() => {
                            window.open(article.article_link, '_blank').focus();

                        }} className="card my-2 ml-1 mx-1 border border-success">
                            <div className="card-body">
                                <h3 className="card-title">{article.article_title}</h3>
                                <div dangerouslySetInnerHTML={{ __html: article.Content }} />

                                <div style={{ position: "relative", fontWeight: "bolder" }}> <span>{article.Title}</span >
                                    <span style={{ position: "absolute", right: "10px", top: "0px" }}>{article.PubDate}</span></div>

                            </div>
                        </div>
                    );
                })}
                {
                    query && articles.length === 0 && (
                        <div>
                            No match found
                        </div>
                    )
                }
                {
                    !query && articles.length === 0 && (
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