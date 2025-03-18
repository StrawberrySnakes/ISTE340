// function Welcome() {
    const Welcome = (props) => {
        return(
            <section className={props.someStyle}>
                <h2>Hi {props.name}</h2>
                <p>you do: {props.job}</p>
            </section>
        )
    }
// }

export default Welcome;