// 网站配置文件
const websiteConfig = {
    // 导航菜单配置
    menu: [
        {
            id: "shang-section",
            text: "上站必备",
            icon: "fas fa-star",
            isActive: true,
            hasChildren: false
        },
        {
            id: "xu-section",
            text: "需求调研",
            icon: "fas fa-info-circle",
            isActive: false,
            hasChildren: false
        },
        {
            id: "zixun-section",
            text: "资讯部分",
            icon: "far fa-lightbulb",
            isActive: false,
            hasChildren: true,
            children: []
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
 