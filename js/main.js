document.addEventListener('DOMContentLoaded', function() {
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
            e.stopPropagation();
            const lang = this.getAttribute('data-lang');
            const flag = this.getAttribute('data-flag');
            const text = this.querySelector('span').innerText;
            
            // 更新显示的语言
            currentLanguageText.innerText = text;
            currentLanguageFlag.src = flag;
            
            // 关闭下拉菜单
            languageDropdown.classList.add('hidden');
            
            // 这里可以添加实际的语言切换逻辑
            console.log(`Language changed to: ${lang}`);
        });
    });
    
    // 卡片链接功能
    const cards = document.querySelectorAll('.site-card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.site-name').innerText;
            console.log(`即将跳转到: ${title}`);
            // 可以在此添加跳转逻辑，例如:
            // window.open('https://example.com', '_blank');
        });
    });
    
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
}); 