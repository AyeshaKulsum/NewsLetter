import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Base from "../Base"
import { fetchSourcesToSubscribe, subscribe } from "./helper/articlehelper"


const Subscribe = () => {
    const [values, setValues] = useState({ feedUrl: '', source_id: -1 })
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false)
    const history = useHistory();

    const [sources, setSources] = useState([])
    useEffect(() => {
        fetchSourcesToSubscribe().then(async (s) => {

            setSources(await s.json())
        }).catch((err) => { console.log(err); })
    }, [])

    useEffect(() => {
        console.log(sources)
    }, [sources])

    useEffect(() => {
        if (isSubmitEnabled) {
            onSubmit()
            setIsSubmitEnabled(false)
        }
    }, [isSubmitEnabled])

    const handleChange = (name) => (event) => {
        console.log('handle');
        setValues({ ...values, [name]: event.target.value })
    }
    const { feedUrl } = values
    const onSubmit = (event) => {
        try {
            event.preventDefault();
        } catch (err) {

        }
        console.log('value', values);
        subscribe(values).then(response => {
            console.log(response);
            let s_id = values.source_id;
            let newSources = [...sources];
            newSources.forEach((s, i) => {
                if (s.source_id === s_id) {
                    newSources.splice(i, 1)
                }
            })
            setSources([...newSources])
            history.push('/user-subscribe')
        }).catch(err => { console.log(err); })
    }
    const subscribebtn = (source_id, feedUrl, event) => {
        console.log(sources);
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
                        <div key={source.source_id} className="card col-md-3   my-2 border border-success">

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