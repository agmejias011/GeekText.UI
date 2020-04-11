import { connect } from 'react-redux'

const select = state => ({
            username: state.username,
            first_name: state.first_name,
            last_name: state.last_name,
            email: state.email,
            user_password: state.user_password,
            nickname: state.nickname,
            home_address: state.home_address,
})

export default connect(select)(state)
