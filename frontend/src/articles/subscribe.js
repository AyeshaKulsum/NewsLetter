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
            <div className="container align-center">
                <form>
                    <div className="form-group row">
                        <input type="text" onChange={handleChange("url")} className=" form-control my-2 col-8" placeholder="URL here" value={url} name="url" />
                        <button onClick={onSubmit} className="btn btn-success offset-sm-5 align-center col-2">Subscribe</button>
                    </div>




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