document.addEventListener('DOMContentLoaded', function() {
    // 动态构建导航菜单
    buildMenu();
    
    // 动态构建网站内容
    buildSiteContent();
    
    // 初始化菜单和交互功能
    initializeMenu();
});

// 动态构建导航菜单
function buildMenu() {
    const menuContainer = document.querySelector('.menu-container');
    
    // 清空现有菜单
    menuContainer.innerHTML = '';
    
    // 遍历菜单项配置，构建菜单
    websiteConfig.menu.forEach(menuItem => {
        const menuItemWrapper = document.createElement('div');
        menuItemWrapper.className = 'menu-item-wrapper';
        if (menuItem.isActive) {
            menuItemWrapper.classList.add('active-menu');
        }
        
        // 创建主菜单项
        const menuItemLink = document.createElement('a');
        menuItemLink.href = '#';
        menuItemLink.className = 'menu-item';
        if (menuItem.hasChildren) {
            menuItemLink.classList.add('has-children');
        }
        menuItemLink.setAttribute('data-section', menuItem.id);
        
        // 添加图标
        const menuIcon = document.createElement('i');
        menuIcon.className = `${menuItem.icon} menu-icon`;
        menuItemLink.appendChild(menuIcon);
        
        // 添加文本
        const menuText = document.createElement('span');
        menuText.className = 'menu-text';
        menuText.textContent = menuItem.text;
        menuItemLink.appendChild(menuText);
        
        // 如果有子菜单，添加箭头图标
        if (menuItem.hasChildren) {
            const menuArrow = document.createElement('i');
            menuArrow.className = 'fas fa-chevron-right menu-arrow';
            menuItemLink.appendChild(menuArrow);
        }
        
        menuItemWrapper.appendChild(menuItemLink);
        
        // 如果有子菜单，构建子菜单
        if (menuItem.hasChildren && menuItem.children && menuItem.children.length > 0) {
            const submenu = document.createElement('div');
            submenu.className = 'submenu';
            
            menuItem.children.forEach(submenuItem => {
                if (submenuItem.isHot) {
                    // 带有 Hot 标签的子菜单项
                    const submenuItemWrapper = document.createElement('div');
                    submenuItemWrapper.className = 'submenu-item-wrapper';
                    
                    const submenuItemLink = document.createElement('a');
                    submenuItemLink.href = '#';
                    submenuItemLink.className = 'submenu-item';
                    submenuItemLink.setAttribute('data-section', submenuItem.id);
                    submenuItemLink.textContent = submenuItem.text;
                    
                    const hotTag = document.createElement('span');
                    hotTag.className = 'hot-tag';
                    hotTag.textContent = 'Hot';
                    submenuItemLink.appendChild(hotTag);
                    
                    submenuItemWrapper.appendChild(submenuItemLink);
                    submenu.appendChild(submenuItemWrapper);
                } else {
                    // 普通子菜单项
                    const submenuItemLink = document.createElement('a');
                    submenuItemLink.href = '#';
                    submenuItemLink.className = 'submenu-item';
                    submenuItemLink.setAttribute('data-section', submenuItem.id);
                    submenuItemLink.textContent = submenuItem.text;
                    submenu.appendChild(submenuItemLink);
                }
            });
            
            menuItemWrapper.appendChild(submenu);
        }
        
        menuContainer.appendChild(menuItemWrapper);
    });
    
    // 添加"关于本站"菜单项
    const aboutWrapper = document.createElement('div');
    aboutWrapper.className = 'menu-item-wrapper border-t border-gray-800 mt-auto';
    
    const aboutLink = document.createElement('a');
    aboutLink.href = websiteConfig.about.url;
    aboutLink.className = 'menu-item external-link';
    aboutLink.setAttribute('target', '_self');
    
    const aboutIcon = document.createElement('i');
    aboutIcon.className = `${websiteConfig.about.icon} menu-icon`;
    aboutLink.appendChild(aboutIcon);
    
    const aboutText = document.createElement('span');
    aboutText.className = 'menu-text';
    aboutText.textContent = websiteConfig.about.text;
    aboutLink.appendChild(aboutText);
    
    aboutWrapper.appendChild(aboutLink);
    
    // 添加到侧边栏，在菜单容器之后
    const sidebar = document.querySelector('.bg-sidebar');
    sidebar.insertBefore(aboutWrapper, document.querySelector('.text-gray-500.text-xs.p-2'));
}

