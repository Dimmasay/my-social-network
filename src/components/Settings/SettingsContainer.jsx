import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


const Settings = (props) => {
    return (
        <div>
            Settings
        </div>
    )
}
const mapStateToProps = (state) => {
    return {}
}
const SettingsContainer = compose(
    connect(mapStateToProps, {}),
    withAuthRedirect
)(Settings)
export default SettingsContainer