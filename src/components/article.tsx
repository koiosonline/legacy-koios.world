import React from "react";

const Article = React.forwardRef((props: {title: string; description: string; links: any;}, ref: any) => {
    return (
        <article className={'content-container__articles__article'} ref={ref}>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            <div className={'content-container__articles__article__links'}>
                {props.links.map((linkData: { url: string; content: string; img: string}, index: React.Key | null | undefined) => (
                    <a key={index} href={linkData.url}>{linkData.img ? <img src={linkData.img} alt="article"/> : <p>{linkData.content}</p>}</a>
                ))}
            </div>
        </article>
    )
})

export default Article;
