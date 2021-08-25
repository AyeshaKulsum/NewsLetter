import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import Base from "./base"
import { fetchAllSourcesFromServer } from "./redux/actions/actionCreator"


const Source = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllSourcesFromServer())
    }, [])
    const allsources = useSelector(state => state.allsources);
    const viewArticle = (source_id) => {
        history.push(`/fetch-article/${source_id}`)
    }
    return (
        <Base title="All sources">
            <div className="row">
                {allsources && allsources.map((source) => {
                    return (
                        <div key={source.source_id} className="card col-md-3 mx-3  my-3 border border-success">

                            <div className="card-body">
                                <h5 className="card-title">{source.Title}</h5>
                                <Link className="text-white"

                                    to={`/fetch-article/${source.source_id}`}
                                >
                                    <span style={{ width: '40px' }}>  <button className="btn btn-primary">View Articles</button></span>
                                </Link>

                            </div>
                        </div>
                    );
                })}
            </div>
        </Base >
    )
}
export default Source;