// 动态构建网站内容
function buildSiteContent() {
    const contentArea = document.querySelector('.p-6');
    
    // 清空现有内容
    contentArea.innerHTML = '';
    
    // 遍历内容配置，构建各个部分
    for (const [sectionId, sectionData] of Object.entries(websiteContent.sections)) {
        // 创建内容区块
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'mb-8';
        sectionDiv.id = sectionId;
        
        // 创建区块标题
        const titleContainer = document.createElement('div');
        titleContainer.className = 'flex items-center mb-4';
        
        const titleIcon = document.createElement('i');
        titleIcon.className = `${sectionData.icon} text-gray-500 mr-2`;
        titleContainer.appendChild(titleIcon);
        
        const titleText = document.createElement('h2');
        titleText.className = 'text-gray-600 text-lg';
        titleText.textContent = sectionData.title;
        titleContainer.appendChild(titleText);
        
        // 如果有 Hot 标签
        if (sectionData.isHot) {
            const hotTag = document.createElement('span');
            hotTag.className = 'hot-tag ml-2';
            hotTag.textContent = 'Hot';
            titleContainer.appendChild(hotTag);
        }
        
        sectionDiv.appendChild(titleContainer);
        
        // 创建网站卡片容器
        const cardGrid = document.createElement('div');
        cardGrid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4';
        
        // 遍历网站列表，创建卡片
        sectionData.sites.forEach(site => {
            const siteCard = document.createElement('div');
            siteCard.className = 'site-card';
            
            // 添加点击事件，打开对应的 URL
            if (site.URL) {
                siteCard.style.cursor = 'pointer';
                siteCard.setAttribute('title', `点击访问: ${site.URL}`);
                siteCard.addEventListener('click', function() {
                    window.open(site.URL, '_self');
                });
            }
            
            const cardContent = document.createElement('div');
            cardContent.className = 'flex items-center p-3';
            
            const iconContainer = document.createElement('div');
            iconContainer.className = `site-icon ${site.background}`;
            
            const iconImg = document.createElement('img');
            iconImg.src = site.icon;
            iconImg.alt = site.name;
            iconContainer.appendChild(iconImg);
            
            cardContent.appendChild(iconContainer);
            
            const textContainer = document.createElement('div');
            textContainer.className = 'ml-3 overflow-hidden';
            
            const siteName = document.createElement('h3');
            siteName.className = 'site-name';
            siteName.textContent = site.name;
            textContainer.appendChild(siteName);
            
            const siteDesc = document.createElement('p');
            siteDesc.className = 'site-desc';
            siteDesc.textContent = site.description;
            textContainer.appendChild(siteDesc);
            
            cardContent.appendChild(textContainer);
            siteCard.appendChild(cardContent);
            
            cardGrid.appendChild(siteCard);
        });
        
        sectionDiv.appendChild(cardGrid);
        contentArea.appendChild(sectionDiv);
    }
}

