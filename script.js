/**
 * 毛玻璃苹果风个人介绍页 - 交互脚本
 * 
 * 功能说明：
 * 1. 卡片入场动画后的微交互效果
 * 2. 技能标签的随机悬浮动画
 * 3. 按钮点击波纹效果
 * 4. 鼠标移动视差效果（可选）
 */

// ============================================
// DOM 加载完成后初始化
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有交互功能
    initSkillTagsAnimation();
    initButtonRippleEffect();
    initParallaxEffect();
    initSmoothScroll();
});

/**
 * 技能标签动画
 * 为每个技能标签添加随机的轻微浮动效果，增加生动感
 */
function initSkillTagsAnimation() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach((tag, index) => {
        // 为每个标签设置不同的动画延迟，创造自然错落感
        const delay = index * 0.1;
        tag.style.animationDelay = `${delay}s`;
        
        // 添加数据属性用于 CSS 动画引用
        tag.setAttribute('data-index', index);
    });
}

/**
 * 按钮波纹效果
 * 点击按钮时产生类似 Material Design 的波纹扩散效果
 */
function initButtonRippleEffect() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 获取点击位置相对于按钮的坐标
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // 创建波纹元素
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // 将波纹元素添加到按钮中
            button.appendChild(ripple);
            
            // 动画结束后移除波纹元素
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/**
 * 视差滚动效果
 * 根据鼠标移动位置轻微移动背景形状，创造深度感
 */
function initParallaxEffect() {
    const shapes = document.querySelectorAll('.shape');
    const card = document.querySelector('.glass-card');
    
    // 仅在非移动设备上启用视差效果
    if (window.matchMedia('(hover: hover)').matches) {
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // 计算鼠标位置相对于窗口中心的偏移
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const offsetX = (mouseX - centerX) / centerX;
            const offsetY = (mouseY - centerY) / centerY;
            
            // 为背景形状应用不同的偏移量，创造层次感
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 10; // 不同形状不同速度
                const x = offsetX * speed;
                const y = offsetY * speed;
                
                shape.style.transform = `translate(${x}px, ${y}px)`;
            });
            
            // 卡片反向轻微移动，增强立体感
            if (card) {
                const cardX = -offsetX * 5;
                const cardY = -offsetY * 5;
                card.style.transform = `translate(${cardX}px, ${cardY}px)`;
            }
        });
    }
}

/**
 * 平滑滚动支持
 * 为页面内的锚点链接添加平滑滚动效果
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 跳过空链接或仅包含 # 的链接
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                // 平滑滚动到目标元素
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * 添加动态样式 - 波纹效果 CSS
 * 通过 JS 动态注入，保持 HTML/CSS 文件简洁
 */
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none; /* 不阻挡鼠标事件 */
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* 确保按钮相对定位以容纳绝对定位的波纹 */
    .btn-primary,
    .btn-secondary {
        position: relative;
        overflow: hidden; /* 裁剪超出边界的波纹 */
    }
    
    /* 技能标签浮动动画 */
    .skill-tag {
        animation: skillFloat 3s ease-in-out infinite;
    }
    
    @keyframes skillFloat {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-3px);
        }
    }
`;
document.head.appendChild(rippleStyles);

/**
 * 性能优化：使用 requestAnimationFrame 优化动画
 * 对于更复杂的动画场景，建议使用此方法
 */
function optimizeAnimation() {
    let ticking = false;
    
    document.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                // 在这里处理滚动相关的动画或逻辑
                ticking = false;
            });
            ticking = true;
        }
    });
}

/**
 * 工具函数：防抖
 * 限制函数执行频率，用于优化滚动、resize 等高频事件
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 等待时间（毫秒）
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 工具函数：节流
 * 确保函数在固定时间间隔内只执行一次
 * @param {Function} func - 要执行的函数
 * @param {number} limit - 时间间隔（毫秒）
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * 可访问性增强：键盘导航支持
 * 为社交链接添加键盘事件监听
 */
document.addEventListener('keydown', function(e) {
    // 检测 Tab 键按下，为当前聚焦元素添加视觉反馈
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// 添加键盘导航样式
const keyboardNavStyles = document.createElement('style');
keyboardNavStyles.textContent = `
    .keyboard-navigation a:focus,
    .keyboard-navigation button:focus {
        outline: 2px solid white;
        outline-offset: 2px;
        border-radius: 4px;
    }
    
    /* 为焦点元素添加更明显的视觉反馈 */
    .social-link:focus,
    .btn-primary:focus,
    .btn-secondary:focus {
        box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.5);
    }
`;
document.head.appendChild(keyboardNavStyles);

/**
 * 浏览器兼容性检查
 * 检测是否支持 backdrop-filter，不支持时提供降级方案
 */
function checkBrowserSupport() {
    const supportsBackdropFilter = CSS.supports('backdrop-filter', 'blur(10px)') ||
                                   CSS.supports('-webkit-backdrop-filter', 'blur(10px)');
    
    if (!supportsBackdropFilter) {
        // 降级方案：增加背景不透明度
        console.log('当前浏览器不支持 backdrop-filter，已应用降级方案');
        
        const glassCard = document.querySelector('.glass-card');
        if (glassCard) {
            glassCard.style.background = 'rgba(255, 255, 255, 0.85)';
        }
    }
}

// 页面加载时检查浏览器支持
checkBrowserSupport();

/**
 * 性能监控：记录页面加载时间
 * 用于开发调试和性能优化参考
 */
window.addEventListener('load', function() {
    if (window.performance) {
        const loadTime = performance.now();
        console.log(`页面加载完成时间：${(loadTime / 1000).toFixed(2)}秒`);
    }
});
