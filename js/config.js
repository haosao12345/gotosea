// 网站配置文件
const websiteConfig = {
    // 导航菜单配置
    menu: [
        {
            id: "recommended-section",
            text: "Recommended",
            icon: "fas fa-star",
            isActive: true,
            hasChildren: false
        },
        {
            id: "information-section",
            text: "Information",
            icon: "fas fa-info-circle",
            isActive: false,
            hasChildren: false
        },
        {
            id: "inspiration-section",
            text: "Inspiration",
            icon: "far fa-lightbulb",
            isActive: false,
            hasChildren: true,
            children: [
                {
                    id: "product-section",
                    text: "Product",
                    isHot: false
                },
                {
                    id: "ui-inspiration-section",
                    text: "UI Inspiration",
                    isHot: false
                },
                {
                    id: "web-inspiration-section",
                    text: "WEB Inspiration",
                    isHot: true
                }
            ]
        },
        {
            id: "resources-section",
            text: "Resources",
            icon: "fas fa-thumbs-up",
            isActive: false,
            hasChildren: true,
            children: []
        },
        {
            id: "design-tools-section",
            text: "Design Tools",
            icon: "fas fa-gem",
            isActive: false,
            hasChildren: true,
            children: [
                {
                    id: "creative-graphics-section",
                    text: "Creative Graphics",
                    isHot: false
                },
                {
                    id: "user-interface-section",
                    text: "User Interface",
                    isHot: false
                },
                {
                    id: "motion-design-section",
                    text: "Motion Design",
                    isHot: false
                },
                {
                    id: "colors-section",
                    text: "Colors",
                    isHot: false
                },
                {
                    id: "online-tools-section",
                    text: "Online Tools",
                    isHot: false
                },
                {
                    id: "chrome-plugins-section",
                    text: "Chrome Plug-ins",
                    isHot: false
                }
            ]
        },
        {
            id: "tutorial-section",
            text: "Tutorial",
            icon: "fas fa-pencil-alt",
            isActive: false,
            hasChildren: true,
            children: [
                {
                    id: "design-guidelines-section",
                    text: "Design Guidelines",
                    isHot: false
                },
                {
                    id: "video-tutorial-section",
                    text: "Video Tutorial",
                    isHot: false
                },
                {
                    id: "design-article-section",
                    text: "Design Article",
                    isHot: false
                },
                {
                    id: "design-fm-section",
                    text: "Design FM",
                    isHot: false
                },
                {
                    id: "ux-section",
                    text: "UX",
                    isHot: true
                }
            ]
        },
        {
            id: "ued-team-section",
            text: "UED Team",
            icon: "fas fa-user",
            isActive: false,
            hasChildren: false
        }
    ],
    
    // 关于本站链接
    about: {
        text: "关于本站",
        icon: "fas fa-heart",
        url: "about.html"
    }
};

// 如果在Node.js环境中，导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = websiteConfig;
} 
 