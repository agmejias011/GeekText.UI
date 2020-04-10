import { connect } from 'react-redux'

const select = state => ({
    authenticated: state.authenticated
})

const auth = ({ authenticated }) => {
    if (authenticated = true)
        return true;
    else
        return false;
}

export default connect(select)(auth)
