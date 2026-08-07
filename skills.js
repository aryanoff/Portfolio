document.addEventListener("DOMContentLoaded", () => {

    const skillCategories = [
        {
            name: "HTML5",
            category: "frontend",
            badge: "Core",
            description: "Semantic structure, accessibility, and SEO.",
            icon: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785845992/images_ppw5j6.png",
            color: "#e34f26",
            glow: "rgba(227, 79, 38, 0.13)"
        },
        {
            name: "CSS3",
            category: "frontend",
            badge: "Core",
            description: "Responsive layouts, Flexbox, Grid, and animations.",
            icon: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785845824/images_d2r6pl.png",
            color: "#1572b6",
            glow: "rgba(21, 114, 182, 0.13)"
        },
        {
            name: "JavaScript",
            category: "frontend",
            badge: "Learning",
            description: "ES6+, DOM manipulation, events, and APIs.",
            icon: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785845871/JavaScript-logo_clz72i.png",
            color: "#d6b900",
            glow: "rgba(247, 223, 30, 0.14)"
        },
        {
            name: "React",
            category: "frontend",
            badge: "Learning",
            description: "Components, hooks, state, and modern interfaces.",
            icon: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785849529/960px-React-icon.svg_ys4k1h.png",
            color: "#61dafb",
            glow: "rgba(97, 218, 251, 0.15)"
        },

        {
            name: "Supabase",
            category: "backend",
            badge: "Database",
            description: "Database, authentication, storage, and backend APIs.",
            icon: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785849710/supabase-logo-png_seeklogo-435677_veg0ij.png",
            color: "#3ecf8e",
            glow: "rgba(62, 207, 142, 0.14)"
        },

        {
        name: "GitHub",
        category: "tools-ecosystem",
        badge: "Essential",
        description: "Code Hosting & Collaboration.",
        icon: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785847566/25231_le0e3v.png",
        color: "#000000",
        glow: "rgba(0, 0, 0, 0.13)",
        },
        {
        name: "Git",
        category: "tools-ecosystem",
        badge: "Essential",
        description: "Code Version Control.",
        icon: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785848016/images_fhlkfm.png",
        color: "#f05032",
        glow: "rgba(240, 80, 50, 0.13)",
        },
        {
        name: "Vercel",
        category: "tools-ecosystem",
        badge: "Essential",
        description: "Frontend Hosting & Serverless.",
        icon: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785848162/vercel-icon_zycffb.svg",
        color: "#000000",
        glow: "rgba(0, 0, 0, 0.13)",
        },
        {
        name: "VS Code",
        category: "tools-ecosystem",
        badge: "Essential",
        description: "Primary Code Editor.",
        icon: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785848268/visual-studio-code-logo-png-transparent_jane7n.png",
        color: "#0078d7",
        glow: "rgba(0, 120, 215, 0.13)",
        },
        {
        name: "Render",
        category: "tools-ecosystem",
        badge: "Essential",
        description: "Cloud Hosting Services.",
        icon: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785848625/ec37a3660704e1fa2b4246c9a01ab34e145194ad-824x824_w5qwml.png",
        color: "#000000",
        glow: "rgba(0, 0, 0, 0.13)",
        },
        {
        name: "Netlify",
        category: "tools-ecosystem",
        badge: "Essential",
        description: "Cloud Hosting Services.",
        icon: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785848762/netlify-icon_hdgep6.png",
        color: "#05bdba",
        glow: "rgba(5, 189, 218, 0.13)",
        },
        {
        name: "Cursor",
        category: "tools-ecosystem",
        badge: "Essential",
        description: "AI Code Editor & AI-Powered Development.",
        icon: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785848924/cursor_saihwb.png",
        color: "#000000",
        glow: "rgba(0, 0, 0, 0.13)",
        },
        {
        name: "GitHub Copilot",
        category: "tools-ecosystem",
        badge: "Code Assistant",
        description: "Accelerating full-stack development in React and Supabase with predictive code suggestions and real-time debugging.",
        icon: "https://res.cloudinary.com/ams1rfsh/image/upload/ar_1:1,c_auto/img.icons8.com_aeobst.png",
        color: "#a04ced",
        glow: "rgba(160, 76, 237, 0.13)",
        },
        {
        name: "Antigravity",
        category: "tools-ecosystem",
        badge: "Essential",
        description: "AI-Assisted Development Agent",
        icon: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785849002/antigravity-icon__full-color_bbrdst.png",
        color: "#3487fa",
        glow: "rgba(52, 135, 250, 0.13)",
        },

        {
            name: "UI/UX Design",
            category: "design",
            badge: "Core Skill",
            description: "Simple and user-friendly interfaces for every screen.",
            icon: "assets/png-images/UIUX Design.png",
            color: "#8b5cf6",
            glow: "rgba(139, 92, 246, 0.14)"
        },

        {
            name: "FL Studio",
            category: "creative",
            badge: "Primary Tool",
            description: "Music production, arrangement, recording, and editing.",
            icon: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785846255/fl-studio_lh9c7a.webp",
            color: "#f97316",
            glow: "rgba(249, 115, 22, 0.14)"
        },
        {
            name: "Music Production",
            category: "creative",
            badge: "Creative Skill",
            description: "Original music, remixes, mashups, and arrangements.",
            icon: "assets/png-images/Music Producer.png",
            color: "#ec4899",
            glow: "rgba(236, 72, 153, 0.13)"
        },
        {
            name: "Canva",
            category: "creative",
            badge: "Creative Skill",
            description: "Cover artwork, thumbnails, posters, and social visuals.",
            icon: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785846807/images_ekhhnn.jpg",
            color: "#02bfcc",
            glow: "rgba(14, 191, 204, 0.14)"
        },
        {
            name: "CapCut",
            category: "creative",
            badge: "Creative Skill",
            description: "Professional video editing, transitions, visual effects, color grading, and social media content creation.",
            icon: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785846993/capcut-logo-on-transparent-white-background-free-vector_vuiffo.jpg",
            color: "#000000",
            glow: "rgba(0, 0, 0, 0.14)"
        },

        {
            name: "TuneCore",
            category: "exploring",
            badge: "Experience",
            description: "Managing global music distribution, troubleshooting cross-platform release issues, and streamlining the digital delivery workflow.",
            icon: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785851787/tunecore-logo-png_seeklogo-424847_seeco4.png",
            color: "#6fc16f",
            glow: "rgba(111, 193, 111, 0.14)"
        },
        {
            name: "Youtube",
            category: "exploring",
            badge: "Experience",
            description: "Content Creation and Yt Studio Management.",
            icon: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785850297/Youtube_logo_snsym4.png",
            color: "#ff0000",
            glow: "rgba(255, 0, 0, 0.14)"
        },
        {
            name: "Instagram",
            category: "exploring",
            badge: "Experience",
            description: "Content Creation and Reels Management.",
            icon: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785851025/images_ogdqeg.jpg",
            color: "#803cb0",
            glow: "rgba(128, 60, 176, 0.14)"
        },

        {
        name: "ChatGPT",
        category: "ai-tech",
        badge: "Logic & Code",
        description: "Debugging full-stack code, structuring web projects, and automating content creation workflows.",
        icon: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785849219/960px-ChatGPT-Logo.svg_cru7sz.png",
        color: "#000000",
        glow: "rgba(0, 0, 0, 0.13)",
        },
        {
        name: "Gemini",
        category: "ai-tech",
        badge: "Research & Strategy",
        description: "Analyzing trends, refining project concepts, and generating creative solutions across technical and design tasks.",
        icon: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785852233/gemini-google-icon-symbol-logo-free-png_lukuon.png",
        color: "#147ffd",
        glow: "rgba(20, 127, 253, 0.13)",
        },
        {
        name: "Claude",
        category: "ai-tech",
        badge: "Deep Analysis",
        description: "Handling complex coding logic, extensive text processing, and fine-tuning technical documentation.",
        icon: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785853262/claude-ai-icon_ytotl6.png",
        color: "#d77655",
        glow: "rgba(215, 118, 85, 0.13)",
        },
        {
        name: "Google Flow",
        category: "ai-tech",
        badge: "Workflow Automation",
        description: "Optimizing digital workflows and integrating AI-driven efficiency into full-stack development processes.",
        icon: "https://res.cloudinary.com/ams1rfsh/image/upload/c_lfill,h_300,w_1000/r_600/hero_labs_25f34baa_3ece6c042b_ifkpgt.png",
        color: "#7b66ff",
        glow: "rgba(123, 102, 255, 0.13)",
        },
        {
        name: "Microsoft Copilot",
        category: "ai-tech",
        badge: "Productivity",
        description: "Accelerating development timelines and enhancing daily productivity within integrated workspaces.",
        icon: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785853747/images_bvfb1e.jpg",
        color: "#d0c221",
        glow: "rgba(208, 194, 33, 0.13)",
        },
        {
        name: "Suno Ai",
        category: "ai-tech",
        badge: "Audio Generation",
        description: "Generating high-quality foundational tracks, melodies, and innovative concepts for music production.",
        icon: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785853695/suno-ai-icon-logo_bvvqfx.png",
        color: "#ff4829",
        glow: "rgba(255, 72, 41, 0.13)",
        },
        {
        name: "Google Flow Music",
        category: "ai-tech",
        badge: "Creative Audio",
        description: "Refining studio tracks and utilizing AI-powered credits for creative audio production and mastering.",
        icon: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785853597/copy_of_d5vyh1aj_400x400_mf7jgu.jpg",
        color: "#9ed7a2",
        glow: "rgba(158, 215, 162, 0.13)",
        },
        {
        name: "Eleven Labs",
        category: "ai-tech",
        badge: "Voice Synthesis",
        description: "Creating ultra-realistic AI voiceovers and cinematic vocal elements for multimedia and storytelling projects.",
        icon: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785853387/elevenlabs-symbol-rounded-hd-free-png_cfosmf.png",
        color: "#000000",
        glow: "rgba(0, 0, 0, 0.13)",
        },
        {
        name: "Meta AI",
        category: "ai-tech",
        badge: "Social & Search",
        description: "Quick information retrieval and generating visual concepts to boost social media engagement.",
        icon: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785853319/3840px-Meta_AI_Logo__282026_29.svg_cohl5p.png",
        color: "#6f4eff",
        glow: "rgba(111, 78, 255, 0.13)",
        },
        {
        name: "Groq AI",
        category: "ai-tech",
        badge: "High-Speed Inference",
        description: "Leveraging ultra-fast AI inference for real-time problem solving and rapid code generation.",
        icon: "https://res.cloudinary.com/ams1rfsh/image/upload/v1785853835/grok-ai-icon_adopnw.png",
        color: "#000000",
        glow: "rgba(0, 0, 0, 0.13)",
        },
       
    ];

    const filtersContainer = document.getElementById("skillFilters");
    const skillsGrid = document.getElementById("skillsGrid");

    let activeCategory = "all";

    if (!filtersContainer || !skillsGrid) {
        return;
    }

    function createInitials(skillName) {
        return skillName
            .split(" ")
            .map(word => word.charAt(0))
            .join("")
            .slice(0, 2)
            .toUpperCase();
    }

    function renderFilters() {
        filtersContainer.replaceChildren();

        skillCategories.forEach(category => {
            const button = document.createElement("button");

            button.type = "button";
            button.className = "skill-filter-button";
            button.textContent = category.label;
            button.dataset.category = category.id;

            const isActive = category.id === activeCategory;

            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));

            filtersContainer.appendChild(button);
        });
    }

    function createSkillCard(skill, index) {
        const card = document.createElement("article");

        card.className = "skill-tech-card";
        card.style.setProperty("--card-accent", skill.color);
        card.style.setProperty("--card-glow", skill.glow);
        card.style.animationDelay = `${index * 45}ms`;

        const cardTop = document.createElement("div");
        cardTop.className = "skill-card-top";

        const iconContainer = document.createElement("div");
        iconContainer.className = "skill-card-icon";

        const image = document.createElement("img");
        image.src = skill.icon;
        image.alt = `${skill.name} icon`;
        image.width = 42;
        image.height = 42;
        image.loading = "lazy";

        const fallback = document.createElement("span");
        fallback.className = "skill-icon-fallback";
        fallback.textContent = createInitials(skill.name);
        fallback.hidden = true;

        image.addEventListener("error", () => {
            image.hidden = true;
            fallback.hidden = false;
        });

        iconContainer.append(image, fallback);

        const badge = document.createElement("span");
        badge.className = "skill-card-badge";
        badge.textContent = skill.badge;

        cardTop.append(iconContainer, badge);

        const cardBody = document.createElement("div");
        cardBody.className = "skill-card-body";

        const heading = document.createElement("h3");
        heading.textContent = skill.name;

        const description = document.createElement("p");
        description.textContent = skill.description;

        cardBody.append(heading, description);
        card.append(cardTop, cardBody);

        return card;
    }

    function renderSkills(category = "all") {
        activeCategory = category;

        const filteredSkills =
            category === "all"
                ? skillsData
                : skillsData.filter(
                    skill => skill.category === category
                );

        skillsGrid.replaceChildren();

        if (filteredSkills.length === 0) {
            const emptyMessage = document.createElement("p");

            emptyMessage.className = "skills-empty-message";
            emptyMessage.textContent =
                "No skills have been added to this category yet.";

            skillsGrid.appendChild(emptyMessage);
            return;
        }

        const fragment = document.createDocumentFragment();

        filteredSkills.forEach((skill, index) => {
            fragment.appendChild(createSkillCard(skill, index));
        });

        skillsGrid.appendChild(fragment);
    }

    filtersContainer.addEventListener("click", event => {
        const selectedButton = event.target.closest(
            ".skill-filter-button"
        );

        if (!selectedButton) {
            return;
        }

        activeCategory = selectedButton.dataset.category;

        filtersContainer
            .querySelectorAll(".skill-filter-button")
            .forEach(button => {
                const isSelected =
                    button.dataset.category === activeCategory;

                button.classList.toggle("active", isSelected);
                button.setAttribute(
                    "aria-pressed",
                    String(isSelected)
                );
            });

        renderSkills(activeCategory);
    });

    renderFilters();
    renderSkills(activeCategory);
});