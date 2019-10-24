import React from 'react';
import { connect } from 'react-redux';
import { buildsActions, projectsActions } from '../../_actions';
import Grid from '@material-ui/core/Grid';

import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import BuildsList from "../BuildsList/BuildsList";

var interval = null;

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        selectedProject: this.props.match.params.name
    };

    componentDidMount() {
        this.props.dispatch(projectsActions.getAll());
        this.state.selectedProject ? this.props.dispatch(buildsActions.getAllByProjectName(this.state.selectedProject)) : this.props.dispatch(buildsActions.getAll());

        this.props.dispatch(buildsActions.getAllCurrent(this.state.selectedProject));
        interval = setInterval(() => {
            this.props.dispatch(buildsActions.getAllCurrent(this.state.selectedProject))
          }, 10000);
    }

    componentWillUnmount() {
        clearInterval(interval)
    }

    componentDidUpdate(prevProps) {
        if(prevProps.runningBuilds && prevProps.runningBuilds !== this.state.runningBuilds && !prevProps.loading) {
            this.state.selectedProject ? this.props.dispatch(buildsActions.getAllByProjectName(this.state.selectedProject)) : this.props.dispatch(buildsActions.getAll());
        }
    }
    
    render() {
        const { selectedProjectBuilds, selectedProjectCurrentBuilds  } = this.props;
        return (
            <div>
            <Header />
            <main style={{marginTop: "64px"}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={4}>
                        <BuildsList data={selectedProjectBuilds} title="Builds" type="all" />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <BuildsList data={selectedProjectCurrentBuilds && selectedProjectCurrentBuilds.value ? selectedProjectCurrentBuilds.value : null} title="Running Builds" type="current" />
                    </Grid>
                </Grid>
            </main>
            <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { selectedProjectBuilds } = state.builds;
    const { allCurrentBuilds, selectedProjectCurrentBuilds, runningBuilds, loading } = state.currentBuilds;
    
    return {
        selectedProjectBuilds,
        selectedProjectCurrentBuilds,
        allCurrentBuilds,
        runningBuilds,
        loading
    };
}

const connectedPage = connect(mapStateToProps)(Home);
export { connectedPage as Home };