export default function Main(props) {
    return (
        <main id="main" className={props.mainStyle}>
            {props.children}
        </main>
    )
}
