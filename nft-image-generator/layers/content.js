module.exports = {
    metadataTemplate: (tokenId, attributes) => ({
        name: `Bravo! NFT #${tokenId}`,
        image: '<%IMAGE_URL%>',
        description: 'TBD',
        attributes: attributes,
    }),
    layers: [
        {
            name: "Background",
            probability: 1.0,
            options: [
                {
                    name: "Colorful",
                    file: "background/Colorful.png",
                    weight: 1
                },
                {
                    name: "Dizzying",
                    file: "background/Dizzying.png",
                    weight: 1
                },
                {
                    name: "Galactic",
                    file: "background/Galactic.png",
                    weight: 1
                },
                {
                    name: "Lovely",
                    file: "background/Lovely.png",
                    weight: 1
                }
            ]
        },
        {
            name: "Shapes",
            probability: 1.0,
            options: [
                {
                    name: "Yellow",
                    file: "shapes/Yellow.png",
                    weight: 0.25
                },
                {
                    name: "Orange",
                    file: "shapes/Orange.png",
                    weight: 1
                },
                {
                    name: "Dark Orange",
                    file: "shapes/Dark_Orange.png",
                    weight: 1
                },
                {
                    name: "Red",
                    file: "shapes/Red.png",
                    weight: 0.1
                },
            ]
        },
        {
            name: "Accessories",
            probability: 0.5,
            options: [
                {
                    name: "Clap",
                    file: "accessories/Clap.png",
                    weight: 1
                },
                {
                    name: "Confetti",
                    file: "accessories/Confetti.png",
                    weight: 0.5
                },
                {
                    name: "Eyes",
                    file: "accessories/Eyes.png",
                    weight: 0.2
                },
            ]
        },
        {
            name: "Medals",
            probability: 1,
            options: [
                {
                    name: "Diamond",
                    file: "medals/Diamond.png",
                    weight: 0.5
                },
                {
                    name: "Star",
                    file: "medals/Star.png",
                    weight: 1
                },
                {
                    name: "Sunglass",
                    file: "medals/Sunglass.png",
                    weight: 0.1
                },
                {
                    name: "Trophy",
                    file: "medals/Trophy.png",
                    weight: 0.75
                },
                {
                    name: "Unicorn",
                    file: "medals/Unicorn.png",
                    weight: 0.3
                },
            ]
        }
    ]
}