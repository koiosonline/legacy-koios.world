const Article = (props: {title: string; description: string; links: any}) => {
    return (
        <article className={'contentContainer__articles__article'}>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            <div className={'contentContainer__articles__article__links'}>
                {props.links.map((linkData: { url: string; content: string; img: string}, index: React.Key | null | undefined) => (
                    <a key={index} href={linkData.url}>{linkData.img ? <img src={linkData.img} alt="article"/> : <p>{linkData.content}</p>}</a>
                ))}
            </div>
        </article>
    )
}

export default Article;