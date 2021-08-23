import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { ERROR } from "../../constants"
import { fetchArticlesBySourceId } from "./articles/helper/articlehelper"
import Base from "./Base"
import { fetchErrorMessage, fetchSuccessMessage } from "./redux/actions/actionCreator"



const Article = ({ match }) => {
    const [articles, setArticles] = useState([])
    const [sourceTitle, setSourceTitle] = useState('Articles')
    const dispatch = useDispatch();
    useEffect(() => {
        fetchArticlesBySourceId(match.params.source_id).then(async response => {
            let a = await response.json();
            if (a.status === ERROR) {
                dispatch(fetchErrorMessage(s.message));
            }
            else {
                dispatch(fetchErrorMessage(''));
                dispatch(fetchSuccessMessage(''));
                setArticles(a.result);
                setSourceTitle(a.result[0] ? 'Articles from ' + a.result[0]['Source.Title'] : 'Articles')
            }
        }).catch(err => {
            dispatch(fetchErrorMessage(err.message));
        }
        )
    }, [])

    return (<Base title={sourceTitle} >
        <div className="row">

            {articles && articles.map((article, index) => {
                return (
                    <div key={index} onClick={() => {
                        window.open(article.Link, '_blank').focus();

                    }} className="card my-2 ml-1 mx-1 border border-success">
                        <div className="card-body">
                            <h3 className="card-title">{article.Title}</h3>
                            {/* <span >{article.Content}</span> */}
                            <div dangerouslySetInnerHTML={{ __html: article.Content }} />
                            <div style={{ position: "relative" }}> <span>{article.Title}</span >
                                <span style={{ position: "absolute", right: "10px", top: "0px" }}>{article.PubDate}</span></div>

                        </div>
                    </div>
                );
            })}
            {
                articles.length === 0 && (
                    <div>
                        No articles found
                    </div>
                )
            }
        </div>

    </Base>)
}


export default Article;