// 初始化菜单交互功能
function initializeMenu() {
    // 侧边栏折叠/展开功能
    const menuToggleButton = document.querySelector('.fa-bars').parentElement;
    const sidebar = document.querySelector('.bg-sidebar');
    const mainContent = document.querySelector('.flex-1');
    
    // 初始化菜单状态 - 确保只有第一个菜单项被选中
    function initializeMenuState() {
        // 清除所有活动状态
        clearAllActiveStates();
        
        // 只选中第一个菜单项
        const firstMenuItem = document.querySelector('.menu-item-wrapper');
        if (firstMenuItem) {
            firstMenuItem.classList.add('active-menu');
            
            // 滚动到对应的内容区域
            const sectionId = firstMenuItem.querySelector('.menu-item').getAttribute('data-section');
            if (sectionId) {
                scrollToSection(sectionId);
            }
        }
        
        // 确保所有子菜单都是关闭状态
        document.querySelectorAll('.submenu').forEach(submenu => {
            submenu.classList.remove('show');
        });
        
        // 确保所有带下拉菜单的箭头都是向右的
        document.querySelectorAll('.menu-arrow').forEach(arrow => {
            arrow.classList.remove('fa-chevron-down');
            arrow.classList.add('fa-chevron-right');
        });
    }
    
    // 在DOM内容加载完成后立即初始化菜单状态
    initializeMenuState();
    
    menuToggleButton.addEventListener('click', function() {
        sidebar.classList.toggle('hidden');
        
        // 调整主内容区域
        if (sidebar.classList.contains('hidden')) {
            mainContent.classList.add('sidebar-hidden');
        } else {
            mainContent.classList.remove('sidebar-hidden');
        }
    });
    
    // 清除所有菜单项及子菜单项的活动状态
    function clearAllActiveStates() {
        // 清除所有菜单项的活动状态
        document.querySelectorAll('.menu-item-wrapper').forEach(wrapper => {
            wrapper.classList.remove('active-menu');
        });
        
        // 清除所有子菜单项的活动状态
        document.querySelectorAll('.submenu-item-wrapper').forEach(wrapper => {
            wrapper.classList.remove('active-submenu');
        });
        
        // 重置任何可能有内联样式的子菜单项
        document.querySelectorAll('.submenu-item').forEach(item => {
            item.style.backgroundColor = '';
            item.style.color = '';
        });
    }
    
    // 滚动到指定的内容区域
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // 设置菜单项点击处理器
    function setupMenuHandlers() {
        // 菜单展开/折叠功能
        const menuItems = document.querySelectorAll('.menu-item.has-children');
        
        menuItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // 找到对应的子菜单
                const parentWrapper = this.closest('.menu-item-wrapper');
                const submenu = parentWrapper.querySelector('.submenu') || 
                                this.parentElement.nextElementSibling;
                
                // 获取当前子菜单的显示状态
                const isSubmenuShown = submenu && submenu.classList.contains('show');
                
                // 先关闭所有已展开的子菜单
                document.querySelectorAll('.submenu.show').forEach(openSubmenu => {
                    // 不要立即关闭当前点击的子菜单
                    if (openSubmenu !== submenu) {
                        // 平滑关闭子菜单
                        openSubmenu.style.overflow = 'hidden';
                        openSubmenu.classList.remove('show');
                        
                        // 同时将其父菜单的箭头改为向右
                        const parentItem = openSubmenu.previousElementSibling;
                        if (parentItem && parentItem.classList.contains('has-children')) {
                            const arrow = parentItem.querySelector('.menu-arrow');
                            if (arrow) {
                                arrow.classList.remove('fa-chevron-down');
                                arrow.classList.add('fa-chevron-right');
                            }
                        }
                    }
                });
                
                if (submenu) {
                    // 确保子菜单位置固定
                    submenu.style.position = 'relative';
                    submenu.style.left = '0';
                    
                    // 切换当前子菜单的显示状态
                    submenu.classList.toggle('show');
                    
                    // 切换箭头方向
                    const arrow = this.querySelector('.menu-arrow');
                    if (arrow) {
                        if (submenu.classList.contains('show')) {
                            arrow.classList.remove('fa-chevron-right');
                            arrow.classList.add('fa-chevron-down');
                        } else {
                            arrow.classList.remove('fa-chevron-down');
                            arrow.classList.add('fa-chevron-right');
                        }
                    }
                }
                
                // 设置当前菜单项的活动状态
                clearAllActiveStates();
                parentWrapper.classList.add('active-menu');
            });
        });
        
        // 普通菜单项点击
        document.querySelectorAll('.menu-item:not(.has-children):not(.external-link)').forEach(item => {
            item.addEventListener('click', function(e) {
                // 检查链接是否是外部链接或其他页面链接
                const href = this.getAttribute('href');
                if (href && href !== '#' && !href.startsWith('#')) {
                    // 允许链接的默认行为（打开链接）
                    return;
                }
                
                // 否则阻止默认行为，按照导航逻辑处理
                e.preventDefault();
                
                // 清除所有活动状态
                clearAllActiveStates();
                
                // 设置当前菜单项的活动状态
                this.closest('.menu-item-wrapper').classList.add('active-menu');
                
                // 关闭所有子菜单
                document.querySelectorAll('.submenu.show').forEach(submenu => {
                    submenu.classList.remove('show');
                    
                    // 更新箭头方向
                    const parentItem = submenu.previousElementSibling;
                    if (parentItem) {
                        const arrow = parentItem.querySelector('.menu-arrow');
                        if (arrow) {
                            arrow.classList.remove('fa-chevron-down');
                            arrow.classList.add('fa-chevron-right');
                        }
                    }
                });
                
                // 如果有对应的内容区域，滚动到该区域
                const sectionId = this.getAttribute('data-section');
                if (sectionId) {
                    scrollToSection(sectionId);
                }
            });
        });
        
        // 为外部链接添加活动状态，但不阻止默认行为
        document.querySelectorAll('.menu-item.external-link').forEach(item => {
            item.addEventListener('click', function() {
                // 清除所有活动状态
                clearAllActiveStates();
                
                // 设置当前菜单项的活动状态
                this.closest('.menu-item-wrapper').classList.add('active-menu');
            });
        });
        
        // 子菜单项点击
        document.querySelectorAll('.submenu-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation(); // 阻止事件冒泡到父菜单项
                
                // 清除所有活动状态
                clearAllActiveStates();
                
                // 设置当前子菜单项的活动状态
                const parentItem = this.closest('.submenu-item-wrapper');
                if (parentItem) {
                    parentItem.classList.add('active-submenu');
                } else {
                    // 如果没有包装器，设置临时样式
                    this.style.backgroundColor = 'rgba(31, 41, 55, 0.4)';
                    this.style.color = '#fff';
                }
                
                // 设置父菜单项为活动状态
                const parentMenuWrapper = this.closest('.menu-item-wrapper');
                if (parentMenuWrapper) {
                    parentMenuWrapper.classList.add('active-menu');
                }
                
                // 如果有对应的内容区域，滚动到该区域
                const sectionId = this.getAttribute('data-section');
                if (sectionId) {
                    scrollToSection(sectionId);
                }
            });
        });
    }
    
    // 设置菜单点击处理器
    setupMenuHandlers();
    
    // 语言选择器功能
    const languageSelector = document.getElementById('language-selector');
    const languageDropdown = document.getElementById('language-dropdown');
    const currentLanguageText = document.getElementById('current-language');
    const currentLanguageFlag = document.getElementById('current-language-flag');
    const languageOptions = document.querySelectorAll('.language-option');
    
    // 点击语言选择器显示/隐藏下拉菜单
    if (languageSelector) {
        languageSelector.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            languageDropdown.classList.toggle('hidden');
        });
    }
    
    // 点击页面其他地方关闭下拉菜单
    document.addEventListener('click', function(e) {
        if (languageDropdown && !languageSelector.contains(e.target) && !languageDropdown.contains(e.target)) {
            languageDropdown.classList.add('hidden');
        }
    });
    
    // 点击语言选项切换语言
    languageOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            const flag = this.getAttribute('data-flag');
            
            // 更新当前显示的语言
            currentLanguageText.textContent = this.querySelector('span').textContent;
            currentLanguageFlag.src = flag;
            currentLanguageFlag.alt = this.querySelector('span').textContent;
            
            // 隐藏下拉菜单
            languageDropdown.classList.add('hidden');
            
            // 这里可以添加语言切换相关的逻辑
        });
    });
}

// 响应式布局处理
function handleResize() {
    if (window.innerWidth < 768) {
        if (!sidebar.classList.contains('hidden')) {
            sidebar.classList.add('hidden');
            mainContent.classList.add('sidebar-hidden');
        }
    } else {
        sidebar.classList.remove('hidden');
        mainContent.classList.remove('sidebar-hidden');
    }
}

// 初始检查窗口大小
handleResize();

// 监听窗口大小变化
window.addEventListener('resize', handleResize);

// 添加平滑滚动效果
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}); 