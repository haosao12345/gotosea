// 网站内容配置
const websiteContent = {
    // 网站内容配置
    sections: {
        "recommended-section": {
            title: "Recommended",
            icon: "fas fa-star",
            sites: [
                {
                    name: "Dribbble",
                    icon: "images/dribbble.png",
                    background: "bg-pink-500",
                    description: "全球UI设计师作品分享平台。"
                },
                {
                    name: "Behance",
                    icon: "images/behance.png",
                    background: "bg-blue-500",
                    description: "Adobe旗下设计师交流平台，来自世界各地的设计师在这里分享自己的作品。"
                },
                {
                    name: "UI中国",
                    icon: "images/uichina.png",
                    background: "bg-blue-600",
                    description: "国内交互与User Interface设计，优品展示，学习平台。"
                },
                {
                    name: "站酷",
                    icon: "images/zcool.png",
                    background: "bg-yellow-500",
                    description: "中国人气设计师互动平台"
                },
                {
                    name: "Pinterest",
                    icon: "images/pinterest.png",
                    background: "bg-red-600",
                    description: "全球图片收藏采集站"
                },
                {
                    name: "花瓣",
                    icon: "images/huaban.png",
                    background: "bg-red-400",
                    description: "收集灵感,保存有用的素材"
                },
                {
                    name: "Medium",
                    icon: "images/medium.png",
                    background: "bg-green-500",
                    description: "高质量Design Article"
                },
                {
                    name: "优设",
                    icon: "images/uisdc.png",
                    background: "bg-gray-800",
                    description: "设计师交流学习平台"
                },
                {
                    name: "Producthunt",
                    icon: "images/producthunt.png",
                    background: "bg-orange-500",
                    description: "发现新鲜有趣的产品"
                },
                {
                    name: "Youtube",
                    icon: "images/youtube.png",
                    background: "bg-red-600",
                    description: "全球最大的学习分享平台"
                },
                {
                    name: "Google",
                    icon: "images/google.png",
                    background: "bg-white border",
                    description: "全球最大的学习分享平台"
                }
            ]
        },
        "recommended-extra": {
            title: "Recommended",
            icon: "fas fa-star",
            sites: [
                {
                    name: "阿里云",
                    icon: "images/aliyun.png",
                    background: "bg-gray-800",
                    description: "500强名企云服务器"
                },
                {
                    name: "西部·科学上网",
                    icon: "images/xibu.png",
                    background: "bg-blue-500",
                    description: "优秀科学上网（套餐，但是超级）"
                },
                {
                    name: "设计师网",
                    icon: "images/sheji.png",
                    background: "bg-gray-800",
                    description: "最新设计资讯（值心推荐）"
                }
            ]
        },
        "information-section": {
            title: "Information",
            icon: "fas fa-info-circle",
            sites: [
                {
                    name: "虎嗅网",
                    icon: "images/huxiu.png",
                    background: "bg-orange-500",
                    description: "人工智能和新媒体领域的互联网科技媒体"
                },
                {
                    name: "36Kr",
                    icon: "images/36kr.png",
                    background: "bg-blue-500",
                    description: "创业资讯、科技新闻"
                },
                {
                    name: "数英网",
                    icon: "images/shuyingwang.png",
                    background: "bg-gray-200",
                    description: "数字营销及职业招聘网站"
                },
                {
                    name: "镝数网",
                    icon: "images/dishu.png",
                    background: "bg-blue-200",
                    description: "互联网创业项目日常资讯内容网站"
                }
            ]
        },
        "product-section": {
            title: "Product",
            icon: "fas fa-box",
            sites: [
                {
                    name: "Producthunt",
                    icon: "images/producthunt.png",
                    background: "bg-orange-500",
                    description: "发现新鲜有趣的产品"
                },
                {
                    name: "NEXT",
                    icon: "images/next.png",
                    background: "bg-blue-500",
                    description: "不错过任何一个新产品"
                }
            ]
        },
        "ui-inspiration-section": {
            title: "UI Inspiration",
            icon: "fas fa-palette",
            sites: [
                {
                    name: "Dribbble",
                    icon: "images/dribbble.png",
                    background: "bg-pink-500",
                    description: "全球UI设计师作品分享平台"
                },
                {
                    name: "Collect UI",
                    icon: "images/collectui.png",
                    background: "bg-blue-400",
                    description: "每日UI灵感收集"
                }
            ]
        },
        "web-inspiration-section": {
            title: "WEB Inspiration",
            icon: "fas fa-globe",
            isHot: true,
            sites: [
                {
                    name: "Awwwards",
                    icon: "images/awwwards.png",
                    background: "bg-yellow-500",
                    description: "网站设计奖项和灵感来源"
                },
                {
                    name: "CSS Design Awards",
                    icon: "images/cssdesignawards.png",
                    background: "bg-gray-800",
                    description: "网站奖项和CSS画廊"
                }
            ]
        }
    }
};

// 如果在Node.js环境中，导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = websiteContent;
} 