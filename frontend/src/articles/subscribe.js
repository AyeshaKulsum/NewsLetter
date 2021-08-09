import { useState } from "react"
import Base from "../Base"
import { subscribe } from "./helper/articlehelper"


const Subscribe = () => {
    const [values, setValues] = useState({ url: '' })

    const handleChange = (name) => (event) => {
        setValues({ ...values, name: event.target.value })
    }
    const { url } = values
    const onSubmit = (event) => {
        subscribe(values).then(response => {
            console.log(response);
        }).catch(err => { console.log(err); })
    }
    const subscribeForm = () => {
        return (
            <div className="container">
                <form>
                    <div className="form-group">
                        <input type="text" onChange={handleChange("url")} className="form-control" placeholder="URL here" value={url} name="url" />
                    </div>
                    <button onClick={onSubmit}>Subscribe</button>
                </form>
            </div>)
    }
    return (
        <Base title="Subscribe Form">
            <div >{subscribeForm()}</div>
        </Base>
    )
}
export default Subscribe;