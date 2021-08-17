
const Home = (props: {name:string}) => {
    
    return (
        <div>
            {props.name ? 'Hi ' + props.name : 'Not logged in!'}
        </div>
    );
};

export default Home;