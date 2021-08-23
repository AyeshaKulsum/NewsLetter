import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import Base from "../Base"
import { fetchErrorMessage, fetchSourcesToSubscribeFromServer } from "../redux/actions/actionCreator"
import { subscribe } from "./helper/articlehelper"


const Subscribe = () => {
    const [values, setValues] = useState({ feedUrl: '', source_id: -1 })
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false)
    const history = useHistory();
    const dispatch = useDispatch();
    const sources = useSelector(state => state.sources);
    // const [sources, setSources] = useState([])
    useEffect(() => {
        dispatch(fetchSourcesToSubscribeFromServer())
    }, [])

    useEffect(() => {

    }, [sources])

    useEffect(() => {
        if (isSubmitEnabled) {
            onSubmit()
            setIsSubmitEnabled(false)
        }
    }, [isSubmitEnabled])

    const handleChange = (name) => (event) => {

        setValues({ ...values, [name]: event.target.value })
    }
    const { feedUrl } = values
    const onSubmit = (event) => {
        try {
            event.preventDefault();
        } catch (err) {

        }
        subscribe(values).then(async res => {
            let response = await res.json()
            if (response.status === 'error') {
                dispatch(fetchErrorMessage(response.message));
            }
            else {
                dispatch(fetchSourcesToSubscribeFromServer())
                dispatch(fetchSourcesToSubscribe())
            }

        }).catch(err => {
            dispatch(fetchErrorMessage(err.message));
        })
    }
    const subscribebtn = (source_id, feedUrl, event) => {
        setValues({ ...values, source_id: source_id, feedUrl: feedUrl })
        setIsSubmitEnabled(true)
    }
    const subscribeForm = () => {
        return (
            <div className="container align-center">
                <form onSubmit={onSubmit}>
                    <div className="form-group row">
                        <input type="text" onChange={
                            handleChange("feedUrl")
                        } className=" form-control my-2 col-8" placeholder="URL here" value={feedUrl} name="feedUrl" />
                        <button className="btn btn-success offset-sm-5 align-center col-2">Subscribe</button>
                    </div>
                </form>
            </div>)
    }

    return (
        <Base title="Subscribe Form">
            <div >{subscribeForm()}</div>
            <div className="row">
                {sources && sources.map((source) => {
                    return (
                        <div key={source.source_id} className="card col-md-3 mx-3  my-3 border border-success">

                            <div className="card-body">
                                <h5 className="card-title">{source.Title}</h5>
                                <button className="btn btn-primary" onClick={() => { subscribebtn(source.source_id, source.FeedUrl) }}>Subscribe</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Base >
    )
}
export default Subscribe;