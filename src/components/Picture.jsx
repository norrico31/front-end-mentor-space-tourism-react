export const Picture = ({png, webp, name}) => {
    return (
        <picture id="commander-image">
            <source srcSet={webp} type="image/webp" />
            <img src={png} alt={name} />
        </picture>
    )
}