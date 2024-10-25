const About = () => {

    return (
        <div className="flex flex-col items-center justify-start min-h-screen gap-4 p-8 bg-white dark:text-gray-200 dark:bg-gray-600">
            <h1 className="mb-4 text-3xl font-bold" > About </h1>
            <p className="max-w-xl text-lg leading-relaxed text-center">This Single Page Application is designed for business accounts to create cards containing essential information about their business. Each card includes important details such as the title, description, contact information, and images.
                <br /><br />

                Clients can browse these cards and can like any that appeal to them. Likes are saved, allowing users to quickly find and return to their favorite cards. This functionality not only makes the application informative but also interactive, enhancing engagement between businesses and their audience.</p>
        </div>
    );
};

export default About;