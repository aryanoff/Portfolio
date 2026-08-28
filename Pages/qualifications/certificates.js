document.addEventListener("DOMContentLoaded", () => {
    const certificatesData = [
        {
            title: "Introduction to Digital Transformation with Google Cloud",
            issuer: "Simplilearn SkillUp — Powered by Google Cloud",
            category: "Cloud & Digital Transformation",
            description:
                "Completed a foundational course covering digital transformation concepts and the role of Google Cloud technologies in modernizing organizations.",
            image: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785866056/WhatsApp_Image_2026-07-27_at_6.55.20_PM_qyhdzy.jpg",
            link: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785866056/WhatsApp_Image_2026-07-27_at_6.55.20_PM_qyhdzy.jpg"
        },
        {
            title: "Cloud Computing with AI",
            issuer: "Unstop",
            category: "Cloud Computing & AI",
            description:
                "Completed a course exploring cloud computing fundamentals and the integration of artificial intelligence with modern cloud-based technologies.",
            image: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785865211/WhatsApp_Image_2026-07-31_at_10.01.50_PM_s9lwrx.jpg",
            link: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785865211/WhatsApp_Image_2026-07-31_at_10.01.50_PM_s9lwrx.jpg"
        },
        {
            title: "AI-Powered Performance Ads Certification",
            issuer: "Google",
            category: "Digital Marketing & AI",
            description: "Successfully completed the certification, demonstrating proficiency in leveraging AI-driven strategies to optimize advertising campaigns.",
            image: "https://res.cloudinary.com/ams1rfsh/image/upload/v1786100695/WhatsApp_Image_2026-08-07_at_4.33.02_PM_ngyifc.jpg",
            link: "https://res.cloudinary.com/ams1rfsh/image/upload/v1786100695/WhatsApp_Image_2026-08-07_at_4.33.02_PM_ngyifc.jpg"
        },
        {
            title: "CSS with AI",
            issuer: "Unstop",
            category: "Web Development & AI",
            description: "Completed a course exploring the integration of artificial intelligence with CSS to enhance web design and intelligent styling workflows.",
            image: "https://res.cloudinary.com/ams1rfsh/image/upload/v1786100696/WhatsApp_Image_2026-08-07_at_4.33.03_PM_1_td3e3j.jpg",
            link: "https://res.cloudinary.com/ams1rfsh/image/upload/v1786100696/WhatsApp_Image_2026-08-07_at_4.33.03_PM_1_td3e3j.jpg"
        },
        {
            title: "Fundamentals of DevOps On AWS",
            issuer: "Simplilearn",
            category: "Cloud Computing & DevOps",
            description: "Successfully completed an online course covering the core fundamentals of DevOps practices and deployments on the AWS cloud platform.",
            image: "https://res.cloudinary.com/ams1rfsh/image/upload/v1786100695/WhatsApp_Image_2026-08-07_at_4.33.03_PM_j9djqv.jpg",
            link: "https://res.cloudinary.com/ams1rfsh/image/upload/v1786100695/WhatsApp_Image_2026-08-07_at_4.33.03_PM_j9djqv.jpg"
        },
        {
            title: "Create Engaging Video with Google Vids",
            issuer: "Simplilearn",
            category: "Content Creation & AI",
            description: "Completed a Google Cloud-powered course focused on utilizing Google Vids and AI tools to create engaging and professional video content.",
            image: "https://res.cloudinary.com/ams1rfsh/image/upload/v1786100696/WhatsApp_Image_2026-08-07_at_4.33.01_PM_1_rgkfji.jpg",
            link: "https://res.cloudinary.com/ams1rfsh/image/upload/v1786100696/WhatsApp_Image_2026-08-07_at_4.33.01_PM_1_rgkfji.jpg"
        },
        {
            title: "Node JS",
            issuer: "Unstop",
            category: "Web Development",
            description: "Successfully completed a course on Node JS, focusing on backend JavaScript development, server setup, and modern server-side programming.",
            image: "https://res.cloudinary.com/ams1rfsh/image/upload/v1786100696/WhatsApp_Image_2026-08-07_at_4.33.01_PM_ktagww.jpg",
            link: "https://res.cloudinary.com/ams1rfsh/image/upload/v1786100696/WhatsApp_Image_2026-08-07_at_4.33.01_PM_ktagww.jpg"
        }
    ];

    const certificateTrack =
        document.getElementById("certificateTrack");

    if (!certificateTrack || certificatesData.length === 0) {
        return;
    }

    function prepareDisplayData(data, minimumCards = 6) {
        const displayData = [...data];

        while (displayData.length < minimumCards) {
            displayData.push(
                ...data.slice(
                    0,
                    minimumCards - displayData.length
                )
            );
        }

        return displayData;
    }

    const displayData = prepareDisplayData(
        certificatesData,
        6
    );


    function createCertificateCard(
        certificate,
        isDuplicate = false
    ) {
        const card = document.createElement("a");

        card.className = "certificate-card";
        card.href = certificate.link || certificate.image;
        card.target = "_blank";
        card.rel = "noopener noreferrer";

        card.setAttribute(
            "aria-label",
            `View ${certificate.title} certificate issued by ${certificate.issuer}`
        );

        if (isDuplicate) {
            card.tabIndex = -1;
        }

        const image = document.createElement("img");

        image.className = "certificate-image";
        image.src = certificate.image;
        image.alt =
            `${certificate.title} certificate by ${certificate.issuer}`;
        image.loading = "lazy";
        image.decoding = "async";

        const overlay = document.createElement("div");
        overlay.className = "certificate-overlay";

        const overlayContent = document.createElement("div");
        overlayContent.className =
            "certificate-overlay-content";

        const category = document.createElement("span");
        category.className = "certificate-category";
        category.textContent = certificate.category;

        const heading = document.createElement("h3");
        heading.textContent = certificate.title;

        const description = document.createElement("p");
        description.textContent =
            `${certificate.issuer} — ${certificate.description}`;

        const viewText = document.createElement("span");
        viewText.className = "certificate-view-text";
        viewText.innerHTML =
            `View certificate <span aria-hidden="true">→</span>`;

        overlayContent.append(
            category,
            heading,
            description,
            viewText
        );

        overlay.appendChild(overlayContent);
        card.append(image, overlay);

        return card;
    }

    function createCertificateGroup(
        data,
        isDuplicate = false
    ) {
        const group = document.createElement("div");

        group.className = "certificate-group";

        if (isDuplicate) {
            group.setAttribute("aria-hidden", "true");
        }

        data.forEach(certificate => {
            group.appendChild(
                createCertificateCard(
                    certificate,
                    isDuplicate
                )
            );
        });

        return group;
    }

    const originalGroup = createCertificateGroup(
        displayData,
        false
    );

    const duplicateGroup = createCertificateGroup(
        displayData,
        true
    );

    certificateTrack.append(
        originalGroup,
        duplicateGroup
    );


    const animationDuration = Math.max(
        28,
        displayData.length * 6
    );

    certificateTrack.style.setProperty(
        "--certificate-duration",
        `${animationDuration}s`
    );
});