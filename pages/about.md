import about from '../configs/about.config'

# About us

Defynance was founded in 2020.

## Bringing you a little closer to home

## Mission

We want to x y z

## Team

<div className="block md:grid grid-cols-2 lg:grid-cols-3 gap-4">
{about.team.map(({ name, image, description, email }) => {
    return (
    <figure className="md:mb-0 mb-12">
        <img
            className="rounded-full overflow-hidden border border-gray-200"
            src={`/${image}`}
            alt={name}
            width="250"
            height="250"
            loading="lazy"
        />
        <figcaption>
        <h3>{name}</h3>
        <p>{description}</p>
        <p><a href={`mailto:${email}`}>{email}</a></p>
    </figcaption>
    </figure>
    )
})}
</div>

