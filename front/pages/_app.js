import { PropTypes } from 'prop-types';
import 'antd/dist/antd.css'
import Head from 'next/head'

const App = ({ Component }) => {
    return (
        <>
            <Head>
                <title>SNS</title>
                <meta charSet="utf-8"></meta>
            </Head>
            <Component />
        </>
    )
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
}

export default App;