import {useParams} from "react-router-dom";

export function withRouter(Component) {
    return (props) => {
        return <Component {...props} match={useParams()}/>
    }
}